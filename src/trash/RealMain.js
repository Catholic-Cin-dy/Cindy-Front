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
import App from '../NewApp';
import Test from '../Test';
import axios from 'axios';
import {KakaoOAuthToken,getAccessToken,getProfile, login} from "@react-native-seoul/kakao-login";
import {KakaoAccessTokenInfo} from '@react-native-seoul/kakao-login/src/types';
export default function Main({ navigation }) {
  // const [result, setResult] = useState<string>('');

  // const signInWithKakao = async (): Promise<void> => {
  //   try {
  //     const token = await login();
  //     setResult(JSON.stringify(token));
  //     console.log(setResult);
  //   } catch (err) {
  //     console.error('login err', err);
  //   }
  // };
  // const getProfile = async (): Promise<void> => {
  //   try {
  //     const profile = await getKakaoProfile();
  //
  //     setResult(JSON.stringify(profile));
  //     console.log(setResult);
  //   } catch (err) {
  //     console.error('signOut error', err);
  //   }
  // };
  // async function signInWithKakao(code: string): Promise<void> {
  //   try {
  //     const response = await axios.post('https://www.awesominki.shop/auth/kakao', {
  //       code: code,
  //     });
  //
  //     const { accessToken } = response.data.result;
  //     console.log('Access Token:', accessToken);
  //     // Access Token을 이용하여 서버에서 데이터를 가져오거나, 다른 작업을 수행할 수 있습니다.
  //   } catch (err) {
  //     console.error('Error:', err);
  //   }
  // }
  // const myFunction = async () => {
  //   console.log(await getProfile());
  // };
  // myFunction();

  const signInWithKakao = async (): Promise<void> => {
    let code: string;
    try {
      const token: KakaoOAuthToken = await login();
      const code = token.accessToken;
      console.log(code);
      const response = await axios.post(
        'https://www.awesominki.shop/auth/kakao',
        { accessToken: code },
        {
          headers: { Authorization: `Bearer ${code}` },
        },
      );
      console.log(response);
    } catch (err) {
      if (err.response?.status === 403) {
        navigation.navgiate('How');
        try {
          const token: KakaoOAuthToken = await login();
          const code2 = token.accessToken;
          console.log(code2);
          const requestBody = new FormData();
          requestBody.append('categoryList', '1');
          requestBody.append('gender', '남성');
          requestBody.append('name', '임');
          requestBody.append('nickname', '안녕');
          requestBody.append('password', '12');
          requestBody.append('profileImgUrl', '3');
          requestBody.append('socialId', 'dfdddf');
          const response2 = await axios.post(
            'https://www.awesominki.shop/auth/signup/kakao',
            requestBody,
            {
              headers: {
                'X-AUTH-TOKEN':
                  'eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${code}`,
              },
            },
          );
          console.log(response2);
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log(err);
      }
    }
  };




  // const signInWithKakao = async (): Promise<void> => {
  //   try {
  //     const token: KakaoOAuthToken = await login();
  //     const code = token.accessToken;
  //     console.log(code);
  //     // console.log(await getProfile());
  //     const response = await axios.post(
  //       'https://www.awesominki.shop/auth/kakao',
  //       {accessToken: code},
  //     );
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };




  // const getKakaoProfile = async (): Promise<void> => {
  //   const profile: KakaoProfile = await getProfile();
  //
  //   console.log(JSON.stringify(profile));
  // };

  // const signInWithKakao = async (): Promise<void> => {
  //   try {
  //     const token: KakaoOAuthToken = await login();
  //     const accessToken = token.accessToken;
  //
  //     const headers = { headers: { 'X-AUTH-TOKEN': 'eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo' } };
  //
  //     // 카카오 사용자 정보 파싱
  //     const userInfoResponse = await axios.get(
  //       'https://www.awesominki.shop/auth/kakao',
  //       headers,
  //     );
  //     const userInfo = userInfoResponse.data;
  //     const { id: socialId, properties: { nickname } } = userInfo;
  //
  //     // 서버에서 회원 정보 요청
  //     const userResponse = await axios.get(
  //       `https://www.awesominki.shop/auth/kakao`,
  //       headers,
  //     );
  //
  //     // 서버에 회원 정보가 등록되어 있지 않은 경우
  //     console.log(userResponse.status);
  //     if (userResponse.status === 404) {
  //       // 회원가입 페이지로 이동
  //       navigation.navigate('How', {
  //         categoryList: [],
  //         gender: '',
  //         name: '',
  //         nickname,
  //         password: '',
  //         profileImgUrl: '',
  //         socialId,
  //         isRequired: false,
  //       });
  //     } else {
  //       // 회원 정보가 등록되어 있는 경우, 토큰 발급 요청
  //       const signUpData = { nickname, socialId };
  //       const signInResponse = await axios.post(
  //         'https://www.awesominki.shop/auth/signup/kakao',
  //         signUpData,
  //         headers,
  //       );
  //
  //       // 토큰을 저장하고, 다음 페이지로 이동
  //       const token = signInResponse.data.token;
  //       navigation.navigate('How', { token });
  //     }
  //   } catch (error) {
  //     // 에러 처리 코드
  //   }
  // };




  // const signOutWithKakao = async (): Promise<void> => {
  //   const message = await logout();
  //
  //   setResult(message);
  // };
  //
  // const getKakaoProfile = async (): Promise<void> => {
  //   const profile: KakaoProfile = await getProfile();
  //
  //   setResult(JSON.stringify(profile));
  // };
  //
  // const unlinkKakao = async (): Promise<void> => {
  //   const message = await unlink();
  //
  //   setResult(message);
  // };

  return (
    <View style={styles.container}>
      <Image style={styles.login_image} source={require('../assets/logo.png')} />
      <Text style={styles.login_text}>신상을 : 디자인하다</Text>
      <TouchableOpacity onPress={signInWithKakao}>
        <Image
          style={styles.button_kakao}
          source={require('../assets/kakao_login_medium_wide.png')}
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
