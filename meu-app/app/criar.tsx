import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Criar() {
  const router = useRouter();

  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [texto, setTexto] = useState('');

  const API = 'http://192.168.1.74:3000'; // Substitua pelo IP da sua máquina ou 10.0.2.2 no emulador Android

  const handleCriar = async () => {
    try {
      const response = await fetch(`${API}/api/noticias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, resumo, texto })
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Notícia criada 🔥');
        router.push('/home');
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.message || 'Falha ao criar notícia');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha de conexão. Verifique o endereço da API.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Notícia</Text>

      <TextInput placeholder="Título" style={styles.input} onChangeText={setTitulo} />
      <TextInput placeholder="Resumo" style={styles.input} onChangeText={setResumo} />
      <TextInput placeholder="Texto" style={styles.input} onChangeText={setTexto} />

      <TouchableOpacity style={styles.button} onPress={handleCriar}>
        <Text style={styles.buttonText}>Publicar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 8 },
  button: { backgroundColor: '#ff6600', padding: 15, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center' }
});