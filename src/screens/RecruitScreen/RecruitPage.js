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

const Tab = createMaterialTopTabNavigator(); //상단 탭

import RecruitAll from './RecruitAll';

function RecruitScreen({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="All"
      screenOptions={{
        tabBarIndicatorStyle: '#000000',
        tabBarActiveTintColor: '#000000',
      }}>
      <Tab.Screen
        name="All"
        component={RAllScreen}
        options={{
          tabBarLabel: 'All',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={24} />,
        }}/>
      <Tab.Screen
        name="Top"
        component={RTopScreen}
        options={{
          tabBarLabel: 'Top',
          tabBarIcon: ({color}) => (
            <Icon name="notifications" color={color} size={24} />
          ),
        }}/>
      <Tab.Screen
        name="Pants"
        component={RPantsScreen}
        options={{
          tabBarLabel: 'Pants',
          tabBarIcon: ({color}) => (
            <Icon name="notifications" color={color} size={24} />
          ),
        }}/>
      <Tab.Screen
        name="Outer"
        component={ROuterScreen}
        options={{
          tabBarLabel: 'Outer',
          tabBarIcon: ({color}) => (
            <Icon name="notifications" color={color} size={24} />
          ),
        }}/>
      <Tab.Screen
        name="Cap"
        component={RCapScreen}
        options={{
          tabBarLabel: 'Cap',
          tabBarIcon: ({color}) => (
            <Icon name="notifications" color={color} size={24} />
          ),
        }}/>
      <Tab.Screen
        name="Bag"
        component={RBagScreen}
        options={{
          tabBarLabel: 'Bag',
          tabBarIcon: ({color}) => (
            <Icon name="notifications" color={color} size={24} />
          ),
        }}/>
      <Tab.Screen
        name="Accessories"
        component={RAccesoriesScreen}
        options={{
          tabBarLabel: 'Accessories',
          tabBarIcon: ({color}) => (
            <Icon name="notifications" color={color} size={24} />
          ),
        }}/>
    </Tab.Navigator>
  );
}
function RAllScreen({navigation}) {
  return (
    <RecruitAll/>
  );
}
function RTopScreen() {
  return <Text>top 상품 조회</Text>;
}
function RPantsScreen() {
  return <Text>pants 상품 조회</Text>;
}
function ROuterScreen() {
  return <Text>outer 상품 조회</Text>;
}
function RCapScreen() {
  return <Text>cap 상품 조회</Text>;
}
function RBagScreen() {
  return <Text>bag 상품 조회</Text>;
}
function RAccesoriesScreen() {
  return <Text>accessories 상품 조회</Text>;
}

export default function RecruitPage() {
  return(
    <RecruitScreen/>
  );
};

const styles = StyleSheet.create({});
