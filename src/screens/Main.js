import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const Main = ({ navigation }) => {

  return(
    <View style={styles.container}>
      <Text> Main Screen </Text>
      <Button
        title={"Go to Login Screen"}
        onPress={() => {navigation.navigate('Login')}}
      />
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
