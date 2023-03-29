import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './Main';
import Login from '../Login';

const Stack = createStackNavigator();

export default function RecruitPage() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// <View>
//   <Button title="전환" onPress={signInWithKakao}/>
// </View>



//<Button title="로그인" onPress={signInWithKakao}/>

//<CustomButton title="Custom Button" onPress={() => alert('Custom Button Pressed!')} />
