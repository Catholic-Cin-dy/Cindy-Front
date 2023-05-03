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
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'; //자동완성

const TopTap = createMaterialTopTabNavigator(); //상단 탭

const onChangeData = (e:React.FormEvent<HTMLInputElement>) => {
  setKeyword(e.currentTarget.value);
};

const Search = () => {
  const [keyword, setKeyword] = useState<string>("");
  //example 데이터
  const [selectedItem, setSelectedItem] = useState(null);

  return(
    <View>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        // initialValue={{id: '0'}} // or just '2'
        onSelectItem={setSelectedItem}
        dataSet={[
          {id: '1', title: 'Alpha'},
          {id: '2', title: 'Beta'},
          {id: '3', title: 'Gamma'},
          {id: '4', title: 'View'},
          {id: '5', title: 'Blue'},
          {id: '6', title: 'Red'},
          {id: '7', title: 'Green'},
          {id: '8', title: 'White'},
          {id: '9', title: 'Gold'},
        ]}
      />
    </View>
  )
}
export default function SearchTag() {

  return(
    <SearchContainer>
      <Search/>
    </SearchContainer>

  );
};

const styles = StyleSheet.create({
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
