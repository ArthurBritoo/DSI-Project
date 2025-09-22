import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUserContext } from '../../contexts/UserContext';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  RedefinirSenha: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede5d6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: 220,
    height: 36,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#e3e3e3',
  },
  button: {
    marginVertical: 12,
    alignItems: 'center',
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginTop: 8,
    fontSize: 15,
  },
});

export default function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { users, setCurrentUser } = useUserContext();

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }
    // Busca usuário cadastrado
    const user = users.find((u) => u.email === email && u.senha === senha);
    if (user) {
      setCurrentUser(user); // Salva o usuário logado
      Alert.alert('Login realizado', `Bem-vindo, ${user.nome}!`);
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro', 'Email ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo futuramente aqui */}
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Ionicons name="arrow-forward-circle" size={36} color="#007AFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.link}>Cadastre-se</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RedefinirSenha')}>
        <Text style={styles.link}>Esqueci a Senha</Text>
      </TouchableOpacity>
  </View>
  );
}
