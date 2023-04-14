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

const TopTap = createMaterialTopTabNavigator(); //상단 탭

import RecruitAll from './RecruitAll';

export default function RecruitPage() {
  return (
    <TopTap.Navigator
      initialRouteName="All"
      tabBarOptions={{
        scrollEnabled: true, // 스크롤 가능하게 설정
        tabStyle: { width: 90, alignItems: 'flex-start' }, // 왼쪽 정렬
        /*tabStyle: ({ route }) => ({
          width: route.name.length * 10, // 각 탭의 이름 길이에 따라 동적으로 너비 설정
          alignItems: "flex-start",
        }),*/
        indicatorStyle: { backgroundColor: "black" },
        labelStyle: { fontSize: 16, fontWeight: 'bold' },
      }}>
      <TopTap.Screen
        name="All"
        component={(props) => <RecruitAll {...props} tabIndex={0} />}
        options={{
          tabBarLabel: "All",
        }} />
      <TopTap.Screen
        name="Top"
        component={(props) => <RecruitAll {...props} tabIndex={1} />}
        options={{
          tabBarLabel: "Top",
        }} />
      <TopTap.Screen
        name="Bottom"
        component={(props) => <RecruitAll {...props} tabIndex={2} />}
        options={{
          tabBarLabel: "Bottom",
        }} />
      <TopTap.Screen
        name="Outer"
        component={(props) => <RecruitAll {...props} tabIndex={3} />}
        options={{
          tabBarLabel: "Outer",
        }} />
      <TopTap.Screen
        name="Cap"
        component={(props) => <RecruitAll {...props} tabIndex={4} />}
        options={{
          tabBarLabel: "Cap",
        }} />
      <TopTap.Screen
        name="Bag"
        component={(props) => <RecruitAll {...props} tabIndex={5} />}
        options={{
          tabBarLabel: "Bag",
        }} />
      <TopTap.Screen
        name="Accessories"
        component={(props) => <RecruitAll {...props} tabIndex={6} />}
        options={{
          tabBarLabel: "Accessories",
        }} />
    </TopTap.Navigator>
  );
};

const styles = StyleSheet.create({
  Product : {
    width: 156,
    height: 168,
    borderRadius: 8,
  }
});
