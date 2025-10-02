import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/teladelogin/Login';
import Cadastro from './src/pages/cadastro/Cadastro';
import Home from './src/pages/home/Home';
import Buscar from './src/pages/home/Buscar';
import Perfil from './src/pages/home/Perfil';
import RedefinirSenha from './src/pages/redefinirsenha/Redefinirsenha';
import { UserProvider } from './src/contexts/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Buscar" component={Buscar} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="RedefinirSenha" component={RedefinirSenha} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}