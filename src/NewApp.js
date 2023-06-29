import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './Main';
import SignInName from './SignInName';
import SignInGender from './SignInGender';
import SignInFin from './SignInFin';
import MapScreen from './trash/MapScreen';

import axios from 'axios';
import React, {useState, useEffect} from 'react';

import KakaoLogin from './screens/LoginScreen/KakaoLogin';

import LogoTitle from './screens/LogoTitle';
import MainPage from './screens/MainPage';
import Maincontent from './component/Maincontent1';
import Detail1 from './screens/MainDetail/Detail1';
import CommuWriteTag from './screens/Community/CommuWriteTag';
import MapScreen2 from './trash/MapScreen2';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
        <Stack.Screen name="SignInName" component={SignInName} options={{headerShown: false}} />
        <Stack.Screen name="SignInGender" component={SignInGender} options={{headerShown: false}} />
        <Stack.Screen name="SignInFin" component={SignInFin} options={{headerShown: false}} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{headerShown: false}} />
        <Stack.Screen name="MapScreen2" component={MapScreen2} options={{headerShown: false}} />
        <Stack.Screen name="CommuWriteTag" component={CommuWriteTag} options={{headerShown: false}} />
        <Stack.Screen name="MainPage" component={MainPage} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
