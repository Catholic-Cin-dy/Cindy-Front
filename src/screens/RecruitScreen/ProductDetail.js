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

  const config = {
    headers: { 'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo` }
  };

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
      }) //data

      .catch(error => console.error(error))

  }, []);

  //const [liked, setLiked] = useState(false);
  const [liked, setLiked] = useState(data.bookmark);
  // false: 좋아요를 누르지 않은 상태, true: 좋아요를 누른 상태
  function handleLike() {
    const config = {
      headers: { 'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo` }
    };

    setLiked(!liked);

    axios.patch(baseUrl + '/products/like/' + productId, {}, config)
      .then(response => setLiked(response.data.result))
      .catch(error => console.error(error));

  }



  return (
    <View>
      <View>
        <TouchableOpacity onPress={handleLike}>
          <Image source={liked ? require('../../assets/like.png') : require('../../assets/unlike.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.column}>
        <View
          style={styles.item}
          key={data.productId}
        >
          <Image style={styles.image} source={{ uri: data.imgUrl }} />
          <Text style={styles.info1}>{data.brandName}</Text>
          <Text style={styles.info2}>{data.productName}</Text>
          <Text style={styles.info2}>{data.productUrl}</Text>
        </View>
      </View>
    </View>
  );

};



const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
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
}
