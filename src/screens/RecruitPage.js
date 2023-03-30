import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TestStack = createStackNavigator();
const HomeStack = createStackNavigator();
const SettingStack = createStackNavigator();
// const MainTabScreen = ({navigation, route}) => {
//   return (
//     <Tab.Navigator
//       initialRouteName="HomeStack"
//       screenOptions={({route}) => ({
//         tabBarIcon: ({focused, color, size}) => {
//           let iconName;
//
//           if (route.name === 'TestStack') {
//             iconName = focused ? 'document' : 'document-outline';
//           } else if (route.name === 'HomeStack') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'SettingStack') {
//             iconName = focused ? 'person-circle' : 'person-circle-outline';
//           }
//
//           // You can return any component that you like here!
//           return <Icon name={iconName} size={size} color={color} />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: 'black',
//         inactiveTintColor: 'lightgray',
//         showLabel: false,
//       }}>
//       <Tab.Screen name="TestStack" component={TestStackScreen} />
//       <Tab.Screen name="HomeStack" component={HomeStackScreen} />
//       <Tab.Screen name="SettingStack" component={SettingStackScreen} />
//     </Tab.Navigator>
//   );
// };

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is HomeScreen.</Text>
    </View>
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
const TestReadScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is TestReadScreen.</Text>
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
      <SettingStack.Screen name="BookMark" component={BookMarkScreen} />
    </Stack.Navigator>
  );
};

const RecruitProductsStackScreen = () => {
  return (
    <Stack.Navigator>
      <TestStack.Screen name="RecruitProducts" component={RecruitProductsScreen} />
      <TestStack.Screen name="TestRead" component={TestReadScreen} />
    </Stack.Navigator>
  );
};
const MyPageStackScreen = () => {
  return (
    <Stack.Navigator>
      <TestStack.Screen name="MyPage" component={MyPageScreen} />
    </Stack.Navigator>
  );
};

const MainTabScreen = () => {
  return (
    <Tab.Navigator initialRouteName="HomeStack">
      <Tab.Screen name="홈화면" component={HomeStackScreen} />
      <Tab.Screen name="상품 전체조회" component={RecruitProductsStackScreen} />
      <Tab.Screen name="북마크" component={BookMarkStackScreen} />
      <Tab.Screen name="내정보" component={MyPageStackScreen} />
    </Tab.Navigator>
  );
};

export default function RecruitPage() {
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
