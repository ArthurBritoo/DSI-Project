import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // Aqui você pode adicionar a lógica de autenticação
    if (usuario == "exemplo123" && senha == "senha123") {
      Alert.alert('Login realizado', `Usuário: ${usuario}`);
    } 
    else if (usuario == "" || senha == "") {
      Alert.alert('Erro', 'Preencha usuário e senha');
    }
    else {
      Alert.alert('Erro', 'Usuário ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});