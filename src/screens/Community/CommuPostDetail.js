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
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
//import Modal from 'react-native-simple-modal';
import {MenuProvider} from 'react-native-popup-menu';
//import Modal from 'react-native-simple-modal';
import Swiper from 'react-native-web-swiper';
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
import {Keyboard} from 'swiper';
// import {Keyboard} from 'swiper';

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
  const [draggedTag, setDraggedTag] = useState(null);
  const [CommentIdBeingEdited, setCommentIdBeingEdited] = useState();
  const navigation = useNavigation();

  // 태그를 드래그 앤 드롭할 때 호출되는 함수
  const handleTagDragStart = tag => {
    setDraggedTag(tag);
  };

  // 드롭 위치에 따라 태그의 좌표를 업데이트하는 함수
  const handleTagDrop = (x, y) => {
    if (draggedTag) {
      const updatedTags = data.imgList.map(img => {
        if (img.imgTags.includes(draggedTag)) {
          const updatedTag = {
            ...draggedTag,
            x,
            y: y - data.imgList.indexOf(img) * 400,
          };
          return {
            ...img,
            imgTags: img.imgTags.map(tag =>
              tag === draggedTag ? updatedTag : tag,
            ),
          };
        }
        return img;
      });

      // 업데이트된 태그 정보를 저장하거나 상태를 업데이트하는 등의 작업을 수행합니다.
      // 예: setData({ ...data, imgList: updatedTags });
      setData({...data, imgList: updatedTags});
      setDraggedTag(null); // 드롭 완료 후 드래그 중인 태그 초기화
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (event, gestureState) => {
        // 드래그 중일 때의 처리 로직을 구현합니다.
        // gestureState에서 움직인 거리, 속도 등의 정보를 얻을 수 있습니다.
        // ...
      },
      onPanResponderRelease: (event, gestureState) => {
        // 드롭 시의 처리 로직을 구현합니다.
        handleTagDrop(gestureState.moveX, gestureState.moveY);
      },
    }),
  ).current;

  const handleTagClick = (x, y) => {
    console.log('태그가 클릭되었습니다.');
    console.log('클릭한 태그의 좌표:', x, y);
    // 원하는 동작을 수행합니다.
  };

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
        console.log('글자길이 : ' + textWidth);
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
  }, [boardId, isFocused, isRefreshing, textWidth]);

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
      .then(response => {})
      .catch(error => console.error(error));
  }
  function modifyPost() {
    //수정 api바뀌면 적용 예정
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
        <View style={styles.whiteBG} key={data.boardId}>
          <View style={styles.profileContainer}>
            {data.profileImgUrl ? (
              <Image
                style={styles.profileImg}
                source={{uri: data.profileImgUrl}}
              />
            ) : (
              <Image
                style={styles.defaultImg}
                source={require('../../assets/user.png')}
              />
            )}
            <Text style={styles.infoHeader}>{data.writer}</Text>

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
                '유효값x pid: ' + data.boardId
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
                '유효값x pid: ' + data.boardId
              )}
            </Text>
          </View>

          <View style={styles.container}>
            <Swiper containerStyle={{width: '100%', height: 400}}>
              {data &&
                data.imgList &&
                data.imgList.map((img, index) => (
                  <TouchableOpacity
                    onPress={showCoordinate}
                    style={styles.postImgWhole}
                    key={index} // 올바른 위치로 key 속성을 추가합니다.
                  >
                    <ImageBackground
                      source={{uri: img.imgUrl}}
                      style={[styles.pImg, {resizeMode: 'cover'}]}
                      key={index}>
                      {img.imgTags &&
                        img.imgTags.map((tag, tagIndex) => (
                          <View key={tagIndex} style={styles.imgtagContainer}>
                            <View
                              style={[
                                styles.imgTagBox,
                                {
                                  position: 'absolute',
                                  left: tag.x,
                                  top: tag.y - tagIndex * 400,
                                },
                              ]}
                              {...panResponder.panHandlers}>
                              <TouchableOpacity
                                // onPress={() => handleTagClick(tag.x, tag.y)}
                                onLongPress={() => handleTagDragStart(tag)} // 드래그 앤 드롭 시작
                                onPressOut={() => handleTagDrop(tag.x, tag.y)} // 태그 드롭 시 좌표 업데이트
                              >
                                <Text
                                  style={[
                                    styles.imgTagText,
                                    {flexWrap: 'wrap'},
                                  ]}>
                                  {`${tag.brandName}`}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))}
                    </ImageBackground>
                  </TouchableOpacity>
                ))}
            </Swiper>
          </View>

          <View style={styles.content} key={data.boardId}>
            <View style={styles.contentContainer}>
              <View key={data.boardId}>
                {/*<Text>{data.likeCheck ? data.likeCheck.toString() : "유효값x pid: " + data.boardId}</Text>*/}
                <TouchableOpacity onPress={handleLike}>
                  <Image
                    style={styles.heartIcon}
                    source={
                      data.likeCheck
                        ? require('../../assets/like.png')
                        : require('../../assets/unlike.png')
                    }
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.info2}>{data.content}</Text>
            </View>
          </View>
        </View>

        <View style={styles.whiteBG}>
          {cdata.map(item => (
            <View style={styles.item} key={item.commentId}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.commentContainer}>
                  {item.profileImgUrl ? (
                    <Image
                      style={styles.profileImg}
                      source={{uri: item.profileImgUrl}}
                    />
                  ) : (
                    <Image
                      style={styles.defaultImg}
                      source={require('../../assets/user.png')}
                    />
                  )}
                  <Text style={styles.infoCommentHeader}>{item.nickName}</Text>
                  <Text style={styles.infoCommentDate}>{item.commentTime}</Text>
                  <TouchableOpacity
                    style={styles.cdeleteBtn}
                    onPress={() => {
                      deleteComment(item);
                    }}>
                    <Text>댓글 삭제</Text>
                  </TouchableOpacity>
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
                    ''
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
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    style={styles.fixinput1}
                    onChangeText={onChangeComment2}
                    value={commentEdit}
                    placeholder="댓글을 입력해주세요."
                  />
                  <TouchableOpacity style={styles.fixBtn} onPress={fixComment}>
                    <Text style={styles.fixBtnText}>수정</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.commentContent}>{item.comment}</Text>
              )}

              <Text style={styles.commentContent}>{item.my}</Text>
            </View>
          ))}
        </View>

        <KeyboardAvoidingView
          style={{flex: 1}}
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          {/*이부분 수정 필요*/}
          {/*<View style={styles.Contiainer}>*/}
          {/*  <TouchableWithoutFeedback*/}
          {/*    onPress={Keyboard.dismiss}*/}
          {/*    style={{height: '100%'}}*/}
          {/*  />*/}
          {/*</View>*/}
          <View style={styles.EditorContainer}>
            <Image
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                marginRight: 10,
                marginLeft: 10,
                padding: 10,
              }}
              source={require('../../assets/user.png')}
            />
            <TextInput
              style={{flex: 1}}
              multiline
              onChangeText={onChangeComment}
              value={comment}
              placeholder="댓글을 입력해주세요."
              autoFocus={true}
            />
            <TouchableOpacity style={{width: 50}} onPress={writeComment}>
              <Text style={styles.blueColor}>전송</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        {/*<TextInput*/}
        {/*  style={styles.input}*/}
        {/*  onChangeText={onChangeComment}*/}
        {/*  value={comment}*/}
        {/*  placeholder="댓글을 입력해주세요."*/}
        {/*/>*/}
        {/*<Button title="전송" onPress={writeComment} />*/}
      </ScrollView>
    </View>
  );
}

