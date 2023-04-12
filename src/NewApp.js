import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import KakaoLogin from './screens/LoginScreen/KakaoLogin';
import Main from './screens/Main';
import LogoTitle from './screens/LogoTitle';
import MainPage from './screens/MainPage';
import Maincontent from './component/Maincontent1';
import Detail1 from './screens/MainDetail/Detail1';

const Stack = createStackNavigator();

import Main1 from './Main1';
export default function App() {


    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={Main} options={{headerTitle: props => <LogoTitle {...props} />}} />
          <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
          <Stack.Screen name="MainPage" component={MainPage}/>
        </Stack.Navigator>
      </NavigationContainer>

    );
}

const styles = StyleSheet.create({});
