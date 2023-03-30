import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

import Login from './Login';
import RecruitPage from './RecruitPage'
const Main = ({ navigation }) => {

  return(
    <View style={styles.container}>
      <Text> Main Screen </Text>
      <Button title={"Go to Login Screen"} onPress={() => {navigation.navigate('Login')}} />
      <Text/>
      <Button title={"Go to RecruitPage Screen"} onPress={() => {navigation.navigate('RecruitPage')}} />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Main;
