import {StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image} from 'react-native';
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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

<<<<<<<<< Temporary merge branch 1:src/Login.js
export default function Login({navigation}) {
=========
//productId, brandName, productName, imgUrl
export default function KakaoLogin() {
>>>>>>>>> Temporary merge branch 2:src/screens/LoginScreen/KakaoLogin.js
    const signInWithKakao = async (): Promise<void> => {
        const token: KakaoOAuthToken = await login();

        setResult(JSON.stringify(token));
    };

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
<<<<<<<<< Temporary merge branch 1:src/Login.js
            <Button title="로그인" onPress={signInWithKakao}/>
            <Button title="메인 화면" onPress={() => navigation.navigate('Main1')} />
=========
            <TouchableOpacity
              onPress={signInWithKakao}>
                <Image
                  style={styles.btnimg}
                  source={require("../../assets/kakao_login_medium_wide.png")} />
            </TouchableOpacity>
>>>>>>>>> Temporary merge branch 2:src/screens/LoginScreen/KakaoLogin.js
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
