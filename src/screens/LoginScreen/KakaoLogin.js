import {StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    KakaoOAuthToken,
    KakaoProfile,
    getProfile as getKakaoProfile,
    login,
    logout,
    unlink, getAccessToken,
} from '@react-native-seoul/kakao-login';
import {KakaoAccessTokenInfo} from "@react-native-seoul/kakao-login/src/types";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";

//productId, brandName, productName, imgUrl
export default function KakaoLogin() {
    const navigation = useNavigation();
    const signInWithKakao = async (): // @ts-ignore
    Promise<void> =>
    {
    try {
            const token: KakaoOAuthToken = await login();
            const accessToken = token.accessToken;
            const response = await axios.post(
              'https://www.awesominki.shop/auth/kakao',
              { accessToken },
            );
            console.log(response);
            //실험용 화면 전환
            navigation.navigate('MainPage');
        } catch (err) {
            console.log(err);
        }
    };
    // const signInWithKakao = async (): Promise<void> => {
    //     const token: KakaoOAuthToken = await login();
    //
    //     setResult(JSON.stringify(token));

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

    //이건 내가 만듦!!
    const getUserAccessToken = async (): Promise<void> => {
        const token: KakaoAccessTokenInfo = await getAccessToken();

        setResult(JSON.stringify(token));
    };

    return (
        <View>
            <TouchableOpacity
              onPress={signInWithKakao}>
                <Image
                  style={styles.btnimg}
                  source={require("../../assets/kakao_login_medium_wide.png")} />
            </TouchableOpacity>
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

//<Button title="로그인" onPress={signInWithKakao}/>

//<CustomButton title="Custom Button" onPress={() => alert('Custom Button Pressed!')} />
