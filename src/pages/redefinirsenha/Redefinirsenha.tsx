import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserContext } from '../../contexts/UserContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  RedefinirSenha: undefined;
};

type RedefinirSenhaScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RedefinirSenha'>;

interface RedefinirSenhaProps {
  navigation: RedefinirSenhaScreenNavigationProp;
}

export default function Redefinirsenha({ navigation }: RedefinirSenhaProps) {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [repitaSenha, setRepitaSenha] = useState('');
  const { users, setCurrentUser, setUsers } = useUserContext();

  const handleRedefinir = () => {
    if (!email || !novaSenha || !repitaSenha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    if (novaSenha !== repitaSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    const userIndex = users.findIndex((u) => u.email === email);
    if (userIndex === -1) {
      Alert.alert('Erro', 'E-mail não cadastrado');
      return;
    }

    const novosUsuarios = users.map((u, idx) =>
      idx === userIndex ? { ...u, senha: novaSenha } : u
    );
    if (setUsers) setUsers(novosUsuarios);
    Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
    setCurrentUser(null);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Redefinir Senha</Text>
      </View>

      {/* Main */}
      <View style={styles.main}>
        <Image source={require('../../assets/logo_transparente.png')} style={{ width: 120, height: 120, marginBottom: 30 }} resizeMode="contain" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Nova Senha"
          placeholderTextColor="#9ca3af"
          value={novaSenha}
          onChangeText={setNovaSenha}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Repita a Senha"
          placeholderTextColor="#9ca3af"
          value={repitaSenha}
          onChangeText={setRepitaSenha}
          secureTextEntry
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.redefinirButton} onPress={handleRedefinir}>
          <Text style={styles.redefinirButtonText}>Redefinir Senha</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signUpText}>
            Lembrou da senha?{" "}
            <Text style={styles.signUpLink}>Faça login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  backArrow: {
    fontSize: 24,
    color: "#111",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
    paddingRight: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  input: {
    width: "100%",
    height: 56,
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    color: "#111",
    marginBottom: 16,
    fontSize: 16,
  },
  footer: {
    padding: 24,
  },
  redefinirButton: {
    backgroundColor: "#137fec",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  redefinirButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  signUpText: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 14,
    color: "#4b5563",
  },
  signUpLink: {
    fontWeight: "bold",
    color: "#137fec",
  },
});