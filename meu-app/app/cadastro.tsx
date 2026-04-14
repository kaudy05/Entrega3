import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Cadastro() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const API = 'http://192.168.1.74:3000';

  const handleCadastro = async () => {
    try {
      const res = await fetch(`${API}/api/auth/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, username, password })
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        Alert.alert('Erro', 'Resposta inválida do servidor');
        return;
      }

      if (res.ok) {
        Alert.alert('Sucesso', data.message);
        router.push('/');
      } else {
        Alert.alert('Erro', data.message);
      }

    } catch (err) {
      Alert.alert('Erro', 'Falha de conexão');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput placeholder="Nome" style={styles.input} onChangeText={setNome} />
      <TextInput placeholder="Username" style={styles.input} onChangeText={setUsername} />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 8 },
  button: { backgroundColor: '#ff6600', padding: 15, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center' }
});