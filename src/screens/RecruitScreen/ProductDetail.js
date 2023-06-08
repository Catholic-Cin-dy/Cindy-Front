import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';

import RecruitPage from './RecruitPage';
import WebViewScreen from './WebViewScreen';

const baseUrl = 'https://www.awesominki.shop/'; //api 연결을 위한 baseUrl
const config = {
  headers: { 'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo` }
};

const tagIcon = require('../../assets/tag2.png');
export default function ProductDetail({ route }) {
  // route.params에서 전달받은 item 파라미터 추출
  const { productId } = route.params; // route.params에서 productId 추출

  //const [product, setProduct] = useState(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState();
  const [link, setLink] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused(); // isFoucesd Define
  const navigation = useNavigation();

  useEffect(() => {
    console.log('ProductDetail - productId : '+productId)

    axios.get(baseUrl + 'products/' + productId, { ...config })
      .then(response => {
        setData(response.data.result);
        setLiked(response.data.result.bookmark); // like가 true or false
        setIsRefreshing(false);
      })
      .catch(error => console.error(error));



  }, [isFocused, isRefreshing]);

  //useState(false)로 하든 useState(data.bookmark)로 하든 api 연결은 문제 없음. 현재 상태 못받아오는게 문젠듯
  //const [liked, setLiked] = useState(false);
  // const [liked, setLiked] = useState(data.bookmark);
  // false: 좋아요를 누르지 않은 상태, true: 좋아요를 누른 상태
  function handleLike() {

    setLiked(!liked);

    axios.patch(baseUrl + 'products/like/' + productId, {}, config)
      .then(response =>
        setLiked(response.data.result),
        setIsRefreshing(false),
        )
      .catch(error => console.error(error));

    axios.get(baseUrl + 'products/' + productId, { ...config })
      .then(response => {
        setData(response.data.result);
        setIsRefreshing(false);
      })

      .catch(error => console.error(error))

  }

  const handleWebView = (url) => {
    // 웹뷰로 이동하는 로직을 구현합니다
    console.log('URL:', url);
    navigation.navigate('WebViewScreen',{ url: url });
  };

  const ProductDetailBrand = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      console.log('ProductDetailBrand - productId : ' + productId);

      const fetchData = async () => {
        try {
          const response = await axios.get(baseUrl + 'products/brand/' + productId, { ...config });
          setData(response.data.result);
          setIsRefreshing(false);
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

    const renderSuggestion = ({item}) => {
      return (
        <TouchableOpacity
          style={styles.contentbox}
          onPress={() => handleSuggestionPress(item)}>
          <View style={styles.item, {marginLeft: 0,}}>
            <Image style={styles.sImg} source={{ uri: item.imgUrl }} />
            <Text style={styles.sProductName}>{item.productName}</Text>
            <View style={{marginTop: 4}, {flexDirection: "row"}} key={item.productId}>
              <Image
                style={styles.heartIcon2}
                source={item.bookmark ? require("../../assets/like.png") : ""}
              />
              <Text style={{fontSize: 10, marginLeft: 3.5, fontColor: "#EB4B4B"}}>
                {item.bookmark ? "찜한 상품" : ""}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View>
      <FlatList
        data = {data}
        horizontal = {true}
        showsHorizontalScrollIndicator={false}
        renderItem = {renderSuggestion}
        keyExtractor = {item => item.productId.toString()}/>
      </View>
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
          setIsRefreshing(false);
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

    const renderSuggestion2 = ({item}) => {
      return (
        <TouchableOpacity
          style={styles.contentbox}
          onPress={() => handleItemPress(item.productId)}
        >
          <View style={styles.item, {marginLeft: 0,}}>
            <Image style={styles.sImg} source={{ uri: item.imgUrl }} />
            <View style={styles.oBrandBorder}>
              <Text style={styles.oBrandName}>{item.brandName}      </Text>
            </View>
            <Text style={styles.oProductName}>{item.productName}</Text>
            <View style={{ marginTop: 4 }, {flexDirection: "row"}} key={item.productId}>
              <Image
                style={styles.heartIcon2}
                source={item.bookmark ? require("../../assets/like.png") : ""}
              />
              <Text style={{ fontSize: 10, marginLeft: 3.5, fontColor: "#EB4B4B" }}>
                {item.bookmark ? "찜한 상품" : ""}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View>
        <FlatList
          data = {data}
          horizontal = {true}
          showsHorizontalScrollIndicator={false}
          renderItem = {renderSuggestion2}
          keyExtractor = {item => item.productId.toString()}/>
      </View>
    );
  };


  return (
    <ScrollView>
      <View
        style={styles.content}
        key={data.productId}
      >
        <View style={styles.imgcontainView}>
          <Image style={styles.image} source={{ uri: data.imgUrl }} />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.underlineContainer}>
            <Text style={styles.info1}>{data.brandName}</Text>
          </View>
          <View style={styles.heartIconBackground} key={data.productId}>
            {/*<Text>{data.bookmark ? data.bookmark.toString() : "유효값x pid: " + data.productId}</Text>*/}
            <TouchableOpacity onPress={handleLike}>
              {/*<Image source={liked ? require('../../assets/like.png') : require('../../assets/unlike.png')} />*/}
              <Image style={styles.heartIcon}
                     source={data.bookmark ? require("../../assets/like.png") : require("../../assets/unlike.png")} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.info2}>{data.productName}</Text>

        <View style={{ flexDirection: "row" }}>
          <Image source={tagIcon} style={{ marginLeft: 20, marginTop: 20, marginRight: 2 }} />
          <TouchableOpacity onPress={() => handleWebView(data.productUrl)}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.info3}>{data.productUrl}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalLine1} />
        <Text style={styles.sBrandName}>{data.brandName}의 다른 상품</Text>
        {/*<Text>{data.productId}</Text>*/}
        <ProductDetailBrand />


        <View style={styles.horizontalLine2} />


        <View style={styles.horizontalLine3} />
       <Text style={styles.sBrandName}>다른 사용자가 본 상품</Text>
        <ProductDetailOther />


        <View style={styles.horizontalLine2} />

      </View>
    </ScrollView>
  );

};




const styles = {
  sImg: {
    width: 156,
    height: 168,
    backgroundColor:'gray',
    borderRadius: 8,
  },
  content: {
    width: '100%',
    height: 250,
    flexDirection: 'row',
  },
  contentbox:{
    width: 156,
    flex: 0,
    marginLeft: 10,
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
    marginRight: 15,
  },
  heartIconBackground2: {
  },
  heartIcon: {
    marginRight: 15,
    marginBottom: 5,
    marginTop: 5,
  },
  heartIcon2: {

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
    width: '100%',
    height: 375,
    marginBottom: 0,
    marginTop: 0,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sBrandName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontColor: 'black',
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 3,
  },
  oBrandName: {
    fontSize: 14,
    fontWeight: 'bold',
    fontColor: 'black',
    marginTop: 4,
  },
  oBrandBorder: {
    borderBottomColor: 'black',
    borderBottomWidth: 1.5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    marginBottom: 16,
  },
  sProductName: {
    fontSize: 12,
    fontColor: 'black',
    marginTop: 4,
    fontWeight:'bold',
  },
  oProductName: {
    fontSize: 12,
    fontColor: 'gray',
    fontWeight: 'bold',
  },
  underlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 21,
  },
  info1:{
    color:'black',
    fontColor : 'black',
    fontWeight:'bold',
    fontSize: 22,
  },
  info2:{
    fontSize: 16,
    fontColor : 'black',
    marginTop: 10,
    marginLeft: 20,
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
    fontSize: 16,
    marginTop: 15,
    fontColor: '#B3B3B3',
    width: 280,
  },
  horizontalLine1: {
    width: 78,
    height: 1.5,
    backgroundColor: '#B3B3B3',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 40,
  },
  horizontalLine2: {
    width: '90%',
    height: 2,
    backgroundColor: '#EBEBEB',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
  },
  horizontalLine3: {
    width: 78,
    height: 1.5,
    backgroundColor: '#B3B3B3',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 77,
  },
}
