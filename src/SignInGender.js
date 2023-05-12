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

export default class SignInGender extends Component {
  state = {
    maleButtonPressed: false,
    femaleButtonPressed: false,
    nickname: this.props.route.params.nickname,
    gender: '',
  };
  handlePress = gender => {
    this.setState({
      maleButtonPressed: gender === 'male',
      femaleButtonPressed: gender === 'female',
      gender,
    });
  };

  render() {
    const {navigation} = this.props;
    const {nickname} = this.props.route.params;
    const {maleButtonPressed, femaleButtonPressed} = this.state;
    return (
      <View style={styles.default}>
        <Text style={styles.header3}>성별을 선택해주세요</Text>
        <View style={styles.buttonContent}>
          <TouchableOpacity
            style={[
              styles.inactiveButton,
              maleButtonPressed ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={() => this.handlePress('male')}>
            <Text
              style={[
                styles.inactiveButtonText,
                maleButtonPressed
                  ? styles.activeButtonText
                  : styles.inactiveButtonText,
              ]}>
              남성
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.inactiveButton,
              femaleButtonPressed ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={() => this.handlePress('female')}>
            <Text
              style={[
                styles.inactiveButtonText,
                femaleButtonPressed
                  ? styles.activeButtonText
                  : styles.inactiveButtonText,
              ]}>
              여성
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('SignInFin', {
              nickname: nickname,
              gender: this.state.gender,
            })
          }>
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
    color: 'black',
    fontWeight: '400',
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
  buttonText2: {
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
  inactiveButtonText: {
    color: 'black',
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
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 4,
  },
  inactiveButton: {
    width: 100,
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 4,
  },
  activeButton: {
    width: 100,
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 4,
  },

  buttonUnclicked: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  pressed: {
    color: 'black',
    backgroundColor: 'white',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
