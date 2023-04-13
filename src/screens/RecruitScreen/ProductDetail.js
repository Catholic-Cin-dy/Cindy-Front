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
const baseUrl = 'https://www.awesominki.shop'; //api 연결을 위한 baseUrl

export default function ProductDetail({ route }) {
  // route.params에서 전달받은 item 파라미터 추출
  const { productId } = route.params; // route.params에서 productId 추출

  //const [product, setProduct] = useState(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState();

  useEffect(() => {
    const config = {
      headers: { 'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo` }
    };

    // const params = {
    //   productId: route.params
    // };

    axios.get(baseUrl + '/products/'+productId, { ...config })
      .then(response => {
        setData(response.data.result)
        setLiked(response.data.result.bookmark) //like가 true or false
      })

      .catch(error => console.error(error))



  }, []);

  //useState(false)로 하든 useState(data.bookmark)로 하든 api 연결은 문제 없음. 현재 상태 못받아오는게 문젠듯
  //const [liked, setLiked] = useState(false);
  // const [liked, setLiked] = useState(data.bookmark);
  // false: 좋아요를 누르지 않은 상태, true: 좋아요를 누른 상태
  function handleLike() {
    const config = {
      headers: { 'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo` }
    };

    setLiked(!liked);



    /*axios.get(baseUrl + '/products/'+productId, { ...config })
      .then((response)=>{
        if(response.data.result.bookmark == true){ //이미 좋아요가 눌려있는 상태
          //showToastMessage("좋아요 삭제");
          //비워진 하트로 바뀌게
          // 토스트 메시지 띄우기
          setLiked(false);
        }else {
          //showToastMessage("좋아요");
          //채워진 하트로 바뀌게
          setLiked(true);
        }
      })*/

    axios.patch(baseUrl + '/products/like/' + productId, {}, config)
      .then(response => setLiked(response.data.result))
      .catch(error => console.error(error));

    axios.get(baseUrl + '/products/'+productId, { ...config })
      .then(response => {
        setData(response.data.result)
      })

      .catch(error => console.error(error))

  }


  return (
    <ScrollView>
      <View style={styles.heartIconBackground} key={data.productId}>
        <Text>{data.bookmark ? data.bookmark.toString() : '유효값x pid: '+data.productId}</Text>
        <TouchableOpacity onPress={handleLike}>
          {/*<Image source={liked ? require('../../assets/like.png') : require('../../assets/unlike.png')} />*/}
          <Image style={styles.heartIcon} source={data.bookmark ? require("../../assets/like.png") : require("../../assets/unlike.png")} />
        </TouchableOpacity>
      </View>
      <View
        style={styles.content}
        key={data.productId}
      >
        <View style={styles.imgcontainView}>
        <Image style={styles.image} source={{ uri: data.imgUrl }} />
        </View>
        <Text style={styles.info1}>{data.brandName}</Text>
        <Text style={styles.info2}>{data.productName}</Text>
        <Text/>
        <Text/>
        <Text style={styles.info3}>{data.productUrl}</Text>
        <Text/>
        <Text/>
      </View>
    </ScrollView>
  );

};



const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIconBackground: {
    flex: 1,
    justifyContent: 'flex-end', // 수평 방향의 정렬을 오른쪽으로 설정
    alignItems: 'flex-end', // 수직 방향의 정렬을 아래로 설정
    backgroundColor: '#fff',
  },
  heartIcon: {
    marginRight: 15,
    marginBottom: 5,
    marginTop: 5,
  },
  content: {
    backgroundColor: '#fff',
  },
  imgcontainView: {
    flex: 1,
    justifyContent: 'center', // 수평 방향의 정렬을 가운데로 설정
    alignItems: 'center', // 수직 방향의 정렬을 가운데로 설정
  },
  image: {
    width: '95%',
    height: 400,
    marginBottom: 16,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    marginBottom: 16,
  },

  info1:{
    color:'black',
    fontColor : 'black',
    fontWeight:'bold',
    fontSize: 15,
    marginLeft: 20,
    marginTop: 8,
  },
  info2:{
    fontSize: 20,
    fontWeight:'bold',
    fontColor: 'gray',
    marginLeft: 12,
  },
  info3:{
    fontSize: 10,
    marginTop: 8,
    fontWeight:'bold',
    fontColor: 'gray',
    marginLeft: 4,
  },
}
