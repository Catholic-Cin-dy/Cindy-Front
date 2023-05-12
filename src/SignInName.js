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
import axios from 'axios';
import {getProfile} from '@react-native-seoul/kakao-login';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

// state = {
//   text: '',
//   inputText: '',
// };

export default class SignInName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
    };
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.default}>
        <Text style={styles.header3}>프로필을 설정해주세요</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={nickname => this.setState({nickname})}
          placeholder="닉네임 입력"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('SignInGender', {nickname: this.state.nickname})
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

// requestBody = {
//   categoryList: [1, 2, 3, 4],
//   gender: 'male',
//   name: '임현우',
//   nickname: '임현',
//   profileImgUrl: 'imageimage',
//   socialId: '232332232444444',
// };

// submitBtn = async () => {
//   const {navigation} = this.props;
//   const response = await axios.post(
//     'https://www.awesominki.shop/auth/signup/kakao',
//     JSON.stringify(this.requestBody),
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Auth-Token':
//           'eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo',
//       },
//     },
//   );
//   console.log(response);
//   await AsyncStorage.setItem('myKey', response);
//   navigation.navigate('Test2');
// };

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
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
});
