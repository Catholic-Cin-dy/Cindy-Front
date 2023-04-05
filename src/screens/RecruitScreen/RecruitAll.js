import React from 'react';
import { View, StyleSheet, Text, Button, ScrollView, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import RecruitPage from './RecruitPage';
const baseUrl = 'https://www.awesominki.shop'; //api 연결을 위한 baseUrl
export default function RecruitAll({ navigation, route }) {
  //const { tabIndex } = route.params.tabIndex;

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


  return (
    <ScrollView>
      {data.map(item => (
        <View>
          <Image
            key={item.productId}
            style={{ width: 100, height: 150 }}
            source={{ uri: item.imgUrl }}
          />
          {/*<Text key={item.productId}>{item.productId}</Text>*/}
          <Text key={item.brandName}>{item.brandName}</Text>
          <Text key={item.productName}>{item.productName}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
