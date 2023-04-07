import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import KakaoLogin from './screens/LoginScreen/KakaoLogin';
import Main from './screens/Main';
import MainPage from './screens/MainPage';
import LogoTitle from "./component/LogoTitle";
import Maincontent from './component/Maincontent1';
import Detail1 from './screens/MainDetail/Detail1';
const Stack = createStackNavigator();
export default function App() {

    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={Main} options={{headerTitle: props => <LogoTitle {...props} />}} />
          <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
          <Stack.Screen name="MainPage" component={MainPage}/>
          <Stack.Screen name="Detail1" component={Detail1}/>
        {/*  <Stack.Screen name="Mi" component={Maincontent}/>
          <Stack.Screen name="hhf" component={Detail1}/>*/}
        </Stack.Navigator>
      </NavigationContainer>

    );
}
