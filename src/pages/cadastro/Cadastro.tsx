import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
};

type CadastroScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cadastro'>;

interface CadastroProps {
  navigation: CadastroScreenNavigationProp;
}


export default function Cadastro({ navigation }: CadastroProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [repitaSenha, setRepitaSenha] = useState('');

  const handleCadastro = () => {
    if (!nome || !email || !telefone || !senha || !repitaSenha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    if (senha !== repitaSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
  Alert.alert('Sucesso', 'Cadastro realizado!');
  navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
  {/* logo futuramente aqui */}
      <Text style={styles.title}>Cadastre-se</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Repita a Senha"
        value={repitaSenha}
        onChangeText={setRepitaSenha}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Ionicons name="arrow-forward-circle" size={36} color="#007AFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Já tenho uma Conta</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede5d6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  icon: {
    marginBottom: 16,
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
