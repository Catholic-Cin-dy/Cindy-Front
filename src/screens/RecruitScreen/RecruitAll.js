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
const baseUrl = 'https://www.awesominki.shop/'; //api 연결을 위한 baseUrl
const config = {
  headers: { 'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo` }
};
const RecruitAll = (props) => {
  // props에서 tabIndex 값을 받아옴
  const { tabIndex } = props;

  // tabIndex 값을 사용하여 원하는 로직을 구현
  const [data, setData] = useState([]);
  const [users, setUsers] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {


    const params = {
      page: 0,
      filter: tabIndex
    };

    axios.get(baseUrl + 'products', { params, ...config })
      .then(response =>
        setData(response.data.result.contents)
      )
      .catch(error => console.error(error))
  }, []);

  // 상품 항목 클릭 시 ProductDetail 화면으로 이동하는 함수
  const navigation = useNavigation();
  const handleItemPress = (productId) => {
    // 해당 상품 정보를 route.params로 넘겨주고 ProductDetail 화면으로 이동
    console.log('product ID : ' + productId);
    navigation.navigate('ProductDetail', { productId });
  };

  const [liked, setLiked] = useState();
  const handleLike = (productId) => {

    const params = {
      page: 0,
      filter: tabIndex
    };

    setLiked(!liked);
    axios.patch(baseUrl + 'products/like/' + productId, {}, config)
      .then(response => setLiked(response.data.result))
      .catch(error => console.error(error));

    axios.get(baseUrl + 'products', { params, ...config })
      .then(response =>
        setData(response.data.result.contents)
      )
      .catch(error => console.error(error))


    if(liked)
      console.log(productId + "번 상품 좋아요 취소 버튼 누름");
    else
      console.log(productId + "번 상품 좋아요 버튼 누름");
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.row}>
        <View style={styles.column1}>
          {data.slice(0, data.length / 2).map(item => (
            // 첫 번째 열에 해당하는 데이터를 매핑하여 표시
            <TouchableOpacity
              style={styles.item}
              key={item.productId}
              onPress={() => handleItemPress(item.productId)}
            >
              {/* 이미지와 하트 아이콘, 상품 정보 등을 표시 */}
              <Image style={styles.pImg} source={{ uri: item.imgUrl }}/>
              <View style={styles.heartIconBackground} key={item.productId}>
                <TouchableOpacity onPress={() => handleLike(item.productId)}>
                  <Image style={styles.heartIcon} source={item.bookmark ? require("../../assets/like.png") : require("../../assets/unlike.png")} />
                </TouchableOpacity>
              </View>
              <Text style={styles.info1}>{item.brandName}</Text>
              <Text style={styles.info2}>{item.productName}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.column2}>
          {data.slice(data.length / 2).map(item => (
            // 두 번째 열에 해당하는 데이터를 매핑하여 표시
            <TouchableOpacity
              style={styles.item}
              key={item.productId}
              onPress={() => handleItemPress(item.productId)}
            >
              {/* 이미지와 하트 아이콘, 상품 정보 등을 표시 */}
              <Image style={styles.pImg} source={{ uri: item.imgUrl }}/>
              <View style={styles.heartIconBackground} key={item.productId}>
                <TouchableOpacity onPress={() => handleLike(item.productId)}>
                  <Image style={styles.heartIcon} source={item.bookmark ? require("../../assets/like.png") : require("../../assets/unlike.png")} />
                </TouchableOpacity>
              </View>
              <Text style={styles.info1}>{item.brandName}</Text>
              <Text style={styles.info2}>{item.productName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>


  );
};

export default RecruitAll;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  contentbox:{
    width: 167,
    height:240,
    borderWidth:1,
    borderColor:'white',
  },
  pImg:{
    width: 156,
    height: 156,
    backgroundColor:'gray',
    borderRadius: 8,
  },
  intext:{
    padding:10,
    height:43,
    width: 150,
    marginLeft:5,
  },
  heartIconBackground: {
    flex: 1,
    justifyContent: 'flex-end', // 수평 방향의 정렬을 오른쪽으로 설정
    alignItems: 'flex-end', // 수직 방향의 정렬을 아래로 설정
    backgroundColor: '#fff',
  },
  heartIcon: {
    marginTop: -26,
    marginRight: 6,
  },
  info:{
    padding:10,
    height:43,
    width: 150,
    marginLeft:5,
  },
  info1:{
    color: 'black',
    fontColor : 'black',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 8,
    flexShrink: 1,
  },
  info2:{
    fontWeight:'bold',
    fontColor: 'gray',
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,
    flexShrink: 1,
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
  column1: {
    marginLeft: 16,
    marginTop: 29,
    marginBottom: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  column2: {
    marginRight: 16,
    marginTop: 29,
    marginBottom: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  item: {
    width: 156,
    flex: 0,
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
