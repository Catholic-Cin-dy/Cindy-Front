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

//const backGroundImg = require('../../assets/mypage-background.png');
const defaultImg = require('../../assets/profile.png');
const setting = require('../../assets/setting.png');
const arrow = require('../../assets/arrow.png');
const icon1 = require('../../assets/icon1.png');
const icon2 = require('../../assets/icon2.png');
const icon3 = require('../../assets/icon3.png');
export default function MyPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + 'users/my', {...config})
      .then(response => {
        setData(response.data.result);
      })
      .catch(error => console.error(error));
  }, []);
  console.log(data);
  return (
    <ScrollView style={styles.white}>
      <SafeAreaView style={styles.firstView}>
        {/*<TouchableOpacity style={styles.modiProfileBtn}>*/}
        {/*  <Text style={styles.mBtnText}>프로필 수정</Text>*/}
        {/*</TouchableOpacity>*/}
        <View style={styles.header}>
          <Text style={styles.text1}>MY PROFILE</Text>
          <Image style={styles.setting} source={setting} />
        </View>
        <View style={styles.content}>
          {data.profileImgUrl ? (
            <View style={styles.pfImgContainer}>
              <Image style={styles.pfImg} source={{uri: data.profileImgUrl}} />
            </View>
          ) : (
            <View style={styles.pfImgContainer}>
              <Image style={styles.pfImg} source={defaultImg} />
            </View>
          )}
          <Text style={styles.name}>
            {data.name} {'님'}
          </Text>
          <Text style={styles.email}>cindy@naver.com</Text>
        </View>
        <View style={styles.tap}>
          <TouchableOpacity style={styles.component}>
            <Image style={styles.icon} source={icon1} />
            <Text style={styles.iconname}>관심 목록</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.component}>
            <Image style={styles.icon} source={icon2} />
            <Text style={styles.iconname2}>내 커뮤니티</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.component}>
            <Image style={styles.icon3} source={icon3} />
            <Text style={styles.iconname1}>공지 사항</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.border}>
          <TouchableOpacity style={styles.line}>
            <Text style={styles.text2}>관심 브랜드</Text>
            <Image style={styles.arrow} source={arrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.line}>
            <Text style={styles.text2}>내가 남긴 댓글</Text>
            <Image style={styles.arrow} source={arrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.line}>
            <Text style={styles.text2}>내가 찜한 상품</Text>
            <Image style={styles.arrow} source={arrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.line}>
            <Text style={styles.text2}>로그아웃</Text>
            <Image style={styles.arrow} source={arrow} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  white: {
    backgroundColor: 'white',
  },
  border: {
    marginBottom: 34,
  },
  icon: {
    // width: 60,
    // height: 50,
  },
  iconname: {
    color: 'rgba(30, 30, 30, 0.88)',
    fontWeight: 'normal',
    fontSize: 16,
    marginTop: 20,
  },
  iconname1: {
    color: 'rgba(30, 30, 30, 0.88)',
    fontWeight: 'normal',
    fontSize: 16,
    marginTop: 14,
  },
  iconname2: {
    color: 'rgba(30, 30, 30, 0.88)',
    fontWeight: 'normal',
    fontSize: 16,
    marginTop: 17.5,
  },
  component: {
    alignItems: 'center',
    width: '32%',
  },
  firstView: {
    backgroundColor: 'white',
    fontFamily: 'Pretendard',
    marginLeft: 16,
    marginRight: 16,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    //flex: 1,
    justifyContent: 'space-between',
    marginBottom: 47,
  },
  setting: {
    width: 24,
    height: 24,
  },
  text1: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  pfImgContainer: {
    borderRadius: 100,
    overflow: 'hidden', // 이미지를 컨테이너에 맞게 자르기 위해 overflow 속성 추가
    width: 80,
    height: 80,
  },
  pfImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    alignItems: 'center',
    marginBottom: 56,
  },
  name: {
    color: '#000',
    //color: 'white',
    marginTop: 28,
    fontWeight: 'bold',
    fontSize: 22,
  },
  email: {
    color: '#9E9C9C',
    marginTop: 16,
    fontWeight: 'normal',
    fontSize: 16,
  },
  tap: {
    marginBottom: 30,
    height: 85,
    flexDirection: 'row', // 가로로 정렬
    justifyContent: 'space-between',
  },
  line: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1, // 윗부분 보더 주기
    borderTopColor: 'rgba(193, 196, 204, 0.2)',
  },
  text2: {
    color: 'rgba(30, 30, 30, 0.88)',
    fontWeight: 'normal',
    fontSize: 14,
    marginTop: 18,
    marginBottom: 19,
  },
  arrow: {marginTop: 18},
  modiProfileBtn: {
    borderRadius: 13,
    width: 225,
    height: 40,
    backgroundColor: '#FF1AA0',
    marginTop: 10,
    marginLeft: -3,
  },
});
