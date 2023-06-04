import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ImageBackground} from 'react-native'; //버튼 background 이미지 넣어볼라고

import KakaoLogin from './LoginScreen/KakaoLogin';
import MainPage from './MainPage';

//Main페이지가 Login이랑 RecruitPage 전환시킴!! 일종의 root페이지.
const Mainnn = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text> Main Screen </Text>

      <Button
        title={'Go to Login Screen'}
        onPress={() => {
          navigation.navigate('KakaoLogin');
        }}
      />

      <Text />
      <Button
        title={'홈 화면으로 이동'}
        onPress={() => {
          navigation.navigate('MainPage');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnimg: {
    width: 300,
    height: 45,
  },
});

export default Mainnn;
