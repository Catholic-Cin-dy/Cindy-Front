import React, {Component} from "react";
import {Button, Alert, View, Text, StyleSheet, TextInput} from "react-native";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

export default class Test extends Component {
    state = {
        text: '',
        inputText: ''
    }
    submitBtn = () => {
        this.setState({text: this.state.inputText});
    }
    render() {
        return (
            <View style={styles.default}>
                <Text style={styles.header3}>프로필을 설정해주세요</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text)=>{this.setState({inputText: text})}}
                    placeholder="닉네임 입력"/>
                <Button title="다음" onPress={this.submitBtn} />
                <Text style ={styles.showText}>{this.state.text}</Text>
            </View>
        );
    }
};
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

const styles = StyleSheet.create({
    default: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop:16,
    },
    header3: {
        textAlign: "left",
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
    },
});


