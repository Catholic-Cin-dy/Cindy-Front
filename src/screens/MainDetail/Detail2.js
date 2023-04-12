import React, { useState, useEffect }  from 'react';
import {StyleSheet, Text, View, Button, Alert,Image,SafeAreaView,ScrollView,TouchableOpacity} from 'react-native';
import {red} from "react-native-reanimated/src";
import axios from 'axios';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const baseUrl = 'https://www.awesominki.shop';


export default function Detail2({navigation}) {

    const [data, setData] = useState([]);
    const [users, setUsers] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const config = {
            headers: { 'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo` }
        };



        axios.get(baseUrl + '/home/new', {...config })
            .then(response => setData(response.data.result))
            .catch(error => console.error(error))
    }, []);



    return (
        <ScrollView>
            <View style={styles.content}>
                {data && data.map(item => (

                    <View style={styles.contentbox}>
                        <View><Image key={item.productId} style={styles.box} source={{ uri: item.productImgUrl }}/></View>
                        <View style={styles.intext}>
                            <Text key={item.productId} style={styles.Info1}>{item.brand}</Text>
                            <Text key={item.productId} style={styles.Info2}>{item.productName}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        width:'100%',
        flexDirection: 'row',
        flexWrap: 'wrap',

        flex: 1,

    },
    contentbox: {
        width: 167,
        height: 240,
        marginLeft:25,
    },
    intext: {

        padding: 10,
        height: 70,
        width: 150,
        marginLeft: 5,
    },
    box: {
        width: 156,
        height: 168,
        backgroundColor: 'gray',
        borderRadius: 8,
        marginLeft: 10,
    },
    Info1: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 13,
    },
    Info2: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: 'bold',
    },
})