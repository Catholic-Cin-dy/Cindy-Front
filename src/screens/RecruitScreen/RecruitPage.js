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
      tabBarOptions={{
        scrollEnabled: true, // 스크롤 가능하게 설정
        tabStyle: { width: 100, alignItems: 'flex-start' }, // 왼쪽 정렬
        indicatorStyle: { backgroundColor: 'black' }, // 선택된 탭 하단에 라인 표시
      }}
    >
      <Tab.Screen
        name="All"
        component={RecruitAll}
        initialParams={{ tabIndex: 0 }}
        options={{
          tabBarLabel: 'All'
        }}/>
      <Tab.Screen
        name="Top"
        component={RecruitAll}
        initialParams={{ tabIndex: 1 }}
        options={{
          tabBarLabel: 'Top'
        }}/>
      <Tab.Screen
        name="Bottom"
        component={RecruitAll}
        initialParams={{ tabIndex: 2 }}
        options={{
          tabBarLabel: 'Bottom'
        }}/>
      <Tab.Screen
        name="Outer"
        component={RecruitAll}
        initialParams={{ tabIndex: 3 }}
        options={{
          tabBarLabel: 'Outer'
        }}/>
      <Tab.Screen
        name="Cap"
        component={RecruitAll}
        initialParams={{ tabIndex: 4 }}
        options={{
          tabBarLabel: 'Cap'
        }}/>
      <Tab.Screen
        name="Bag"
        component={RecruitAll}
        initialParams={{ tabIndex: 5 }}
        options={{
          tabBarLabel: 'Bag'
        }}/>
      <Tab.Screen
        name="Accessories"
        component={RecruitAll}
        initialParams={{ tabIndex: 6 }}
        options={{
          tabBarLabel: 'Accessories'
        }}/>
    </Tab.Navigator>
  );
}

function RAllScreen({navigation, route}) {
  return (
    <RecruitAll/>
  );
}


export default function RecruitPage() {
  return(
    <RecruitScreen/>
  );
};

const styles = StyleSheet.create({});
