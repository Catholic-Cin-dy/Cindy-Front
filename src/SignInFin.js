import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component, useState} from 'react';
import {
  Button,
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import {getProfile, KakaoProfile} from '@react-native-seoul/kakao-login';
import MainPage from './screens/MainPage';

// const CATEGORY_MINIMAL = 1;
// const CATEGORY_CASUAL = 2;
// const CATEGORY_STREET = 3;
// const CATEGORY_VINTAGE = 4;
// const CATEGORY_FEMININE = 5;
// const CATEGORY_CITY_BOY = 6;
export default class SignInFin extends Component {
  state = {
    isButtonPressed: false,
    nickname: this.props.route.params.nickname,
    gender: this.props.route.params.gender,
    categoryList: [],
  };
  handlePress = category => {
    let newCategoryList = [...this.state.categoryList];
    const index = newCategoryList.indexOf(category);
    if (index > -1) {
      newCategoryList.splice(index, 1);
    } else {
      newCategoryList.push(category);
    }
    this.setState({
      isButtonPressed: !this.state.isButtonPressed,
      categoryList: newCategoryList,
    });
  };

  submitBtn = async () => {
    try {
      const profile = await getProfile();
      // console.log(JSON.stringify(profile));
      const {id, nickname, profileImageUrl} = profile;
      this.setState({
        socialId: id.toString(),
        name: nickname,
        profileImgUrl: profileImageUrl,
      });
    } catch (error) {
      console.log(error);
    }
    const {nickname, gender, categoryList, socialId, name, profileImgUrl} =
      this.state;

    const requestBody = {
      nickname: nickname,
      gender: gender,
      categoryList: categoryList,
      socialId: socialId,
      name: name,
      profileImgUrl: profileImgUrl,
    };
    const {navigation} = this.props;
    console.log(requestBody);
    const response = await axios.post(
      'https://www.awesominki.shop/auth/signup/kakao',
      JSON.stringify(requestBody),
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token':
            'eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo',
        },
      },
    );
    console.log(response);
    // await AsyncStorage.setItem('myKey', response.data);
    //asyncStorage에 response 형태를 바꿔서 저장해야할듯
    const {
      data: {accessToken},
    } = response;
    //로컬 스토리지에 토큰을 저장
    // await AsyncStorage.setItem('token', accessToken);
    // navigation.navigate('MainPage');
    navigation.navigate('MapScreen');
  };

  render() {
    const {navigation} = this.props;
    const {nickname, gender} = this.props.route.params;
    const {isButtonPressed, categoryList} = this.state;

    return (
      <View style={styles.default}>
        <Text style={styles.header3}>관심 스타일을 선택해주세요</Text>
        <Text style={styles.headerSub}>
          사용자님의 평소 스타일이나, 선호하는 스타일을 선택해주세요!
        </Text>
        <View style={styles.buttonContent3}>
          <View style={styles.buttonContent2}>
            <TouchableOpacity
              style={[
                styles.button,
                categoryList.includes('1')
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => this.handlePress('1')}>
              <Text
                style={[
                  styles.buttonText,
                  categoryList.includes('1')
                    ? styles.activeButtonText
                    : styles.inactiveButtonText,
                ]}>
                미니멀
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                categoryList.includes('2')
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => this.handlePress('2')}>
              <Text
                style={[
                  styles.buttonText,
                  categoryList.includes('2')
                    ? styles.activeButtonText
                    : styles.inactiveButtonText,
                ]}>
                캐쥬얼
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContent3}>
          <View style={styles.buttonContent2}>
            <TouchableOpacity
              style={[
                styles.button,
                categoryList.includes('3')
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => this.handlePress('3')}>
              <Text
                style={[
                  styles.buttonText,
                  categoryList.includes('3')
                    ? styles.activeButtonText
                    : styles.inactiveButtonText,
                ]}>
                스트릿
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                categoryList.includes('4')
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => this.handlePress('4')}>
              <Text
                style={[
                  styles.buttonText,
                  categoryList.includes('4')
                    ? styles.activeButtonText
                    : styles.inactiveButtonText,
                ]}>
                빈티지
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContent3}>
          <View style={styles.buttonContent2}>
            <TouchableOpacity
              style={[
                styles.button,
                categoryList.includes('5')
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => this.handlePress('5')}>
              <Text
                style={[
                  styles.buttonText,
                  categoryList.includes('5')
                    ? styles.activeButtonText
                    : styles.inactiveButtonText,
                ]}>
                페미닌
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                categoryList.includes('6')
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => this.handlePress('6')}>
              <Text
                style={[
                  styles.buttonText,
                  categoryList.includes('6')
                    ? styles.activeButtonText
                    : styles.inactiveButtonText,
                ]}>
                시티보이
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.submitBtn}>
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
// function Test() {
//
//     return (
//         <View style={styles.default}>
//             <Text style={styles.header3}>프로필을 설정해주세요</Text>
//             <TextInput
//                 style={styles.textInput}
//                 onChangeText={(text)=>{this.setState({inputText: text})}}
//                 placeholder="닉네임 입력"/>
//             <Button title="다음" onPress={this.submitBtn} />
//             <Text style ={styles.showText}>{this.state.text}</Text>
//         </View>
//     );
// }

// @ts-ignore
const styles = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  header3: {
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 40,
  },
  headerSub: {
    textAlign: 'left',
    color: 'gray',
    fontWeight: '300',
    fontSize: 16,
    paddingBottom: 40,
  },
  textInput: {
    marginTop: 80,
    marginBottom: 32,
    height: 48,
    borderBottomWidth: 1,
  },
  showText: {
    marginTop: 17,
    fontSize: 16,
    color: 'white',
  },
  btn_move: {
    weight: 320,
    height: 50,
    backgroundColor: 'black',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  inactiveButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  activeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 16,
    borderRadius: 4,
  },
  button2: {
    width: 100,
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
  },
  inactiveButton: {
    width: 'auto',
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    width: 'auto',
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 16,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonUnclicked: {
    backgroundColor: 'white',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  pressed: {
    backgroundColor: 'pink',
  },
  buttonContent2: {
    flexDirection: 'row',
  },
  buttonContent3: {
    flexDirection: 'column',
  },
});
