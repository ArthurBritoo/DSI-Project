import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged, User as FirebaseAuthUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

type UserProfile = {
  uid: string;
  email: string;
  nome: string;
  telefone?: string;
  // Add any other profile fields you store in Firestore
};

type UserContextType = {
  currentUser: UserProfile | null;
  loadingUser: boolean;
  setCurrentUser: (user: UserProfile | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, fetch their profile from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '', // Fallback for email if not present
            nome: userData.displayName || userData.nome || firebaseUser.email?.split('@')[0] || '', // Prioritize displayName, then nome, then part of email
            telefone: userData.telefone || undefined,
          });
        } else {
          // User authenticated but no profile in Firestore (shouldn't happen with our createUser function)
          setCurrentUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            nome: firebaseUser.email?.split('@')[0] || '', // Default name from email
          });
        }
      } else {
        // User is signed out
        setCurrentUser(null);
      }
      setLoadingUser(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, loadingUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used within a UserProvider');
  return context;
};
