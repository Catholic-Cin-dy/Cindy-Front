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
import RecruitTop from './RecruitTop';
import RecruitBottom from './RecruitBottom';
import RecruitOuter from './RecruitOuter';
import RecruitCap from './RecruitCap';
import RecruitBag from './RecruitBag';
import RecruitAccessories from './RecruitAccessories';


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
        name="Bottom"
        component={RBottomScreen}
        options={{
          tabBarLabel: 'Bottom',
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
  return (
    <RecruitTop/>
  );
}
function RBottomScreen() {
  return (
    <RecruitBottom/>
  );
}
function ROuterScreen() {
  return (
    <RecruitOuter/>
  );
}
function RCapScreen() {
  return (
    <RecruitCap/>
  );
}
function RBagScreen() {
  return (
    <RecruitBag/>
  );
}
function RAccesoriesScreen() {
  return (
    <RecruitAccessories/>
  );
}

export default function RecruitPage() {
  return(
    <RecruitScreen/>
  );
};

const styles = StyleSheet.create({});
