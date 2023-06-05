import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Modal,
  ImageBackground,
} from 'react-native';
//import Modal from 'react-native-simple-modal';
import { MenuProvider } from 'react-native-popup-menu';
//import Modal from 'react-native-simple-modal';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import {useState, useEffect, useRef} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';

import CommuScreen from './CommuScreen';

const baseUrl = 'https://www.awesominki.shop/'; //api 연결을 위한 baseUrl
const config = {
  headers: {
    'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo`,
  },
};
const payload = {latitude: 37.541, longitude: 126.986}; //사용자의 위치 받아온거 여기 들어가야 함.

export default function CommuPostDetail({route}) {
  // route.params에서 전달받은 item 파라미터 추출
  const {boardId} = route.params; // route.params에서 boardId 추출
  const {commentId} = route.params;
  //console.log('route 값으로 받은 params : ' + boardId);

  //글자 태그 width 넒이
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);

  const [data, setData] = useState([]);
  const [cdata, setCData] = useState([]);
  //const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState();
  const [comment, setComment] = useState('');
  const [commentEdit, setCommentEdit] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fixId, setfixId] = useState();
  const [CommentIdBeingEdited, setCommentIdBeingEdited] = useState();
  const navigation = useNavigation();

  const onChangeComment = inputText => {
    setComment(inputText);
  };

  const onChangeComment2 = inputText => {
    setCommentEdit(inputText);
  };

  const isFocused = useIsFocused(); // isFoucesd Define
  useEffect(() => {
    console.log('CommuPostDetail - boardId : ' + boardId);

    if (textRef.current) {
      textRef.current.measure((x, y, width, height) => {
        setTextWidth(width);
      });
    }

    axios
      .get(baseUrl + 'boards/' + boardId, {...config})
      .then(response => {
        setData(response.data.result);
        setLiked(response.data.result.likeCheck); //like가 true or false
      })
      .catch(error => console.error(error));

    axios
      .get(baseUrl + 'boards/comments/' + boardId, {...config})
      .then(response => {
        setCData(response.data.result.contents);
        setIsRefreshing(false); // 화면 새로고침 완료
      })
      .catch(error => console.error(error));
    // }, [isFocused]);
  }, [isFocused, isRefreshing]);

  function handleLike() {
    setLiked(!liked);

    axios
      .patch(baseUrl + 'boards/like/' + boardId, {}, config)
      .then(response => setLiked(response.data.result))
      .catch(error => console.error(error));

    axios
      .get(baseUrl + 'boards/' + boardId, {...config})
      .then(response => {
        setData(response.data.result);
      })

      .catch(error => console.error(error));
  }

  function showCoordinate() {}

  //전송버튼 누르면
  const writeComment = () => {
    const commentpayload = {boardId: boardId, comment: comment}; //사용자의 위치 받아온거 여기 들어가야 함.
    const params = {
      page: 0,
    };

    console.log('boardId : ', boardId);
    console.log('comment : ', comment);

    axios
      .post(baseUrl + 'boards/comments', commentpayload, {...config})
      .then(response => {
        setIsRefreshing(true);
      });

    setComment('');
  };

  function deleteComment(item) {
    console.log('댓글은', item);
    const commentId = item.commentId;
    const params = {
      commentId: commentId,
    };

    console.log(commentId);
    axios
      .delete(baseUrl + 'boards/comments/' + commentId, {...config})
      .then(response => {
        console.log(cdata);
        // setCData(prevData =>
        //   prevData.filter(cdata => cdata.commentId !== commentId),
        // );
        setIsRefreshing(true);
      })
      .catch(error => console.error(error));
  }

  function fixComment(commentItem) {
    //setIsEditing(true);
    console.log('댓글 수정은 ', commentItem);
    console.log(fixId);
    const params = {
      commentId: fixId,
      comment: commentEdit,
    };
    console.log(params);
    axios
      .patch(baseUrl + 'boards/comments', params, {...config})
      .then(response => {
        console.log(cdata);
        // setCData(prevData =>
        //   prevData.filter(cdata => cdata.commentId !== commentId),
        // );
        setIsRefreshing(true);
        setIsEditing(false);
      })
      .catch(error => console.error(error));
  }
  const editComment = commentItem => {
    // 댓글 수정 로직을 추가할 수 있습니다.
    console.log('댓글 수정:', commentItem);
    console.log(commentItem.commentId);
    setfixId(commentItem.commentId);
    setCommentIdBeingEdited(commentItem.commentId);
    setIsEditing(true);
  };
  function deletePost() {
    const params = {
      boardId: boardId,
    };

    axios
      .delete(baseUrl + 'boards/delete/' + boardId, {...config})
      .then(response => {

      })
      .catch(error => console.error(error));
  }
  function modifyPost() { //수정 api바뀌면 적용 예정
    const params = {
      boardId: boardId,
    };

    /*axios
      .delete(baseUrl + 'boards/delete/' + boardId, {...config})
      .then(response => {

      })
      .catch(error => console.error(error));*/
  }


  function movePost() {
    navigation.pop();
  }

  const AddGoods = props => {
    const [ImageSelectorPopupVisiable, setImageSelectorPopupVisiable] =
      useState(false);
  };

  return (
    <View>
      <ScrollView>
        {/* <Text><CommuDelModiModal/></Text> */}
        <View style={styles.item} key={data.boardId}>
          <Text>boardId : {data.boardId}</Text>
          <View style={styles.profileContainer}>
            {data.profileImgUrl ? (
              <Image
                style={styles.profileImg}
                source={{ uri: data.profileImgUrl }}
              />
            ) : (
              <Image
                style={styles.defaultImg}
                source={require("../../assets/user.png")}
              />
            )}
            <Text style={styles.info2}>{data.writer}</Text>

            {/*<Text>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => navigation.pop()}>
                <Text>이동</Text>
              </TouchableOpacity>
            </Text>*/}

            <Text style={styles.deleteBtn}>
              {data.my ? (
                <TouchableOpacity
                  onPress={() => {
                    deletePost();
                    navigation.pop();
                  }}>
                  <Text>삭제</Text>
                </TouchableOpacity>
              ) : (
                "유효값x pid: " + data.boardId
              )}
            </Text>

            <Text style={styles.modifyBtn}>
              {data.my ? (
                <TouchableOpacity
                  onPress={() => {
                    modifyPost();
                    navigation.pop();
                  }}>
                  <Text>수정</Text>
                </TouchableOpacity>
              ) : (
                "유효값x pid: " + data.boardId
              )}
            </Text>
          </View>

          <View>
            {/*<Swiper
            autoplay={true}
            autoplayTimeout={2.5}
            showsPagination={false}>
            {data && data.imgList && data.imgList.map((img, imgId) => (
              <View key={imgId}>
                <Image
                  source={{ uri: img.imgUrl }}
                  style={styles.pImg}
                />
              </View>
            ))}
          </Swiper>*/}
          </View>

          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              onMomentumScrollEnd={() => {
                console.log("Scrolling is End");
              }}>
              {data &&
                data.imgList &&
                data.imgList.map((img, index) => (
                  <TouchableOpacity onPress={showCoordinate} style={styles.postImgWhole}>
                    <ImageBackground
                      key={index}
                      source={{ uri: img.imgUrl }}
                      style={styles.pImg}
                    >
                      {img.imgTags &&
                        img.imgTags.map((tag, index) => (
                          <View
                            key={index}
                            style={[styles.imgtagContainer, { width: 360, height: 400, position: "relative" }]}
                          >
                            <View style={[ styles.imgTagBox, { width: 55, height: 20, position: 'absolute', left: tag.x, top: tag.y - index * 400 }, ]} />
                            <Text
                              /*ref={textRef}
                              onLayout={() => {
                                if (textRef.current) {
                                  textRef.current.measure((x, y, width, height) => {
                                    setTextWidth(width);
                                  });
                                }
                              }}*/
                              style={[styles.imgTagText, { position: 'absolute', left: tag.x, top: tag.y - index * 400 }]}
                            >
                              {`${tag.brandName}`}
                            </Text>
                          </View>
                        ))}
                    </ImageBackground>


                    {/*<View>
                      <Text>---------------------------------------------------------------------</Text>
                      <Text>x,y 좌표</Text>
                      <Text>imgId : {`${img.imgId}`}</Text>

                      {img.imgTags &&
                        img.imgTags.map((tag, index) => (
                          <View key={index}>
                            <Text style={styles.imgtag}>{`x: ${tag.x}, y: ${tag.y}, brandName: ${tag.brandName}`}</Text>
                          </View>
                        ))}
                      <Text>---------------------------------------------------------------------</Text>
                    </View>*/}
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          <View style={styles.content} key={data.boardId}>
            <View style={styles.contentContainer}>
              <Text style={styles.info1}>{data.title}</Text>
              <View style={styles.heartIconBackground} key={data.boardId}>
                {/*<Text>{data.likeCheck ? data.likeCheck.toString() : "유효값x pid: " + data.boardId}</Text>*/}

                <Text>
                  {data.my ? data.my.toString() : "false" + data.boardId}
                </Text>

                <TouchableOpacity onPress={handleLike}>
                  <Image
                    style={styles.heartIcon}
                    source={
                      data.likeCheck
                        ? require("../../assets/like.png")
                        : require("../../assets/unlike.png")
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text />
            <Text style={styles.info2}>{data.content}</Text>
          </View>
        </View>

        <View style={styles.column1}>
          {cdata.map(item => (
            <View style={styles.item} key={item.commentId}>
              <View style={styles.profileContainer}>
                {item.profileImgUrl ? (
                  <Image
                    style={styles.profileImg}
                    source={{ uri: item.profileImgUrl }}
                  />
                ) : (
                  <Image
                    style={styles.defaultImg}
                    source={require("../../assets/user.png")}
                  />
                )}
                <Text style={styles.info2}>{item.nickName}</Text>
                <TouchableOpacity
                  style={styles.cdeleteBtn}
                  onPress={() => {
                    deleteComment(item);
                  }}>
                  <Text>댓글 삭제</Text>
                </TouchableOpacity>
                <View>
                  {isEditing ? (
                    // <View>
                    //   <TextInput
                    //     style={styles.fixinput}
                    //     onChangeText={onChangeComment}
                    //     value={comment}
                    //     placeholder="댓글을 입력해주세요."
                    //   />
                    //   <Button title="전송" onPress={writeComment} />
                    // </View>
                    ""
                  ) : (
                    <TouchableOpacity
                      style={styles.cdeleteBtn1}
                      onPress={() => {
                        editComment(item);
                        // 댓글 수정 버튼을 눌렀을 때 TextInput으로 포커스 이동하도록 추가합니다.
                        setCommentEdit(item.comment);
                      }}>
                      <Text>댓글 수정</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              {isEditing && CommentIdBeingEdited === item.commentId ? (
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={styles.fixinput1}
                    onChangeText={onChangeComment2}
                    value={commentEdit}
                    placeholder="댓글을 입력해주세요."
                  />
                  <TouchableOpacity style={styles.fixBtn} onPress={fixComment}>
                    <Text style={styles.fixBtnText}>전송</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.info2}>{item.comment}</Text>
              )}
              <Text style={styles.info1}>작성일시 {item.commentTime}</Text>
              <Text style={styles.info2}>{item.my}</Text>

            </View>
          ))}
        </View>

        <Text />
        <Text />
        <Text />
        <TextInput
          style={styles.input}
          onChangeText={onChangeComment}
          value={comment}
          placeholder="댓글을 입력해주세요."
        />
        <Button title="전송" onPress={writeComment} />
      </ScrollView>
    </View>
  );
}

const styles = {
  postImgWhole: {
    /*flexDirection: 'row',*/
  },
  imgtagContainer: {
    position: 'relative',/*
    borderColor: '#FF1AA0',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 26, 160, 0.24)',*/
  },
  imgTagBox: {
    borderColor: '#FF1AA0',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 26, 160, 0.24)',
    borderRadius: 6,
  },
  imgTagText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 13,
    position: 'absolute',
    left: 0,
    top: 0,
    marginLeft: 4,
  },
  imgtag: {
    color: 'red',
    fontColor: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  fixBtn: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    height: 50,
    marginTop: 40,
  },
  container1: {
    width: '100%',
    height: 519,
  },
  slide: {
    flex: 1,
  },
  cdeleteBtn: {
    marginLeft: 180,
  },
  cdeleteBtn1: {
    marginLeft: 5,
  },
  deleteBtn: {
    marginLeft: 190,
  },
  modifyBtn: {
    marginLeft: 5,
  },
  moveBtn: {
    marginLeft: 190,
  },
  profileContainer: {
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
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
  pImg: {
    width: 360,
    height: 400,
    backgroundColor: 'white',
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
    height: 168,
    backgroundColor: 'gray',
    borderRadius: 8,
  },
  content: {
    width: '100%',
    height: 250,
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  contentbox: {
    width: 156,
    flex: 0,
    borderWidth: 1,
    borderColor: 'red',
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
    // flex: 1,
    // justifyContent: 'center', // 수평 방향의 정렬을 가운데로 설정
    // alignItems: 'center', // 수직 방향의 정렬을 가운데로 설정
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

  info1: {
    color: 'black',
    fontColor: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 20,
    marginTop: 8,
  },
  info2: {
    fontSize: 20,
    fontWeight: 'bold',
    fontColor: 'gray',
    marginLeft: 12,
  },
  info1_s: {
    color: 'gray',
    fontColor: 'gray',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 12,
    marginTop: 2,
  },
  info2_s: {
    fontSize: 10,
    color: 'black',
    fontColor: 'black',
    marginLeft: 12,
    marginRight: 12,
  },
  info3: {
    fontSize: 10,
    marginTop: 8,
    fontWeight: 'bold',
    fontColor: 'gray',
    marginLeft: 4,
  },
  input: {
    marginTop: 40,
    marginLeft: 5,
    marginBottom: 30,
    width: '97%',
    height: 50,
    backgroundColor: 'gray',
  },
  fixinput: {
    marginTop: 40,
    marginLeft: 5,
    marginBottom: 30,
    width: '97%',
    height: 50,
    backgroundColor: 'gray',
  },
  fixinput1: {
    marginTop: 40,
    marginLeft: 5,
    marginRight: 30,
    marginBottom: 30,
    width: '75%',
    height: 50,
    backgroundColor: 'gray',
  },
};
