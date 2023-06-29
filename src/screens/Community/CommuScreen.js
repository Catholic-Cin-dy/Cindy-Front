import React, {useState, useEffect} from 'react';
import {
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import CommWrite from './CommWrite';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import CommuPostDetail from './CommuPostDetail';

const baseUrl = 'https://www.awesominki.shop/'; //api 연결을 위한 baseUrl
const config = {
  headers: {
    'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo`,
  },
};
export default function CommuScreen() {
  const [slicedData, setSlicedData] = useState([]);
  const [text, setText] = useState('');

  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [pageList, setPageList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedPage, setSelectedPage] = useState(0);
  const [data, setData] = useState([]); //커뮤니티 전체 데이터
  const [liked, setLiked] = useState();

  const payload = {latitude: 37.541, longitude: 126.986}; //사용자의 위치 받아온거 여기 들어가야 함.
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {label: '최신순', value: '0'},
    {label: '인기순', value: '1'},
    {label: '거리순', value: '2'},
  ]);
  const handlePagePress = page => {
    setSelectedPage(page);
  };

  const handleDropdown = sort => {
    setIsRefreshing(true);
    setValue(sort);
  };

  const isFocused = useIsFocused(); // isFoucesd Define
  useEffect(() => {
    const params = {
      page: selectedPage,
      정렬: value,
    };

    console.log('sortFilter in useEffect : ', value);
    console.log('parmas : ', params);

    axios
      .post(baseUrl + 'boards', payload, {params, ...config})
      .then(response => {
        // POST 요청이 성공한 경우 실행되는 코드
        const responseData = response.data.result.contents; // 데이터 추출
        setData(responseData);
        console.log('변경이 완료');
        setIsRefreshing(false);
      })
      .catch(error => {
        // POST 요청이 실패한 경우 실행되는 코드
        console.error(error);
      });

    console.log('data in useEffect : ', data);
  }, [isFocused, isRefreshing, selectedPage, liked]);
  //}, [isFocused, isRefreshing, selectedPage, value, data]);

  const handleSearchTextChange = text => {
    setSearchText(text);
    if (text.length > 0) {
      // TODO: Implement your logic to get suggestions based on the input text
      //setSuggestions([...Array(5)].map((_, i) => ({ label: `${text} ${i + 1}` })));
      const params = {
        content: text,
      };

      axios
        .get(baseUrl + 'boards/tag', {params, ...config})
        .then(response => setSuggestions(response.data.result))
        .catch(error => console.error(error));
    } else {
      //검색어 없으면 빈칸
      setSuggestions([]);
    }
  };
  const handleSuggestionPress = item => {
    setSearchText(item);
  };

  const renderSuggestion = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation();
  const handlePostImgPress = boardId => {
    // 해당 상품 정보를 route.params로 넘겨주고 ProductDetail 화면으로 이동
    // console.log('boardId ID : ' + boardId);
    navigation.navigate('CommuPostDetail', {boardId});
  };


  const handleLike = boardId => {
    const params = {
      page: selectedPage,
      정렬: value,
    };

    setLiked(!liked); //liked에 좋아요 성공 , 좋아요 취소 성공이 저장됨

    axios
      .patch(baseUrl + 'boards/like/' + boardId, {}, config)
      .then(response => setLiked(response.data.result))
      .catch(error => console.error(error));
    console.log('handleLike 테스트 : ', liked);

    axios
      .post(baseUrl + 'boards', payload, {params, ...config})
      .then(response => setData(response.data.result.contents))
      .catch(error => console.error(error));
    console.log('handleLike 이후 다시 post ');
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          /*setValue={setValue}*/
          setValue={handleDropdown}
          setItems={setItems}
          placeholder="정렬"
          listMode="MODAL"
          modalProps={{
            animationType: 'fade',
          }}
          modalTitle="정렬 기준을 선택해주세요."
          style={{ marginTop: 25 }} // marginTop 설정
        />

        <ScrollView style={styles.scrollView}>
          <View style={styles.row}>
            <View style={styles.column1}>
              {data.slice(0, data.length / 2).map(item => (
                // 첫 번째 열에 해당하는 데이터를 매핑하여 표시
                // View가 아니라 TouchableOpacity 였음
                <View
                  style={styles.item}
                  key={item.boardId}
                  // onPress={() => handleItemPress(item.boardId)}
                >
                  <View style={styles.profileContainer}>
                    {item.profileImg ? (
                      <Image
                        style={styles.profileImg}
                        source={{uri: item.profileImg}}
                      />
                    ) : (
                      <Image
                        style={styles.defaultImg}
                        source={require('../../assets/user.png')}
                      />
                    )}
                    <Text style={styles.info2}>{item.writer}</Text>
                  </View>

                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    onMomentumScrollEnd={() => {
                      console.log('Scrolling is End');
                    }}>
                    {item.boardImg.map((imgUrl, index) => (
                      <TouchableOpacity
                        onPress={() => handlePostImgPress(item.boardId)}>
                        <Image
                          key={index}
                          source={{uri: imgUrl}}
                          style={styles.pImg}
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <View style={styles.flex}>
                    <Text style={styles.info1}>{item.title}</Text>
                    <View style={styles.heartIconBackground} key={item.boardId}>
                      <TouchableOpacity
                        onPress={() => handleLike(item.boardId)}>
                        <Image
                          style={styles.heartIcon}
                          source={
                            item.likeCheck
                              ? require('../../../src/assets/like.png')
                              : require('../../../src/assets/unlike.png')
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.info3}>{item.likeCount}</Text>
                  <View style={styles.flex1}>
                    <Text style={styles.info4}>{item.boardTime}</Text>
                    <Text style={styles.info5}>
                      댓글 수 : {item.commentCount}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.column2}>
              {data.slice(data.length / 2).map(item => (
                <View
                  style={styles.item}
                  key={item.boardId}
                  // onPress={() => handleItemPress(item.boardId)}
                >
                  <View style={styles.profileContainer}>
                    {item.profileImg ? (
                      <Image
                        style={styles.profileImg}
                        source={{uri: item.profileImg}}
                      />
                    ) : (
                      <Image
                        style={styles.defaultImg}
                        source={require('../../assets/user.png')}
                      />
                    )}
                    <Text style={styles.info2}>{item.writer}</Text>
                  </View>

                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    onMomentumScrollEnd={() => {
                      console.log('Scrolling is End');
                    }}>
                    {item.boardImg.map((imgUrl, index) => (
                      <TouchableOpacity
                        onPress={() => handlePostImgPress(item.boardId)}>
                        <Image
                          key={index}
                          source={{uri: imgUrl}}
                          style={styles.pImg}
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  {/*제목*/}
                  <View style={styles.flex}>
                    <Text style={styles.info1}>{item.title}</Text>
                    <View style={styles.heartIconBackground} key={item.boardId}>
                      <TouchableOpacity
                        onPress={() => handleLike(item.boardId)}>
                        <Image
                          style={styles.heartIcon}
                          source={
                            item.likeCheck
                              ? require('../../../src/assets/like.png')
                              : require('../../../src/assets/unlike.png')
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.info3}>{item.likeCount}</Text>
                  <View style={styles.flex1}>
                    <Text style={styles.info4}>{item.boardTime}</Text>
                    <Text style={styles.info5}>
                      댓글 수 : {item.commentCount}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {Array.from({length: 10}, (_, index) => index + 1).map(page => (
            <TouchableOpacity key={page} onPress={() => handlePagePress(page)}>
              <Text style={{margin: 10}}>{page}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CommWrite');
          }}
          style={styles.writeBtn}>
          <Text style={styles.writeBtnText}>글쓰기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  /*postImg: {
    width: 156,
    height: 156,
  },*/
  writeBtnText: {
    color: '#fff',
  },
  writeBtn: {
    backgroundColor: '#000',
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
  },
  flex1: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
  info4: {
    marginLeft: 8,
  },
  info5: {
    marginRight: 8,
  },
  info1: {
    marginLeft: 8,
  },
  info3: {
    marginLeft: 157,
  },
  heartIconBackground: {
    marginRight: 5,
  },
  flex: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  info2: {marginLeft: 10},
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
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
    width: 175,
    height: 156,
    backgroundColor: 'gray',
    borderRadius: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column1: {
    //marginLeft: 10,
    marginTop: 29,
    marginBottom: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    //backgroundColor: '#fff',
  },
  column2: {
    //marginRight: 10,
    marginTop: 29,
    marginBottom: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    //backgroundColor: '#fff',
  },
  item: {
    width: 175,
    flex: 0,
    marginBottom: 16,
    borderRadius: 15,
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
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    paddingTop: 50,
    alignItems: 'center',
    fontSize: 30,
  },
  bodyContainer: {
    backgroundColor: '#FDF5DC',
    paddingHorizontal: 20,
    marginVertical: 30,
    flex: 1,
  },
  textInput: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  showText: {
    marginTop: 10,
    fontSize: 25,
  },

  Product: {
    width: 156,
    height: 168,
    borderRadius: 8,
  },

  SearchContainer: {
    width: 400,
    height: 45,
    // position: relative,
    border: 0,
  },

  Search: {
    border: 0,
    backgroundColor: '#eaeaea',
    paddingLeft: 10,
    width: '100%',
    height: '100%',
    // outline: none,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
