import React from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import RecruitPage from './RecruitScreen/RecruitPage';
import ProductDetail from './RecruitScreen/ProductDetail';
import Main1 from '../Main1';
import SearchBar from "../component/SearchBar";

const homeSelected = require('../assets/btab-home-selected.png');
const homeUnSelected = require('../assets/btab-home-unselected.png');
const recruitSelected = require('../assets/btab-recruit-selected.png');
const recruitUnSelected = require('../assets/btab-recruit-unselected.png');
const bookmarkSelected = require('../assets/btab-bookmark-selected.png');
const bookmarkUnSelected = require('../assets/btab-bookmark-unselected.png');
const userSelected = require('../assets/btab-user-selected.png');
const userUnSelected = require('../assets/btab-user-unselected.png');

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MyPageStack = createStackNavigator();
const HomeStack = createStackNavigator();
const RecruitStack = createStackNavigator();
const BookMarkStack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Main1/>
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
const BookMarkScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is BookMarkScreen.</Text>
    </View>
  );
};
const RecruitProductsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is RecruitProductsScreen.</Text>
    </View>
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
      <HomeStack.Screen name="Home" component={HomeScreen} />
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
      <RecruitStack.Screen name="ProductRecruitAll" component={RecruitPage} options={{ headerShown: false }} />
      <RecruitStack.Screen name = "ProductDetail" component = {ProductDetail} options={{ headerShown: false }} />
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

export default function MainPage() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      tabBarOptions={{
        activeTintColor: "#EB4B4B", // 선택된 탭의 글씨색
      }}
    >
      <Tab.Screen name="홈화면" component={HomeStackScreen}
                  options={{
                    tabBarIcon: ({ focused, color, size }) => (
                      <Image
                        source={focused ? homeSelected : homeUnSelected} />
                    ),
                  }}
      />
      <Tab.Screen name="상품 전체조회" component={RecruitProductsStackScreen}
                  options={{
                    headerRight: props => <SearchBar {...props} />,
                    tabBarIcon: ({ focused, color, size }) => (
                      <Image
                        source={focused ? recruitSelected : recruitUnSelected } />
                    ),
                  }}
      />
      <Tab.Screen name="북마크" component={BookMarkStackScreen}
                  options={{
                    tabBarIcon: ({ focused, color, size }) => (
                      <Image
                        source={focused ? bookmarkSelected : bookmarkUnSelected} />
                    ),
                  }}
      />
      <Tab.Screen name="내정보" component={MyPageStackScreen}
                  options={{
                    tabBarIcon: ({ focused, color, size }) => (
                      <Image
                        source={focused ? userSelected : userUnSelected} />
                    ),
                  }}
      />
    </Tab.Navigator>
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
