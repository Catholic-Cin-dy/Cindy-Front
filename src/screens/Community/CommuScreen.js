import React, { useState } from "react";
import { TouchableOpacity, FlatList, TextInput, View, StyleSheet, Text, Button,SafeAreaView,ScrollView } from 'react-native';
import CommWrite from "./CommWrite";
import axios from 'axios';
import {useNavigation} from "@react-navigation/native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';

const baseUrl = 'https://www.awesominki.shop/'; //api 연결을 위한 baseUrl
const config = {
  headers: { 'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo` }
};
export default function CommuScreen() {
  const navigation = useNavigation();

  const [text, setText] = useState('');

  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    if (text.length > 0) {
      // TODO: Implement your logic to get suggestions based on the input text
      //setSuggestions([...Array(5)].map((_, i) => ({ label: `${text} ${i + 1}` })));
      const params = {
        content: text
      };

      axios.get(baseUrl + 'boards/tag', { params, ...config })
        .then(response =>
          setSuggestions(response.data.result)
        )
        .catch(error => console.error(error))

    } else { //검색어 없으면 빈칸
      setSuggestions([]);
    }
  };
  const handleSuggestionPress = (item) => {
    setSearchText(item);
  };

  const renderSuggestion = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleSuggestionPress(item)}
      >
        <Text>{item}</Text>
      </TouchableOpacity>
    );
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
            keyExtractor={(item) => item}
          />

          <Text>검색어 : {searchText}</Text>


          <Button title={"글쓰기"} onPress={() => {
            navigation.navigate("CommWrite");
          }} />
        </SafeAreaView>

      </ScrollView>

  );
}
const styles = StyleSheet.create({
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
    flex: 1
  },
  textInput: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  showText: {
    marginTop: 10,
    fontSize: 25,
  },

  Product : {
    width: 156,
    height: 168,
    borderRadius: 8,
  },

  SearchContainer : {
    width: 400,
    height: 45,
    // position: relative,
    border: 0,
  },

  Search : {
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
