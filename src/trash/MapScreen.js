import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        source={{uri: 'https://map.kakao.com'}}
        javaScriptEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default MapScreen;
