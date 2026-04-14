import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function Home() {
  const [noticias, setNoticias] = useState([]);
  const router = useRouter();

  const API = 'http://192.168.1.74:3000';
  useEffect(() => {
    fetch(`${API}/api/noticias`)
      .then(res => res.json())
      .then(setNoticias);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notícias</Text>

      <FlatList
        data={noticias}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text>{item.resumo}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/criar')}>
        <Text style={styles.buttonText}>Nova Notícia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  card: { backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8 },
  cardTitle: { fontWeight: 'bold' },
  button: { backgroundColor: '#ff6600', padding: 15, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center' }
});