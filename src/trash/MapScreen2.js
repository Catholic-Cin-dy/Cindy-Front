import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {WebView} from 'react-native-webview';

const MapScreen2 = () => {
  //setLink(url);

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{
          uri: 'https://m.blog.naver.com/PostList.nhn?blogId=rlaalsdn456456',
        }}
        style={styles.map}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
export default MapScreen2;
