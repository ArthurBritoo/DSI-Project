import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
};

type PerfilScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface PerfilProps {
  navigation: PerfilScreenNavigationProp;
}

export default function Perfil({ navigation }: PerfilProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person-circle-outline" size={70} color="#888" />
        </View>
        <Text style={styles.name}>Exemplo123</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Sair da conta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#e3e3e3',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
    marginBottom: 8,
  },
  avatarIcon: {
    fontSize: 48,
    color: '#888',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    width: 220,
    height: 36,
    backgroundColor: '#e3e3e3',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#888',
  },
  buttonText: {
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
  },
});
