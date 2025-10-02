import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUserContext } from '../../contexts/UserContext';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  Perfil: undefined;
  RedefinirSenha: undefined;
};

type PerfilScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Perfil'>;

interface PerfilProps {
  navigation: PerfilScreenNavigationProp;
}

export default function Perfil({ navigation }: PerfilProps) {
  const { currentUser, setCurrentUser } = useUserContext();

  const handleLogout = () => {
    setCurrentUser(null);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexGrow}>
        <View style={styles.header}>
          <View style={styles.headerSpacer}></View>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerSpacer}></View>
        </View>

        <View style={styles.main}>
          <View style={styles.profileSection}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOepyiX5C3XvREM1UaHTczoSJWAdEOyWp5IZIC19RPpmHR-SI3uXGjAMbNo1IcFLhQU_X0Biyhet1Sw7fTb5HOKQfA20ZcSMtjsEyghyUA2iV_DJ_F2xtMm20L25PGawSeC5lggQbbcsCxflfuD2ugEhzVqWyptplUyNJe0Z_aV7K8cMTTlfdM41RBhEq_XjqAngqcrsqJo2_HChWebXdufk-0ADvKxZqrnts_XLT7KGUE7jl0mg4ZahFDHE4dh8Y65cfY-B_3Awg",
              }}
              style={styles.avatar}
            />
            <Text style={styles.nameText}>{currentUser ? currentUser.nome : 'Usuário'}</Text>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  flexGrow: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)', // Simulating white/10
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Simulating white/80
    padding: 16,
    paddingBottom: 12,
  },
  headerSpacer: {
    width: 40,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  profileSection: {
    marginBottom: 32, // mb-8 (8 * 4 = 32)
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 24, // mb-6 (6 * 4 = 24)
    height: 128, // h-32 (32 * 4 = 128)
    width: 128, // w-32 (32 * 4 = 128)
    borderRadius: 64,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
  },
  editProfileButton: {
    marginBottom: 16, // mb-4 (4 * 4 = 16)
    width: 250,
    borderRadius: 8,
    backgroundColor: '#137fec',
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  editProfileButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  logoutButton: {
    width: 250,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  logoutButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563',
  },
});
