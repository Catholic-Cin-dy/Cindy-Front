import React from 'react';
import {StyleSheet, Text, View, Button, Alert,Image,SafeAreaView,ScrollView} from 'react-native';
import {red} from "react-native-reanimated/src";


export default function Maincontent() {

  return (
  <View>
    <View style={styles.maincontent}>
      <Text style={styles.text}>신디들을 위한 추천상품</Text>
      <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator = {true}
          onMomentumScrollEnd ={
            () => {console.log('Scrolling is End')}
          }
      >
      <View style={styles.content}>
        <View style={styles.contentbox}>
          <View style={styles.box}></View>
        </View>
        <View style={styles.contentbox}>
          <View style={styles.box}></View>
        </View>
        <View style={styles.contentbox}>
          <View style={styles.box}></View>
        </View>


      </View>
        </ScrollView>
    </View>
  </View>
  )}
  const styles = StyleSheet.create({
    maincontent:{
      width: '100%',
      borderWidth:1,
      borderColor:'black',
    },
    text:{
      fontSize: 18,
      fontWeight:"bold",
      color:'black',
      padding:20,
    },
    content: {
      width: '100%',
      height:250,
      borderWidth:1,
      borderColor:'red',
      flexDirection: 'row',

    },
    contentbox:{
      width: 167,
      height:220,
      borderWidth:1,
      borderColor:'red',
    },
    box:{
      width: 156,
      height:168,
      backgroundColor:'gray',
      borderRadius: 8,
      marginLeft:10,
    }


});
