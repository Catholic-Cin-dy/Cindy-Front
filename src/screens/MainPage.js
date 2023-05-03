import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import RecruitPage from './RecruitScreen/RecruitPage';
import Main1 from '../Main1';
import Detail1 from "./MainDetail/Detail1";
import Detail2 from "./MainDetail/Detail2";
import LogoTitle from "./LogoTitle";
import CommuScreen from "./Community/CommuScreen";
import CommWrite from "./Community/CommWrite";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TestStack = createStackNavigator();
const MyPageStack = createStackNavigator();
const HomeStack = createStackNavigator();
const RecruitStack = createStackNavigator();
const BookMarkStack = createStackNavigator();
const MainStack =createStackNavigator();
const HomeScreen = () => {
  return (
      <Stack.Navigator>
          <MainStack.Screen name="Main1" component={Main1} options={{ headerShown: false }}/>
          <MainStack.Screen name="Detail1" component={Detail1} />
          <MainStack.Screen name="Detail2" component={Detail2} />
      </Stack.Navigator>
  );
};
const SearchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is SearchScreen.</Text>
    </View>
  );
};
const SearchResultScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is SearchResultScreen.</Text>
    </View>
  );
};
const BookMarkScreen = () => {
  return (
      <Stack.Navigator>
          <MainStack.Screen name="Community" component={CommuScreen} options={{ headerShown: false }}/>
          <MainStack.Screen name="CommWrite" component={CommWrite} />
      </Stack.Navigator>
  );
};
const RecruitProductsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is RecruitProductsScreen.</Text>
    </View>
  );
};
const TestReadScreen = ({ navigation }) => {
  return (
    <RecruitPage/>
  );
};
const MyPageScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is MyPageScreen.</Text>
    </View>
  );
};


const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="SearchResult" component={SearchResultScreen} />
    </Stack.Navigator>
  );
};

const BookMarkStackScreen = () => {
  return (
    <Stack.Navigator>
      <BookMarkStack.Screen name="BookMark" component={BookMarkScreen} />
    </Stack.Navigator>
  );
};

const RecruitProductsStackScreen = () => {
  return (
    <Stack.Navigator>
      <RecruitStack.Screen name="TestRead" component={TestReadScreen} />
    </Stack.Navigator>
  );
};
const MyPageStackScreen = () => {
  return (
    <Stack.Navigator>
      <MyPageStack.Screen name="MyPage" component={MyPageScreen} />
    </Stack.Navigator>
  );
};

const MainTabScreen = () => {
  return (
    <Tab.Navigator initialRouteName="HomeStack" >
      <Tab.Screen name="홈화면" component={HomeStackScreen } options={{ headerShown: false }}/>
      <Tab.Screen name="상품 전체조회" component={RecruitProductsStackScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="커뮤니티" component={BookMarkStackScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="내정보" component={MyPageStackScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

export default function MainPage() {
  return(

    <MainTabScreen/>
  );
};

const styles = StyleSheet.create({});

// <NavigationContainer>
//   <Stack.Navigator initialRouteName="MainTabScreen">
//     <Stack.Screen name="MainTab" component={MainTabScreen} />
//   </Stack.Navigator>
// </NavigationContainer>

// <View>
//   <Text>여기탭 뷰 올거야</Text>
// </View>
