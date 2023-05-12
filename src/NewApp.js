import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './Main';
import SignInName from './SignInName';
import SignInGender from './SignInGender';
import SignInFin from './SignInFin';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="SignInName" component={SignInName} />
        <Stack.Screen name="SignInGender" component={SignInGender} />
        <Stack.Screen name="SignInFin" component={SignInFin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
