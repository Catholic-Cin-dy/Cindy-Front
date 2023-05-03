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
const baseUrl = 'https://www.awesominki.shop/'; //api 연결을 위한 baseUrl
const config = {
  headers: { 'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo` }
};

export default function ProductDetail({ route }) {
  // route.params에서 전달받은 item 파라미터 추출
  const { productId } = route.params; // route.params에서 productId 추출

  //const [product, setProduct] = useState(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState();

  useEffect(() => {
    console.log('ProductDetail - productId : '+productId)

    axios.get(baseUrl + 'products/' + productId, { ...config })
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

    setLiked(!liked);

    /*axios.get(baseUrl + 'products/'+productId, { ...config })
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

    axios.patch(baseUrl + 'products/like/' + productId, {}, config)
      .then(response => setLiked(response.data.result))
      .catch(error => console.error(error));

    axios.get(baseUrl + 'products/' + productId, { ...config })
      .then(response => {
        setData(response.data.result)
      })

      .catch(error => console.error(error))

  }

  const ProductDetailBrand = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      console.log('ProductDetailBrand - productId : ' + productId);

      const fetchData = async () => {
        try {
          const response = await axios.get(baseUrl + 'products/brand/' + productId, { ...config });
          setData(response.data.result);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();

    }, []);

    // 상품 항목 클릭 시 ProductDetail 화면으로 이동하는 함수
    const navigation = useNavigation();
    /*const handleItemPress = (productId) => {
      // 해당 상품 정보를 route.params로 넘겨주고 ProductDetail 화면으로 이동
      console.log('product ID : ' + productId);
      navigation.navigate('ProductDetail', { productId });
    };*/

    return (
      <ScrollView
        horizontal // 가로 스크롤 가능하도록 설정
        contentContainerStyle={{ flexDirection: 'row' }} // 가로 방향으로 컨텐츠 배치
        style={styles.hscroll}
      >
        {/*<Text>{productId}</Text>*/}
        <View style={styles.content}>
          {data.map(item => (
            <TouchableOpacity
              style={styles.contentbox}
              key={item.productId}
              onPress={() => handleItemPress(item.productId)}
            >
              <Image style={styles.sImg} source={{ uri: item.imgUrl }} />
              <View style={styles.heartIconBackground2} key={item.productId}>
                <TouchableOpacity onPress={() => handleLike(item.productId)}>
                  <Image
                    style={styles.heartIcon2}
                    source={item.bookmark ? require("../../assets/like.png") : require("../../assets/unlike.png")}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.info1_s}>{item.brandName}</Text>
              <Text style={styles.info2_s}>{item.productName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  const ProductDetailOther = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      console.log('ProductDetailOther - productId : ' + productId);

      const fetchData = async () => {
        try {
          const response = await axios.get(baseUrl + 'products/other/' + productId, { ...config });
          setData(response.data.result);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();

    }, []);

    // 상품 항목 클릭 시 ProductDetail 화면으로 이동하는 함수
    const navigation = useNavigation();
    /*const handleItemPress = (productId) => {
      // 해당 상품 정보를 route.params로 넘겨주고 ProductDetail 화면으로 이동
      console.log('product ID : ' + productId);
      navigation.navigate('ProductDetail', { productId });
    };*/

    return (
      <ScrollView
        horizontal={true} // 가로 스크롤 가능하도록 설정
        contentContainerStyle={{ flexDirection: 'row' }} // 가로 방향으로 컨텐츠 배치
        style={styles.hscroll}
      >
        {/*<Text>{productId}</Text>*/}
        <View style={styles.content}>
          {data.map(item => (
            <TouchableOpacity
              style={styles.contentbox}
              key={item.productId}
              onPress={() => handleItemPress(item.productId)}
            >
              <Image style={styles.sImg} source={{ uri: item.imgUrl }} />
              <View style={styles.heartIconBackground2} key={item.productId}>
                <TouchableOpacity onPress={() => handleLike(item.productId)}>
                  <Image
                    style={styles.heartIcon2}
                    source={item.bookmark ? require("../../assets/like.png") : require("../../assets/unlike.png")}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.info1_s}>{item.brandName}</Text>
              <Text style={styles.info2_s}>{item.productName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };



  return (
    <ScrollView>
      <View style={styles.heartIconBackground} key={data.productId}>
        <Text>{data.bookmark ? data.bookmark.toString() : "유효값x pid: " + data.productId}</Text>
        <TouchableOpacity onPress={handleLike}>
          {/*<Image source={liked ? require('../../assets/like.png') : require('../../assets/unlike.png')} />*/}
          <Image style={styles.heartIcon}
                 source={data.bookmark ? require("../../assets/like.png") : require("../../assets/unlike.png")} />
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
        <Text />
        <Text />
        <Text style={styles.info3}>{data.productUrl}</Text>
        <Text />
        <Text />


        <Text>다른 사람들이 입은 스타일</Text>
        <Text />
        <Text />


        <Text>같은 브랜드 상품 조회</Text>
        <Text>{data.productId}</Text>
        <ProductDetailBrand/>
        <Text />
        <Text />


        <Text>다른 사람이 본 상품 리스트</Text>
        <Text>{data.productId}</Text>
        <ProductDetailOther/>
        <Text />
        <Text />
      </View>
    </ScrollView>
  );

};




const styles = {
  hscroll: {
    backgroundColor: 'pink',
    flex: 1,
  },
  sImg: {
    width: 156,
    height:168,
    backgroundColor:'gray',
    borderRadius: 8,
  },
  content: {
    width: '100%',
    height:250,
    borderWidth:1,
    borderColor:'red',
    flexDirection: 'row',
  },
  contentbox:{
    width: 156,
    flex: 0,
    borderWidth:1,
    borderColor:'red',
  },
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
  heartIconBackground2: {
    flex: 1,
    justifyContent: 'flex-end', // 수평 방향의 정렬을 오른쪽으로 설정
    alignItems: 'flex-end', // 수직 방향의 정렬을 아래로 설정
    backgroundColor: 'red',
  },
  heartIcon: {
    marginRight: 15,
    marginBottom: 5,
    marginTop: 5,
  },
  heartIcon2: {
    marginTop: -20,
    marginRight: 6,
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
  info1_s:{
    color:'gray',
    fontColor : 'gray',
    fontWeight:'bold',
    fontSize: 12,
    marginLeft: 12,
    marginTop: 2,
  },
  info2_s:{
    fontSize: 10,
    color:'black',
    fontColor: 'black',
    marginLeft: 12,
    marginRight: 12,
  },
  info3:{
    fontSize: 10,
    marginTop: 8,
    fontWeight:'bold',
    fontColor: 'gray',
    marginLeft: 4,
  },
}
