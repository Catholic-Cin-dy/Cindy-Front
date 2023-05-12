import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './Main';
import SignInName from './SignInName';
import SignInGender from './SignInGender';
import SignInFin from './SignInFin';

import axios from 'axios';
import React, { useState, useEffect } from 'react';

import KakaoLogin from './screens/LoginScreen/KakaoLogin';

import LogoTitle from './screens/LogoTitle';
import MainPage from './screens/MainPage';
import Maincontent from './component/Maincontent1';
import Detail1 from './screens/MainDetail/Detail1';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="SignInName" component={SignInName} />
        <Stack.Screen name="SignInGender" component={SignInGender} />
        <Stack.Screen name="SignInFin" component={SignInFin} />
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({});
