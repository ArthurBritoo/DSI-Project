import { View, Text, StyleSheet } from 'react-native';

export default function Buscar() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Busca</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
