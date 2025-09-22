import Buscar from './Buscar';
import Perfil from './Perfil';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Home</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(() => {
    setInitialRoute('Home');
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: 'home' | 'search' | 'person' = 'home';
          if (route.name === 'Buscar') iconName = 'search';
          else if (route.name === 'Perfil') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: '#17415b',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
        },
      })}
    >
  <Tab.Screen name="Buscar" component={Buscar} />
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede5d6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
