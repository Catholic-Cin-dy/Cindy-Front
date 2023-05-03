import React from 'react';
import { View, StyleSheet, Text, Button,SafeAreaView,ScrollView } from 'react-native';
import CommWrite from "./CommWrite";
import {useNavigation} from "@react-navigation/native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
export default function CommuScreen() {
  const navigation = useNavigation();


  return (
      <ScrollView>
        <SafeAreaView style={styles.container}>
        <Text>커뮤니티 입니다</Text>


          <Button title={"글쓰기"} onPress={() => {
            navigation.navigate("CommWrite");
          }} />
        </SafeAreaView>

      </ScrollView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});