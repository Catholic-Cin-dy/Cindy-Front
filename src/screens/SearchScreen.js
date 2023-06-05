import React, {useState, useEffect} from 'react';
import {
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  Modal,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';

const baseUrl = 'https://www.awesominki.shop/'; //api 연결을 위한 baseUrl
const config = {
  headers: {
    'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo`,
  },
};

export default function SearchScreen() {


  useEffect(() => {


  },);


  return (
    <View style={styles.firstView}>
      <Text>검색화면</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  firstView: {
    backgroundColor: 'white',
  },

});
