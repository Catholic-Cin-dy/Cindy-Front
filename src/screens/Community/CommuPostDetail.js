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

const baseUrl = 'https://www.awesominki.shop/'; //api 연결을 위한 baseUrl
const config = {
  headers: { 'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo` }
};

export default function CommuPostDetail({ route }) {
  // route.params에서 전달받은 item 파라미터 추출
  const { boardId } = route.params; // route.params에서 boardId 추출

  //const [product, setProduct] = useState(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState();

  useEffect(() => {
    console.log('CommuPostDetail - boardId : '+boardId)

    axios.get(baseUrl + 'boards/' + boardId, { ...config })
      .then(response => {
        setData(response.data.result)
        setLiked(response.data.result.likeCheck) //like가 true or false
      })

      .catch(error => console.error(error))



  }, []);

  //useState(false)로 하든 useState(data.likeCheck)로 하든 api 연결은 문제 없음. 현재 상태 못받아오는게 문젠듯
  //const [liked, setLiked] = useState(false);
  // const [liked, setLiked] = useState(data.likeCheck);
  // false: 좋아요를 누르지 않은 상태, true: 좋아요를 누른 상태
  function handleLike() {

    setLiked(!liked);

    /*axios.get(baseUrl + 'products/'+boardId, { ...config })
      .then((response)=>{
        if(response.data.result.likeCheck == true){ //이미 좋아요가 눌려있는 상태
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

    axios.patch(baseUrl + 'boards/like/' + boardId, {}, config)
      .then(response => setLiked(response.data.result))
      .catch(error => console.error(error));

    axios.get(baseUrl + 'boards/' + boardId, { ...config })
      .then(response => {
        setData(response.data.result)
      })

      .catch(error => console.error(error))

  }



  return (
    <ScrollView>
      <View style={styles.profileContainer}>
        {item.profileImgUrl ? (
          <Image style={styles.profileImg} source={{ uri: item.profileImgUrl }} />
        ) : (
          <Image style={styles.defaultImg} source={require("../../assets/user.png")} />
        )}
        <Text style={styles.info2}>{item.writer}</Text>
      </View>

      <View style={styles.heartIconBackground} key={data.boardId}>
        <Text>{data.likeCheck ? data.likeCheck.toString() : "유효값x pid: " + data.boardId}</Text>
        <TouchableOpacity onPress={handleLike}>
          {/*<Image source={liked ? require('../../assets/like.png') : require('../../assets/unlike.png')} />*/}
          <Image style={styles.heartIcon}
                 source={data.likeCheck ? require("../../assets/like.png") : require("../../assets/unlike.png")} />
        </TouchableOpacity>
      </View>
      <View
        style={styles.content}
        key={data.boardId}
      >
        <ScrollView
          style={styles.imgcontainView}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          onMomentumScrollEnd={
            () => {
              console.log("Scrolling is End");
            }
          }
        >
          {/*{item.imgList.map((imgUrl, index) => (
              <Image key={index} source={{ uri: imgUrl }} style={styles.pImg} />
          ))}*/}
        </ScrollView>


        <Text style={styles.info1}>{data.title}</Text>
        <Text style={styles.info2}>{data.content}</Text>
        <Text />
        <Text />



      </View>
    </ScrollView>
  );

};




const styles = {
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 0,
  },
  defaultImg: {
    width: 30,
    height: 30,
    borderRadius: 0,
  },
  pImg:{
    width: 156,
    height: 156,
    backgroundColor:'gray',
    borderRadius: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
