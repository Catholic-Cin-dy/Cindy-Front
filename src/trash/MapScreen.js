import React, {useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {WebView} from 'react-native-webview';

const MapScreen = () => {
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

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
        // 마커를 추가하는 함수
        const addMarker = (latitude, longitude) => {
        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({ position: markerPosition, draggable: true });
        marker.setMap(map);
        
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
          console.log('지도에서 클릭한 위치의 좌표는 ' + mouseEvent.latLng.toString() + ' 입니다.');
          });

        
        // 마커 클릭 시 위치 정보를 React Native로 전달
        kakao.maps.event.addListener(marker, 'click', function () {
          const position = marker.getPosition();
          const latitude = position.getLat();
          const longitude = position.getLng();
          window.ReactNativeWebView.postMessage(JSON.stringify({ latitude, longitude }));
            });
        // 마커 드래그 종료 시 위치 정보를 React Native로 전달
        kakao.maps.event.addListener(marker, 'dragend', function () {
          const position = marker.getPosition();
          const latitude = position.getLat();
          const longitude = position.getLng();
          window.ReactNativeWebView.postMessage(JSON.stringify({ latitude, longitude }));
            });
        };
        // 초기 마커 추가
        addMarker(33.450701, 126.570667);
      </script>
    </body>
  </html>
`;
  const handleWebViewMessage = event => {
    // React Native에서 마커 위치 정보를 수신한 후 처리하는 함수
    const {latitude, longitude} = JSON.parse(event.nativeEvent.data);
    setMarkerPosition({latitude, longitude});
  };

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{html: htmlContent}}
        style={styles.map}
        onMessage={handleWebViewMessage}
      />
      <View style={styles.markerPosition}>
        <Button
          title="Save Marker Position"
          onPress={() => console.log(markerPosition)}
        />
      </View>
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
  markerPosition: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
});

export default MapScreen;
