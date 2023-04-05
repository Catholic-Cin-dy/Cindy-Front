import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import React,{ useState, useEffect } from 'react';
import Login from './Login';
import Main1 from './Main1';
import LogoTitle from "./component/LogoTitle";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {

    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
      <Stack.Navigator initialRouteName="Main1">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main1" component={Main1} options={{headerTitle: props => <LogoTitle {...props} />}}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
};
