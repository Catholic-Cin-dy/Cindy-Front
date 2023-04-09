import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Test from './Test';
import How from './How';
import Main from './Main';
import ProductDetail from './ProductDetail';
import Test2 from './Test2';
import Test3 from './Test3';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="How" component={How} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
