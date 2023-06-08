import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {WebView} from 'react-native-webview';

const WebViewScreen = ({ route }) => {
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{
          uri: url,
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
export default WebViewScreen;
