import React, { useState } from 'react';
import { Text, StyleSheet, View, Button, ActivityIndicator } from 'react-native';
import { deleteJoke } from '../../api'; // Importa la función de eliminación de la API

const DetailsScreen = ({ route, navigation }) => {
  const info = route.params.item;
  const { deleteLocalJoke } = route.params; // Recibe la función de eliminación local
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const success = await deleteJoke(info.id);
    if (success) {
      deleteLocalJoke(info.id); // Elimina la tarea del estado local
      setLoading(false);
      navigation.goBack(); // Navega de regreso a la pantalla principal
    } else {
      setLoading(false);
      // Manejar el error según sea necesario
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Details Screen</Text>
      <Text>{info.id}</Text>
      <Text>{info.title}</Text>
      <Text>{info.description}</Text>
      <Text>{info.assignedTo}</Text>
      <Text>{info.startDate}</Text>
      <Text>{info.status}</Text>
      <Text>{info.endDate}</Text>
      <Text>{info.priority}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Delete" onPress={handleDelete} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'wheat',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  h1: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 24,
  },
});

export default DetailsScreen;
