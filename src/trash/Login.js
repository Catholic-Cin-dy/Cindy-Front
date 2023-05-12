import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import React from 'react';
import Test from './Test;
import {
    KakaoOAuthToken,
    KakaoProfile,
    getProfile as getKakaoProfile,
    login,
    logout,
    unlink, getAccessToken,
} from '@react-native-seoul/kakao-login';
import {KakaoAccessTokenInfo} from "@react-native-seoul/kakao-login/src/types";


export default function Login() {
    const signInWithKakao = async (): Promise<void> => {
        try {
            const token: KakaoOAuthToken = await login();
            setAccessToken(token.accessToken);
            const profile: KakaoProfile = await getKakaoProfile();
            //로그인 성공시
            //필요한 정보를 가져와서 처리

        } catch (e) {
            //로그인 실패시
            Alert.alert('카카오 로그인 실패', e.message);
        }
    };


    //     setResult(JSON.stringify(token));
    // }

    const signOutWithKakao = async (): Promise<void> => {
        const message = await logout();

        setResult(message);
    }

    const getKakaoProfile = async (): Promise<void> => {
        const profile: KakaoProfile = await getProfile();

        setResult(JSON.stringify(profile));
    }

    const unlinkKakao = async (): Promise<void> => {
        const message = await unlink();

        setResult(message);
    }

    //이건 내가 만듦!!
    const getUserAccessToken = async (): Promise<void> => {
        const token: KakaoAccessTokenInfo = await getAccessToken();

        setResult(JSON.stringify(token));
    }

    return (
        <View>
            <Button title="로그인" onPress={signInWithKakao}/>
        </View>
    );
}

//<Button title="로그인" onPress={signInWithKakao}/>

//<CustomButton title="Custom Button" onPress={() => alert('Custom Button Pressed!')} />
