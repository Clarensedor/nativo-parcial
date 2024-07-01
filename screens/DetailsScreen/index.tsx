import React, { useState } from 'react';
import { Text, StyleSheet, View, Button, ActivityIndicator } from 'react-native';
import { deleteJoke } from '../../api'; 
const DetailsScreen = ({ route, navigation }) => {
  const info = route.params.item;
  const { deleteLocalJoke } = route.params; 
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const success = await deleteJoke(info.id);
    if (success) {
      deleteLocalJoke((info.id)); 
      setLoading(false);
      navigation.goBack(); 
    } else {
      setLoading(false);
    }
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Los Detalles :D</Text>
      <Text>{info.title}</Text>
      <Text>{info.description}</Text>
      <Text>{info.players}</Text>
      <Text>{info.categories}</Text>

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
