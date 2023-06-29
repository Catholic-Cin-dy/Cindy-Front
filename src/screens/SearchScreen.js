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
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';

const baseUrl = 'https://www.awesominki.shop/'; //api 연결을 위한 baseUrl
const config = {
  headers: {
    'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo`,
  },
};

export default function SearchScreen() {
  const [text, setText] = useState('');

  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {});

  const handleSearchTextChange = text => {
    setSearchText(text);
    if (text.length > 0) {
      const params = {
        page: 0,
        content: text,
      };

      axios
        .get(baseUrl + 'products/search', {params, ...config})
        .then(response => {
          setSuggestions(response.data.result.contents);
          console.log('검색결과 : ', response.data.result.contents);
        })
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
        <View style={styles.item}>
          <Image style={styles.pImg} source={{uri: item.imgUrl}} />
          <Text>{item.brandName}</Text>
          <Text>{item.productName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.firstView}>
      <Text />
      <Text />
      <Text />
      <View style={{ marginTop: 4 }, {flexDirection: "row"}}>
        <Text style={styles.sText1}>"{searchText}"</Text>
        <Text style={styles.sText2}>와 가장 연관성 높은 상품 </Text>
      </View>
      <FlatList
        horizontal={true}
        style={styles.flatListView}
        data={suggestions}
        renderItem={renderSuggestion}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.productId.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력하세요."
        onChangeText={handleSearchTextChange}
        value={searchText}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  flatListView: {
    marginLeft: 15,
    marginBottom: 0,
  },
  firstView: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  sText1: {
    fontSize: 20,
    fontWeight: 'bold',
    fontColor: 'black',
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 3,
  },
  sText2: {
    fontSize: 15,
    fontWeight: 'bold',
    fontColor: 'black',
    marginLeft: 5,
    marginTop: 15,
    marginBottom: 3,
  },
  searchText: {
    fontWeight: 'bold',
  },
  input: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    right: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1.5,
    paddingHorizontal: 10,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 8,
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
  pImg: {
    width: 156,
    height: 156,
    backgroundColor: 'gray',
    borderRadius: 8,
  },
  item: {
    width: 156,
    flex: 0,
    marginBottom: 16,
    marginRight: 10,
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
  horizontalLine1: {
    width: 325,
    height: 1.5,
    backgroundColor: '#B3B3B3',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
  },
});
