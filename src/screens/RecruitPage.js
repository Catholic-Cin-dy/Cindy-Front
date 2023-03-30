import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import React from 'react';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink, getAccessToken,
} from '@react-native-seoul/kakao-login';
import {KakaoAccessTokenInfo} from "@react-native-seoul/kakao-login/src/types";

//productId, brandName, productName, imgUrl
export default function RecruitPage() {
  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    setResult(JSON.stringify(token));
  };

  return (
    <View>
      <Button title="로그인" onPress={signInWithKakao}/>
    </View>
  );
}
