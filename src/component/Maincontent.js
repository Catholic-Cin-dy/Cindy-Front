import React, { useState, useEffect }  from 'react';
import {StyleSheet, Text, View, Button, Alert,Image,SafeAreaView,ScrollView} from 'react-native';
import {red} from "react-native-reanimated/src";
import axios from 'axios';
import Detail1 from "../screens/MainDetail/Detail1";
import {createStackNavigator} from "@react-navigation/stack";
const baseUrl = 'https://www.awesominki.shop';
const Stack = createStackNavigator();

export default function Maincontent() {

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
  <View>
    <View style={styles.maincontent}>
      <View style={styles.maintext}>
        <Text style={styles.text1}>신상(New Release)</Text>
        <Text style={styles.text2}>전체보기</Text>
      </View>
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator = {true}
            onMomentumScrollEnd ={
              () => {console.log('Scrolling is End')}
            }
        >
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
    </View>
  </View>
  )}

  const styles = StyleSheet.create({
    maincontent:{
      width: '100%',

    },
    maintext:{
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    text1:{
      fontSize: 18,
      fontWeight:"bold",
      color:'black',
      padding:20,
    },
    text2:{
      color:'black',
      fontSize: 12,
      padding:20,
    },
    content: {
      width: '100%',
      height:250,

      flexDirection: 'row',

    },
    contentbox:{
      width: 167,
      height:240,

    },
    intext:{

      padding:10,
      height:70,
      width: 150,
      marginLeft:5,
    },
    box:{
      width: 156,
      height:168,
      backgroundColor:'gray',
      borderRadius: 8,
      marginLeft:10,
    },
    Info1:{
      color:'black',
      fontWeight:'bold',
      fontSize: 13,
    },
    Info2:{
      fontSize: 12,
      marginTop:5,
      fontWeight:'bold',
    },


});
