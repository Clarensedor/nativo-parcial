import React, {useEffect, useState} from 'react';
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

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getJokes} from '../../api';
import Card from '../../components/Card';

const MainScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [jokes, setJokes] = useState([] as any);
  const [jokeFirstLine, setJokeFirstLine] = useState('');
  const [jokeSecondLine, setJokeSecondLine] = useState('');

  useEffect(() => {
    const getJokesPayload = async () => {
      const newJokes = await getJokes();
      setJokes(newJokes.slice(0, 5));
    };
    getJokesPayload();
  }, []);

  const onFirstLineInputChange = (value: string) => {
    setJokeFirstLine(value);
  };

  const onAddNewJokeHandler = () => {
    let newJokes = [...jokes];
    let newJoke = {
      title: jokeFirstLine,
      description: jokeSecondLine,
    };
    newJokes.push(newJoke);
      
    setJokes(newJokes);
    setJokeFirstLine('');
    setJokeSecondLine('');
  };

  /*const onDeleteJokeHandler = (id: number) => {
    const deleteIndex = jokes.map((j: any) => j.id).indexOf(id);
    let newJokes = [...jokes];
    newJokes.splice(deleteIndex, 1);
    setJokes(newJokes);
  };*/

  return (
    <>
      <Text style={styles.h1}>My Dog Breed List</Text>
      {Platform.OS === 'android' && (
        <Text style={styles.h1}>Now on Android!</Text>
      )}
      <View style={styles.newJokeContainer}>
        <TextInput
          style={styles.input}
          placeholder="Put the name of the breed"
          value={jokeFirstLine}
          onChangeText={onFirstLineInputChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Put the description of the breed"
          value={jokeSecondLine}
          onChangeText={(value: string) => {
            setJokeSecondLine(value);
          }}
        />
        <Button title="Add new breed" onPress={onAddNewJokeHandler} />
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="never"
        style={backgroundStyle}
        contentContainerStyle={{alignItems: 'baseline'}}>
        {jokes.map((j: any) => {
          return (
            <Card
              onPressHandler={() => {
                navigation.navigate('Details', {
                  item: {
                    title: j.title,
                    description: j.description,
                  },
                });
              }}>
              <Text>{j.title}</Text>
              <Text style={{marginTop: 8}}>{j.description}</Text>
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