const styles = {
  blueColor: {
    color: 'blue',
  },
  Contiainer: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  pImg: {
    width: '100%',
    height: 400,
  },
  EditorContainer: {
    padding: 5,
    minHeight: 65,
    borderTopColor: 'grey',
    borderTopWidth: 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  postImgWhole: {
    /*flexDirection: 'row',*/
  },
  imgtagContainer: {
    position: 'relative',
    /*
    borderColor: '#FF1AA0',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 26, 160, 0.24)',
    */
  },
  imgTagBox: {
    borderColor: '#FF1AA0',
    top: 100,
    left: 50,
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 26, 160, 0.24)',
    borderRadius: 6,
  },
  imgTagText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 13,
    left: 0,
    top: 0,
    marginLeft: 5,
    marginRight: 5,
  },
  imgtag: {
    color: 'red',
    fontColor: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  fixBtn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    height: 48,
    marginVertical: 8,
    alignItems: 'center',
  },
  fixinput1: {
    marginVertical: 8,
    marginLeft: 16,
    marginRight: 30,
    width: '75%',
    height: 48,
  },
  container1: {
    width: '100%',
    height: 519,
  },
  slide: {
    flex: 1,
  },
  cdeleteBtn: {},
  cdeleteBtn1: {
    marginLeft: 5,
  },
  deleteBtn: {
    marginVertical: 8,
    flex: 2,
  },
  modifyBtn: {
    marginVertical: 8,
    flex: 2,
  },
  moveBtn: {
    marginLeft: 190,
  },
  profileContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    borderWidth: 1, // Border width
    borderColor: '#D9D9D9', // Border color
    paddingVertical: 12,
    alignItems: 'center',
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  defaultImg: {
    width: 30,
    height: 30,
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
  /*
  content: {
    width: '100%',
    height: 250,
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  */
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
    borderWidth: 1,
    borderColor: '#D9D9D9',
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
    marginLeft: 16,
    marginRight: 16,
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
    fontColor: 'gray',
    fontSize: 14,
    marginLeft: 4,
  },
  info2: {
    fontSize: 16,
    marginLeft: 12,
    flex: 10,
  },
  commentContent: {
    fontSize: 16,
    marginLeft: 16,
    color: 'black',
  },
  infoCommentHeader: {
    fontSize: 16,
    color: 'black',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  infoCommentDate: {
    fontSize: 14,
    fontColor: 'black',
    marginLeft: 6,
    marginRight: 140,
  },
  infoHeader: {
    fontSize: 16,
    fontColor: 'black',
    marginLeft: 12,
    flex: 10,
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

  whiteBG: {
    backgroundColor: 'white',
    weight: '100%',
  },
};
