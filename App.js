import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        console.log('Datos recibidos:', response.data); // Verifica los datos recibidos
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar datos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lista de Posts:</Text>
      {loading ? (
        <Text>Cargando datos...</Text>
      ) : (
        data.length > 0 ? (
          data.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postBody}>{item.body}</Text>
            </View>
          ))
        ) : (
          <Text>No hay datos disponibles.</Text>
        )
      )}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postBody: {
    fontSize: 16,
    color: '#333',
  },
});
