import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';

const AppNavigator = () => {

  const backgroundStyle = {
    flex: 1,
  };

  const Stack = createStackNavigator();

  const StackRoutes = (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <NavigationContainer>{StackRoutes}</NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;
