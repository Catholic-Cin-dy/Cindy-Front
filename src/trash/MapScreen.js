import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Button, TextInput} from 'react-native';
import {WebView} from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';

const MapScreen = () => {
  const navigation = useNavigation();
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const webViewRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setMarkerPosition({latitude, longitude});
        console.log('현재 좌표', markerPosition);
        // 지도 중심을 현재 위치로 설정하는 함수
        webViewRef.current?.injectJavaScript(`
          const center = new kakao.maps.LatLng(${latitude}, ${longitude});
          map.setCenter(center);
        `);
        navigation.pop(); // 뒤로 가기
      },
      error => {
        console.log('현재 위치를 가져오는 중 오류 발생:', error);
      },
    );
  };

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
            width: '100%';
            height: 800px;
          }
        </style>
      </head>
      <body>
        <!-- HTML 콘텐츠를 여기에 작성하세요 -->
        <div id="map"></div>
        <script>
          const container = document.getElementById('map');
          const options = {
            center: new kakao.maps.LatLng(37.486597, 126.801947),
            level: 3
          };
          const map = new kakao.maps.Map(container, options);
          let marker;
          
          const addMarker = (latitude, longitude) => {
            const markerPosition = new kakao.maps.LatLng(latitude, longitude);
            marker = new kakao.maps.Marker({ position: markerPosition, draggable: true });
            marker.setMap(map);
            
            kakao.maps.event.addListener(marker, 'dragend', function () {
              const position = marker.getPosition();
              const latitude = position.getLat();
              const longitude = position.getLng();
              window.ReactNativeWebView.postMessage(JSON.stringify({ latitude, longitude }));
            });
          };
          
          function searchLocation(query) {
            const geocoder = new kakao.maps.services.Geocoder();
            
            geocoder.addressSearch(query, function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                const { x: longitude, y: latitude } = result[0];
                moveMapToLocation(latitude, longitude);
              }
            });
          }
          
          function moveMapToLocation(latitude, longitude) {
            const moveLatLng = new kakao.maps.LatLng(latitude, longitude);
            map.setCenter(moveLatLng);
          }
          
          function sendSearchResultToReactNative(result) {
            window.ReactNativeWebView.postMessage(JSON.stringify(result));
          }
          
          addMarker(37.486597, 126.801947);
        </script>
      </body>
    </html>
  `;
  const handleWebViewMessage = event => {
    // React Native에서 마커 위치 정보를 수신한 후 처리하는 함수
    const {latitude, longitude} = JSON.parse(event.nativeEvent.data);
    setMarkerPosition({latitude, longitude});
  };

  const handleSearchLocation = () => {
    if (webViewRef.current) {
      // 검색어를 카카오맵으로 전달하는 함수
      webViewRef.current.injectJavaScript(`searchLocation('${searchQuery}')`);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{html: htmlContent}}
        style={styles.map}
        onMessage={handleWebViewMessage}
        ref={webViewRef}
      />
      <View style={styles.searchLocation}>
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="검색할 지명 또는 주소 입력"
        />
      </View>
      <View>
        <Button
          style={styles.submitBtn}
          title="위치 선택"
          onPress={getCurrentLocation}
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
  searchLocation: {
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  submitBtn: {
    width: '94%',
    height: 36,
    backgroundColor: '#6B7AFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default MapScreen;
