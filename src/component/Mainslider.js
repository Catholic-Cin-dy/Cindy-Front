import React, { useState, useEffect }  from 'react';
import {StyleSheet, Text, View, Button, Alert,Image,SafeAreaView,ScrollView} from 'react-native';
import Swiper from 'react-native-web-swiper';
import axios from 'axios';
const baseUrl = 'https://www.awesominki.shop';
export default class extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <Swiper>
                    <View style={[styles.slideContainer,styles.slide2]} source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }} >
                        <Text>치삼이</Text>
                        <Text></Text>
                    </View>
                    <View style={[styles.slideContainer,styles.slide2]}>
                        <Text>Slide 2</Text>
                    </View>
                    <View style={[styles.slideContainer,styles.slide3]}>
                        <Text>Slide 3</Text>
                    </View>
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 519,
    },
    slideContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slide1: {
        backgraoundColor: 'rgba(200,20,20,0.3)',
    },
    slide2: {
        backgroundColor: 'rgba(20,200,20,0.3)',
    },
    slide3: {
        backgroundColor: 'rgba(200,20,20,0.3)',
    },
});