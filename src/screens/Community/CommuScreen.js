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
import Swiper from 'react-native-web-swiper';
import CommWrite from './CommWrite';
import CommuWriteMap from './CommuWriteMap';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';

import CommuPostDetail from './CommuPostDetail';

const baseUrl = 'https://www.awesominki.shop/'; //api 연결을 위한 baseUrl
const config = {
  headers: {
    'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo`,
  },
};
export default function CommuScreen() {

  const [text, setText] = useState('');

  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [data, setData] = useState([]); //커뮤니티 전체 데이터
  const payload = {latitude: 37.541, longitude: 126.986}; //사용자의 위치 받아온거 여기 들어가야 함.

  const isFocused = useIsFocused(); // isFoucesd Define
  useEffect(() => {
    const params = {
      page: 3,
    };

    axios.post(baseUrl + 'boards', payload, {params, ...config})
      .then(response =>
        // POST 요청이 성공한 경우 실행되는 코드
        setData(response.data.result.contents),
        setIsRefreshing(false),
      )
      .catch(error => {
        // POST 요청이 실패한 경우 실행되는 코드
        console.error(error);
      });
  }, [isFocused, isRefreshing]);

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

  const [liked, setLiked] = useState();
  const handleLike = (boardId) => {
    const params = {
      page: 0,
    };

    setLiked(!liked);

    axios.patch(baseUrl + 'boards/like/' + boardId, {}, config)
      .then(response => setLiked(response.data.result))
      .catch(error => console.error(error));

    axios.post(baseUrl + "boards", payload, { params, ...config })
      .then(response => setData(response.data.result.contents),
      )
      .catch(error => console.error(error));

  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text>커뮤니티 입니다</Text>

        <TextInput
          style={styles.input}
          placeholder="검색어를 입력하세요."
          onChangeText={handleSearchTextChange}
          value={searchText}
        />
        <FlatList
          data={suggestions}
          renderItem={renderSuggestion}
          keyExtractor={item => item}
        />

        <Text>검색어 : {searchText}</Text>

        <Button
          title={'글쓰기'}
          onPress={() => {
            navigation.navigate('CommWrite');
          }}
        />

        <Button
          title={'지도'}
          onPress={() => {
            navigation.navigate('CommuWriteMap');
          }}
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
                  <Text style={styles.info1}>제목 : {item.title}</Text>

                  <Text style={styles.info1}>좋아요 수 : {item.likeCount}</Text>
                  <Text style={styles.info1}>
                    댓글 수 : {item.commentCount}
                  </Text>

                  <View style={styles.heartIconBackground} key={item.boardId}>
                    <TouchableOpacity onPress={() => handleLike(item.boardId)}>
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
                  <Text style={styles.info1}>작성일시 {item.boardTime}</Text>
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
                  <Text style={styles.info1}>제목 : {item.title}</Text>

                  <Text style={styles.info1}>좋아요 수 : {item.likeCount}</Text>
                  <Text style={styles.info1}>
                    댓글 수 : {item.commentCount}
                  </Text>

                  <View style={styles.heartIconBackground} key={item.boardId}>
                    <TouchableOpacity onPress={() => handleLike(item.boardId)}>
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
                  <Text style={styles.info1}>작성일시 {item.boardTime}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  /*postImg: {
    width: 156,
    height: 156,
  },*/
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
  pImg: {
    width: 156,
    height: 156,
    backgroundColor: 'gray',
    borderRadius: 0,
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
  container: {
    backgroundColor: '#FFEAD0',
    paddingHorizontal: 30,
    flex: 1,
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
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
