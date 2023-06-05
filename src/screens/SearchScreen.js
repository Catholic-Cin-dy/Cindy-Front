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

  useEffect(() => {


  },);

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
          console.log("검색결과 : ", response.data.result.contents);
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
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.firstView}>
      <Text>검색화면</Text>
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력하세요."
        onChangeText={handleSearchTextChange}
        value={searchText}
      />
      <FlatList
        data = {suggestions.productName}
        renderItem = {renderSuggestion}
        keyExtractor = {item => item.productId.toString()}/>

      <Text>검색어 : {searchText}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  firstView: {
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
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

});
