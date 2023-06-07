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

const backGroundImg = require('../../assets/mypage-background.png');
const defaultImg = require('../../assets/default-main-profile.png');
export default function MyPage() {
  const [data, setData] = useState([]);

  useEffect(() => {

    axios.get(baseUrl + 'users/my', { ...config })
      .then(response => {
        setData(response.data.result);
      })
      .catch(error => console.error(error));


  },[]);


  return (
    <View style={styles.firstView}>
      <ImageBackground
        style = {styles.secondView, { width: 330, height: 540, marginLeft: 30, marginTop: 20 }}
        source = {backGroundImg}
      >

        {data.profileImgUrl ? (
          <Image
            style={styles.pfImg}
            source={{ uri: data.profileImgUrl }}
          />
        ) : (
          <Image
            style={styles.pfImg}
            source={defaultImg}
          />
        )}

        <Text style={styles.name}>{data.name}</Text>
        <TouchableOpacity style={styles.modiProfileBtn}>
          <Text style={styles.mBtnText}>프로필 수정</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  firstView: {
    backgroundColor: 'black',
    height: 630,
    width: 360,
  },
  secondView: {

  },
  pfImg:{
    width: 220,
    height: 120,
    borderRadius: 15,
    marginTop: 0,
  },
  name: {
    color : 'white',
    marginLeft: 155,
    marginTop: 40,
    fontWeight: 'bold',
    color: '#FF1AA0',
    fontSize: 23,
  },
  mBtnText: {
    color : 'white',
    marginLeft: 65,
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 17,
  },
  modiProfileBtn: {
    borderRadius: 13,
    width : 225,
    height: 40,
    backgroundColor: '#FF1AA0',
    marginTop: 10,
    marginLeft: -3,
  },

});
