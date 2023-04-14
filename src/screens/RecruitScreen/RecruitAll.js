import React from 'react';
import { View, StyleSheet, Text, Button, ScrollView, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import RecruitPage from './RecruitPage';
import ProductDetail from './ProductDetail';
const baseUrl = 'https://www.awesominki.shop'; //api 연결을 위한 baseUrl
export default function RecruitAll({ route }) {
  //const { tabIndex } = route.params.tabIndex;
  //const tabIndex = route.params ? route.params.tabIndex : 0;

  //const { tabIndex } = route.params;

  const [data, setData] = useState([]);
  const [users, setUsers] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const config = {
      headers: { 'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo` }
    };

    const params = {
      page: 0,
      size: 100,
      filter: 0
    };

    axios.get(baseUrl + '/products', { params, ...config })
      .then(response => setData(response.data.result.contents))
      .catch(error => console.error(error))
  }, []);

  // 상품 항목 클릭 시 ProductDetail 화면으로 이동하는 함수
  const navigation = useNavigation();
  const handleItemPress = (productId) => {
    // 해당 상품 정보를 route.params로 넘겨주고 ProductDetail 화면으로 이동
    console.log('product ID : ' + productId);
    navigation.navigate('ProductDetail', { productId });
  };

  return (
    <ScrollView>
      <View style={styles.column}>
        {data.slice(0, Math.ceil(data.length / 2)).map(item => (
          <TouchableOpacity
            style={styles.item}
            key={item.productId}
            onPress={() => handleItemPress(item.productId)}
          >
            <Image style={styles.box} source={{ uri: item.imgUrl }} />
            <Text style={styles.info1}>{item.brandName}</Text>
            <Text style={styles.info2}>{item.productName}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.column}>
        {data.slice(Math.ceil(data.length / 2)).map(item => (
          <TouchableOpacity
            style={styles.item}
            key={item.productId}
            onPress={() => handleItemPress(item.productId)}
          >
            <Image style={styles.box} source={{ uri: item.imgUrl }} />
            <Text style={styles.info1}>{item.brandName}</Text>
            <Text style={styles.info2}>{item.productName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  contentbox:{
    width: 167,
    height:240,
    borderWidth:1,
    borderColor:'white',
  },
  box:{
    width: 156,
    height:168,
    backgroundColor:'gray',
    borderRadius: 8,
  },
  intext:{
    padding:10,
    height:43,
    width: 150,
    marginLeft:5,
  },
  info:{
    padding:10,
    height:43,
    width: 150,
    marginLeft:5,
  },
  info1:{
    color:'black',
    fontColor : 'black',
    fontWeight:'bold',
    fontSize: 13,
    marginLeft: 4,
    marginTop: 8,
  },
  info2:{
    fontSize: 12,
    marginTop: 8,
    fontWeight:'bold',
    fontColor: 'gray',
    marginLeft: 4,
  },
  image: {
    width: '100%',
    height: 519,
  },
  content: {
    width: '100%',
    height:250,
    borderWidth:1,
    borderColor:'red',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  item: {
    width: 156,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  text: {
    marginHorizontal: 8,
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer : {

  },
  newsContainer : {

  },
  companyHeader : {

  },
  companyText : {

  },
  artImage : {

  },
  artTitle : {

  },
  article : {

  }

});


// <View>
//   <Text>전체 상품 조회</Text>
//   <Button
//     title="상세보기"
//     onPress={() => navigation.push('Detail', {id: 1})}
//   />
// </View>


// <ScrollView style={styles.scrollContainer} horizontal={true} showsHorizontalScrollIndicator={false} >
//   {users.map(user => (
//     <View style={styles.newsContainer}>
//       <View style={styles.companyHeader}><Text key={user.productId} style={styles.companyText}>{user.productId}</Text></View>
//       <TouchableOpacity activeOpacity='1' onLongPress={function () {navigation.push('Detail', {id: user.productId})}} style={styles.article}>
//         <View><Image key={user.productId} style={styles.artImage} source={{uri: user.imgUrl }}/></View>
//         <View><Text key={user.productId} style={styles.artTitle}>{user.brandName}</Text></View>
//         <View><Text key={user.productId} style={styles.artTitle}>{user.productName}</Text></View>
//       </TouchableOpacity>
//     </View>
//   ))}
// </ScrollView>
