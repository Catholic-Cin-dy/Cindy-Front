import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'; //자동완성
import { useDispatch, useSelector } from "react-redux";

const TopTap = createMaterialTopTabNavigator(); //상단 탭
/*
const onChangeData = (e:React.FormEvent<HTMLInputElement>) => {
  setKeyword(e.currentTarget.value);
};
*/

/*const Search = () => {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const { searchedFoodLists } = useSelector((state) => state.addEat)
  const [value, setValue] = useState('')
  const disabled = useRef(false)
  const onChangeInput = (e) => setValue(e.target.value)

  const onSearchForFood = () => { //검색버튼 클릭 이벤트
    if (disabled.current) return //disabled.current를 이용해 3초에 한번씩만 콜하기
    else {
      disabled.current = true
      if (!value) {
        //검색어를 입력하세요 알람 띄위기
      } else {
        let params = { searchText: value }
        dispatch(searchForFood(params)) //음식찾기 api 콜
        setValue('')
      }
      setTimeout(() => disabled.current = false, 3000)
    }
  }

  useEffect(() => { //검색어 자동 완성
    let params = { searchText: value }
    const debounce = setTimeout(() => {
      if (value) dispatch(searchForFood(params))//음식찾기 api
      else dispatch(onResetSearchedFood()) //찾은 음식 없애주기 api
    }, 200)
    return () => {
      clearTimeout(debounce)
    }
  }, [value])

  state = {
    text: '',
    inputText: ''
  }

  submitBtn = () => {
    this.setState({text: this.state.inputText});
    //
    onSearchForFood();
  }

  // 상품 항목 클릭 시 ProductDetail 화면으로 이동하는 함수
  const navigation = useNavigation();
  const handleItemPress = (productId) => {
    // 해당 상품 정보를 route.params로 넘겨주고 ProductDetail 화면으로 이동
    console.log('product ID : ' + productId);

    //navigation.navigate('ProductDetail', { productId });
  };

  return (
    <View>

      <View style={styles.container}>
        <Text style={styles.headerText}>TextInput 테스트</Text>
        <View style={styles.bodyContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({ inputText: text });
            }}
            placeholder="검색어를 입력해주세요."
          />
          <Button title="검색" onPress={this.submitBtn} />
          <Text style={styles.showText}>{this.state.text}</Text>
        </View>
      </View>

      <View>
        <Text>검색결과</Text>
        <View>
          {data.map(item => (
            // 첫 번째 열에 해당하는 데이터를 매핑하여 표시
            <TouchableOpacity
              key={item.id}
              onPress={() => handleItemPress(item.productId)}
            >
              <Text>검색 결과들 보여줄거에요</Text>
              {/!*<Text>{item.productName}</Text>*!/}
            </TouchableOpacity>
          ))}
        </View>
      </View>

    </View>
  );
};*/


const SearchTag = () => {

  return(
    <View>
      <Text>
        여기에
        {/*<Search/>*/}
      </Text>
    </View>

  );
};
export default SearchTag;

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
  }

});
