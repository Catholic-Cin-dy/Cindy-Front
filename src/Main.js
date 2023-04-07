import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import React, { useState } from "react";
import Test from './Test';
import ProductDetail from './ProductDetail';
import axios from 'axios';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
  getAccessToken,
} from '@react-native-seoul/kakao-login';
import {KakaoAccessTokenInfo} from '@react-native-seoul/kakao-login/src/types';

export default function Main({navigation}) {
  // const [categoryList, setCategoryList] = useState([]);
  // const [gender, setGender] = useState('');
  // const [name, setName] = useState('');
  // const [nickname, setNickname] = useState('');
  // const [password, setPassword] = useState('');
  // const [profileImgUrl, setProfileImgUrl] = useState('');
  // const [socialId, setSocialId] = useState('');

  // const handleSignUp = async (): Promise<void> => {
  //   try {
  //     // 회원가입 요청 데이터
  //     const signUpData = {
  //       categoryList: categoryList,
  //       gender: gender,
  //       name: name,
  //       nickname: nickname,
  //       password: password,
  //       profileImgUrl: profileImgUrl,
  //       socialId: socialId,
  //     };
  //
  //     // 회원가입 API 호출
  //     const response = await axios.post(
  //       'https://www.awesominki.shop/auth/signup/kakao',
  //       signUpData,
  //     );
  //
  //     console.log(response);
  //
  //     // 회원가입이 성공하면 로그인 페이지로 이동합니다.
  //     navigation.navigate('SignIn');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();
      const accessToken = token.accessToken;
      const response = await axios.post(
        'https://www.awesominki.shop/auth/kakao',
        {accessToken},
      );
      console.log(response);
      //실험용 화면 전환
    //   const userInfoResponse = await axios.get(
    //     'https://www.awesominki.shop/auth/kakao',
    //     { headers: { Authorization: `Bearer ${accessToken}` } },
    //   );
    //
    //   // 카카오 사용자 정보 파싱
    //   const userInfo = userInfoResponse.data;
    //   const userId = userInfo.id.toString();
    //   const nickname = userInfo.properties.nickname;
    //
    //   // 서버에서 회원 정보 요청
    //   const userResponse = await axios.get(`https://www.awesominki.shop/user/${userId}`);
    //
    //   // 서버에 회원 정보가 등록되어 있지 않은 경우
    //   if (userResponse.status === 404) {
    //     // 회원가입 페이지로 이동
    //     navigation.navigate('SignUp', { nickname });
    //   } else {
    //     // 회원 정보가 등록되어 있는 경우, 토큰 발급 요청
    //     const signInData = {
    //       userId: userId,
    //       accessToken: accessToken,
    //     };
    //     const signInResponse = await axios.post('https://www.awesominki.shop/auth/signup/kakao', signInData);
    //
    //     // 토큰을 저장하고, 다음 페이지로 이동
    //     const token = signInResponse.data.token;
    //     // 다음 페이지로 이동하는 코드...
    //   }
    } catch (err) {
      console.log(err);
    }
  };

  // const signInWithKakao = async (): Promise<void> => {
  //   const token: KakaoOAuthToken = await login();
  //   setResult(JSON.stringify(token));
  // };

  // @ts-ignore
  // const signInWithKakao = async (): Promise<void> => {
  //   // @ts-ignore
  //   const token: KakaoOAuthToken = await login();
  //
  //   const accessToken = token.accessToken;
  //   const url = 'https://www.awesominki.shop/auth/kakao';
  //   const data = {
  //     access
  //     Token: accessToken,
  //   };
  //   axios
  //     .post(url, data)
  //     .then(response => {
  //       console.log('응답 결과:', response.data);
  //     })
  //     .catch(error => {
  //       // 요청이 실패하면, 오류 메시지를 처리합니다.
  //       console.error('오류 발생:', error);
  //     });
  //
  //   // setResult(JSON.stringify(token));
  // };

  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

    setResult(message);
  };

  const getKakaoProfile = async (): Promise<void> => {
    const profile: KakaoProfile = await getProfile();

    setResult(JSON.stringify(profile));
  };

  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();

    setResult(message);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.login_image} source={require('./assets/logo.png')} />
      <Text style={styles.login_text}>신상을 : 디자인하다</Text>
      <TouchableOpacity onPress={signInWithKakao}>
        <Image
          style={styles.button_kakao}
          source={require('./assets/kakao_login_medium_wide.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingLeft: 52,
    paddingRight: 52,
    paddingTop: 250,
  },
  login_image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 260,
    height: 140,
    marginBottom: -10,
  },
  login_text: {
    textAlign: 'center',
    alignItems: 'center',
    color: 'white',
    // fontWeight: 'Medium',
    fontSize: 20,
    marginBottom: 110,
    // fontStyle:
  },
  button_kakao: {
    width: 300,
    height: 45,
  },
});
