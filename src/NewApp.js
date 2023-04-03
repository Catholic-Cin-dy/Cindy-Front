import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import React from 'react';
import Login from './Login';
import Main1 from './Main1';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
export default function App() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main1" component={Main1}
        options={{
          headerLeft: () => (
            
              <Text>Left</Text>
            
          )}} />
      </Stack.Navigator>
    </NavigationContainer>
    );
};
