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
  const [jokeFirstLine, setJokeFirstLine] = useState('');
  const [jokeSecondLine, setJokeSecondLine] = useState('');

  useEffect(() => {
    const getJokesPayload = async () => {
      const newJokes = await getJokes();
      setJokes(newJokes.slice(0, 5));
    };
    getJokesPayload();
  }, []);

  const deleteLocalJoke = (id) => {
    setJokes((prevJokes) => prevJokes.filter((joke) => joke.id !== id));
  };

  const onFirstLineInputChange = (value) => {
    setJokeFirstLine(value);
  };

  const onAddNewJokeHandler = async () => {
    let newJoke = {
      title: jokeFirstLine,
      description: jokeSecondLine,
    };

    const addedJoke = await addJoke(newJoke);

    if (addedJoke) {
      setJokes([...jokes, addedJoke]);
      setJokeFirstLine('');
      setJokeSecondLine('');
    }
  };

  return (
    <>
      <Text style={styles.h1}>My Dog Breed List</Text>
      {Platform.OS === 'android' && (
        <Text style={styles.h1}>Now on Android!</Text>
      )}
      <View style={styles.newJokeContainer}>
        <TextInput
          style={styles.input}
          placeholder="Put the name of the ssssbreed"
          value={jokeFirstLine}
          onChangeText={onFirstLineInputChange}
        />
        <TextInput 
        
          style={styles.input}
          placeholder="Put the description of the breed"
          value={jokeSecondLine}
          onChangeText={(value) => {
            setJokeSecondLine(value);
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
                    assignedTo: j.assignedTo,
                    startDate: j.startDate,
                    status: j.status,
                    endDate: j.endDate,
                    priority: j.priority,
                  },
                  deleteLocalJoke: deleteLocalJoke, // Pasa la función de eliminación local
                });
              }}
            >
              <Text>{j.title}</Text>
              <Text style={{ marginTop: 8 }}>{j.description}</Text>
              <Text style={{ marginTop: 8 }}>{j.assignedTo}</Text>
              <Text style={{ marginTop: 8 }}>{j.startDate}</Text>
              <Text style={{ marginTop: 8 }}>{j.status}</Text>
              <Text style={{ marginTop: 8 }}>{j.endDate}</Text>
              <Text style={{ marginTop: 8 }}>{j.priority}</Text>
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
