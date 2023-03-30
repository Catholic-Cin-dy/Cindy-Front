import React from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Image } from 'react-native';
import { ImageBackground } from "react-native"; //버튼 background 이미지 넣어볼라고

import Login from './Login';
import RecruitPage from './RecruitPage'

const Main = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text> Main Screen </Text>

      <Button title={"Go to Login Screen"} onPress={() => {
        navigation.navigate("Login");
      }} />

      <Text />
      <Button title={"상품 전체 리스트 조회 화면으로 이동"} onPress={() => {
        navigation.navigate("RecruitPage");
      }} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnimg: {
    width: 300,
    height: 45,
  }
})

export default Main;
