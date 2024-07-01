import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  useColorScheme,
  TextInput,
  Button,
  View,
  Platform,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getJokes, addJoke } from '../../api';
import Card from '../../components/Card';

const MainScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [jokes, setJokes] = useState([]);
  const [PrimeraLinea, setPrimeraLinea] = useState('');
  const [segundalinea, setSegundaLinea] = useState('');
  const [terceralinea, setTerceraLinea] = useState('');
  const [cuartalinea, setCuartaLinea] = useState('');
  const [elid, setElId] = useState('');


  //Hola profe me falto solo que se actualizara al agregar un nuevo deporte. Var a tener que recargar despues
  //de agregar un deporte se que hay algo en el useEffect para actualizar pero no me acuerdo y quedo en falta por eso
  useEffect(() => {
    const getJokesPayload = async () => {
      const newJokes = await getJokes();
      setJokes(newJokes.slice(0, 10));
    };
    getJokesPayload();
  }, []);

  const deleteLocalJoke = (id) => {
    setJokes((prevJokes) => prevJokes.filter((joke) => joke.id !== id));
  };

  const onFirstLineInputChange = (value) => {
    setPrimeraLinea(value);
  };

  const onAddNewJokeHandler = async () => {
    let newJoke = {
      id: (jokes.length + 1).toString(),
      title: PrimeraLinea,
      description: segundalinea,
      players: terceralinea,
      categories : terceralinea
    };

    const addedJoke = await addJoke(newJoke);

    if (addedJoke) {
      setJokes([...jokes, addedJoke]);
      setPrimeraLinea('');
      setSegundaLinea('');
      setTerceraLinea('');
      setCuartaLinea('');
    }
  };

  return (
    <>
      <Text style={styles.h1}>Mi segundo Parcial :D</Text>
      {Platform.OS === 'android' && (
        <Text style={styles.h1}>En situacion de android :c</Text>
      )}
      <View style={styles.newJokeContainer}>
        <TextInput
          style={styles.input}
          placeholder="Por aca el nombre del deporte :D"
          value={PrimeraLinea}
          onChangeText={onFirstLineInputChange}
        />
        <TextInput

          style={styles.input}
          placeholder="Por aca la descripcion :D"
          value={segundalinea}
          onChangeText={(value) => {
            setSegundaLinea(value);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Por aca los jugadores :D"
          value={terceralinea}
          onChangeText={(value) => {
            setTerceraLinea(value);
          }}
        />


        <TextInput
          style={styles.input}
          placeholder="Por aca la categoria :D" 
          value={cuartalinea}
          onChangeText={(value) => {
            setCuartaLinea(value);
          }}
        />





      <Button title="Add new breed" onPress={onAddNewJokeHandler} />
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="never"
        style={backgroundStyle}
        contentContainerStyle={{ alignItems: 'baseline' }}
      >

        {jokes.map((j, index) => {
          return (
            <Card
              key={index}
              onPressHandler={() => {
                navigation.navigate('Details', {
                  item: {
                    id: j.id,
                    title: j.title,
                    description: j.description,
                    players: j.players,
                    categories: j.categories,
                  },
                  deleteLocalJoke: deleteLocalJoke, // Pasa la función de eliminación local
                });
              }}
            >
              <Text>{j.id}</Text>
              <Text>{j.title}</Text>
              <Text style={{ marginTop: 8 }}>{j.description}</Text>
              <Text style={{ marginTop: 8 }}>{j.players}</Text>
              <Text style={{ marginTop: 8 }}>{j.categories}</Text>
            </Card>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 24,
  },
  newJokeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginTop: 8,
    marginBottom: 8,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    width: 250,
  },
});

export default MainScreen;
