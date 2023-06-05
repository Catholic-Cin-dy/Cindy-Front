import React from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SearchTag from '../screens/AutoComplete/SearchTag';
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
const communitySelected = require('../assets/communitySelected.png');
const communityUnSelected = require('../assets/communityUnSelected.png');


import Detail1 from "./MainDetail/Detail1";
import Detail2 from "./MainDetail/Detail2";
import LogoTitle from "./LogoTitle";
import CommuScreen from "./Community/CommuScreen";
import CommuPostDetail from "./Community/CommuPostDetail";
import CommWrite from "./Community/CommWrite";
import CommuWriteMap from "./Community/CommuWriteMap";
import MyPage from "./MyPageScreen/MyPage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
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

const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="SearchResult" component={SearchResultScreen} />
    </Stack.Navigator>
  );
};

const CommunityStackScreen = () => {
  return (
    <Stack.Navigator>
      <RecruitStack.Screen name="Community" component={CommuScreen} options={{ headerShown: false }}/>
      <RecruitStack.Screen name = "CommuPostDetail" component = {CommuPostDetail} options = {{ headerShown : false }}/>
      <RecruitStack.Screen name="CommWrite" component={CommWrite} />
      <RecruitStack.Screen name="CommuWriteMap" component={CommuWriteMap} />
    </Stack.Navigator>
  );
};

const RecruitProductsStackScreen = () => {
  return (
    <Stack.Navigator>
      <RecruitStack.Screen name="ProductRecruitAll" component = {RecruitPage} options={{ headerShown: false }} />
      <RecruitStack.Screen name = "ProductDetail" component = {ProductDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
const MyPageStackScreen = () => {
  return (
    <Stack.Navigator>
      <MyPageStack.Screen name="MyPage" component = {MyPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default function MainPage() {
  return (
    <MainTabScreen/>
  );
};

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      tabBarOptions={{
        activeTintColor: "#EB4B4B", // 선택된 탭의 글씨색
      }}
    >
      <Tab.Screen name="홈화면" component={HomeStackScreen}
                  options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused, color, size }) => (
                      <Image
                        source={focused ? homeSelected : homeUnSelected} />
                    ),
                  }}
      />
      <Tab.Screen name="상품 전체조회" component={RecruitProductsStackScreen}
                  options={{
                    unmountOnBlur: true,
                    headerRight: props => <SearchBar {...props} />,
                    tabBarIcon: ({ focused, color, size }) => (
                      <Image
                        source={focused ? recruitSelected : recruitUnSelected } />
                    ),
                  }}
      />
      <Tab.Screen name="커뮤니티" component={CommunityStackScreen}
                  options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused, color, size }) => (
                      <Image
                        source={focused ? communitySelected : communityUnSelected} />
                    ),
                  }}
      />
      <Tab.Screen name="내정보" component={MyPageStackScreen}
                  options={{
                    unmountOnBlur: true,
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

