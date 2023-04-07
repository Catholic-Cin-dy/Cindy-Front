import {StyleSheet, Text, View, Button, Alert} from 'react-native';
<<<<<<<<< Temporary merge branch 1
import React,{ useState, useEffect } from 'react';
import Login from './Login';
import Main1 from './Main1';
import LogoTitle from "./component/LogoTitle";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
=========
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import KakaoLogin from './screens/LoginScreen/KakaoLogin';
import Main from './screens/Main';
import LogoTitle from './screens/LogoTitle';
import MainPage from './screens/MainPage';
>>>>>>>>> Temporary merge branch 2

const Stack = createStackNavigator();
export default function App() {

    const Stack = createStackNavigator();
    return (
<<<<<<<<< Temporary merge branch 1
        <NavigationContainer>
      <Stack.Navigator initialRouteName="Main1">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main1" component={Main1} options={{headerTitle: props => <LogoTitle {...props} />}}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
};
=========
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={Main} options={{headerTitle: props => <LogoTitle {...props} />}} />
          <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
          <Stack.Screen name="MainPage" component={MainPage}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}
>>>>>>>>> Temporary merge branch 2
