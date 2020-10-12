/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import InputForm from '../Nasa/screens/InputForm';
import DetailScreen from '../Nasa/screens/DetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const App = () => {

  return (

    // <InputForm></InputForm>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="InputForm" component={InputForm} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};
export default App;
