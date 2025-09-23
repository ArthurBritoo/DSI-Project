import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking, Image } from 'react-native';
import { useUserContext } from '../../contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';
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
	const { users, setCurrentUser } = useUserContext();
	const { addUser } = useUserContext();
	const { setUsers } = useUserContext();

	const handleRedefinir = () => {
		if (!email || !novaSenha || !repitaSenha) {
			Alert.alert('Erro', 'Preencha todos os campos');
			return;
		}
		if (novaSenha !== repitaSenha) {
			Alert.alert('Erro', 'As senhas não coincidem');
			return;
		}
		// Verifica se o usuário existe
		const userIndex = users.findIndex((u) => u.email === email);
		if (userIndex === -1) {
			Alert.alert('Erro', 'E-mail não cadastrado');
			return;
		}
		// Atualiza a senha do usuário de forma imutável
		const novosUsuarios = users.map((u, idx) => idx === userIndex ? { ...u, senha: novaSenha } : u);
		if (setUsers) setUsers(novosUsuarios);
		Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
		setCurrentUser(null);
		navigation.navigate('Login');
	};

	return (
		<View style={styles.container}>
			<Image source={require('../../assets/logo_transparente.png')} style={{ width: 120, height: 120, marginBottom: 12 }} resizeMode="contain" />
			<Text style={styles.title}>Redefinir Senha</Text>
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
				placeholder="Nova Senha"
				value={novaSenha}
				onChangeText={setNovaSenha}
				secureTextEntry
			/>
			<TextInput
				style={styles.input}
				placeholder="Repita a Senha"
				value={repitaSenha}
				onChangeText={setRepitaSenha}
				secureTextEntry
			/>
			<TouchableOpacity style={styles.button} onPress={handleRedefinir}>
				<Ionicons name="arrow-forward-circle" size={36} color="#007AFF" />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Login')}>
				<Text style={styles.link}>Login</Text>
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
		marginVertical: 16,
		alignItems: 'center',
	},
	link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginTop: 8,
    fontSize: 15,
  },
});
