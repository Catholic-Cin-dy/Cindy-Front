import React from 'react';
import {StyleSheet, Text, View, Button, Alert,Image,SafeAreaView,ScrollView} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import main from './assets/main.jpg';
import Maincontent from "./component/Maincontent";
import Maincontent1 from "./component/Maincontent1";
import Mainslider from "./component/Mainslider";
export default function Main1() {

  function sliderTouch(index){
    alert(index);
  }

  return (
      <ScrollView>
  <SafeAreaView style={styles.container}>
    <View style={styles.header}></View>
    <View style={styles.content}>
      <Mainslider/>
      <Maincontent1/>
      <Maincontent/>
    </View>
    <View style={styles.footer}></View>
  </SafeAreaView>
      </ScrollView>

)
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 519,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    height: 50,
    backgroundColor: 'blue',
  },
  container: {
    flex: 1,
  },

  
});