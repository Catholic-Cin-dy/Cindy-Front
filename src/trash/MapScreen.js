import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const MapScreen = () => {
  const htmlContent = `
     <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=90760c027b8ec61ee28e5dc800ffa261&libraries=services,clusterer"></script>

      <style>
        /* CSS 스타일을 여기에 작성하세요 */
        body {
          margin: 0;
          padding: 0;
        }
        #map {
          width: 500px;
          height: 400px;
        }
      </style>

    </head>
    <body>
    <h1>안녕하세요<h1>
      <!-- HTML 콘텐츠를 여기에 작성하세요 -->
      <div id="map"></div>
      <script>
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        };
        const map = new kakao.maps.Map(container, options);
      </script>
    </body>
  </html>
`;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{html: htmlContent}}
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

export default MapScreen;
