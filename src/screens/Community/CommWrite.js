import React, { useState } from 'react';
import { View, StyleSheet, Text, Button,SafeAreaView,ScrollView,TextInput } from 'react-native';
import {  Pressable, Platform } from "react-native";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import UploadModeModal from "./UploadModeModal";
export default function CommWrite() {
    const[text, setText] = useState('');
    const onChangeText=(inputText) => {
        setText(inputText);
    }
     const submitBtn = () => {
        this.setState({text: this.state.inputText});
    }
    const imagePickerOption = {
        mediaType: "photo",
        maxWidth: 768,
        maxHeight: 768,
        includeBase64: Platform.OS === "android",
    };
    const onPickImage = (res) => {
        if (res.didCancel || !res) {
            return;
        }
        console.log("PickImage", res);
    }

    // 카메라 촬영
    const onLaunchCamera = () => {
        launchCamera(imagePickerOption, onPickImage);
    };

    // 갤러리에서 사진 선택
    const onLaunchImageLibrary = () => {
        launchImageLibrary(imagePickerOption, onPickImage);
    };

    // 안드로이드를 위한 모달 visible 상태값
    const [modalVisible, setModalVisible] = useState(false);

    // 선택 모달 오픈
    const modalOpen = () => {
        if (Platform.OS === "android") { // 안드로이드
            setModalVisible(true); // visible = true
        } else { // iOS

        }
    }
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <Text>이미지를 선택해주세요</Text>
                <View style={styles.image}>
                    <Pressable onPress={() => modalOpen()}>
                        <Text>Open Modal</Text>
                    </Pressable>
                </View>
            <UploadModeModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onLaunchCamera={onLaunchCamera}
                onLaunchImageLibrary={onLaunchImageLibrary} />
            {/*모달 띄우기*/}
                <Text>지도</Text>
                <View style={styles.map}></View>
                <Text>작성해주세요</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="글을 작성해주세요."
                />
                <Button title="제출" onPress = {submitBtn} />
            </SafeAreaView>

        </ScrollView>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image:{
        marginLeft:50,
        width:300,
        height:300,
        backgroundColor:'gray',
    },
    map:{
        marginTop:40,
        marginLeft:5,
        width:400,
        height:200,
        backgroundColor:'gray',
    },
    input:{
        marginTop:40,
        marginLeft:5,
        marginBottom:30,
        width:400,
        height:200,
        backgroundColor:'gray',
    },

});