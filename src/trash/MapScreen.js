import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {WebView} from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import {KakaoMapView} from '@jiggag/react-native-kakao-maps';

const MapScreen = () => {
  const webViewRef = React.useRef(null);

  const addMarkerToMap = () => {
    webViewRef.current.injectJavaScript(`
      var map = new kakao.maps.Map(document.getElementById('map'), {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 8
      });
      
      var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(37.5665, 126.9780),
        draggable: true // 마커를 이동 가능하도록 설정
      });
      
      marker.setMap(map);  // 지도에 마커 추가
      
      // 마커 이동 완료 시 위치 정보를 저장 또는 활용하는 로직
      kakao.maps.event.addListener(marker, 'dragend', function() {
        var newPosition = marker.getPosition(); // 이동된 마커의 위도와 경도 정보를 가져옴
        var newLatitude = newPosition.getLat(); // 이동된 마커의 위도
        var newLongitude = newPosition.getLng(); // 이동된 마커의 경도

        // 이동된 위치 정보를 저장하거나 사용하는 로직을 추가합니다.
        // console.log('마커 이동 완료');
        // console.log('이동된 위도:', newLatitude);
        // console.log('이동된 경도:', newLongitude);
        // 이동된 위치 정보를 활용하여 상태를 업데이트하거나 원하는 작업을 수행합니다.
        setCurrentLocation({ latitude: newLatitude, longitude: newLongitude });

      });
    `);
  };

  return (
    <WebView
      ref={webViewRef}
      source={{uri: 'https://map.kakao.com'}}
      style={{flex: 1}}
      onLoad={addMarkerToMap}
    />
  );
};

// const MapScreen = () => {
//   const webviewRef = useRef(null);
//   const [markerLatitude, setMarkerLatitude] = useState(null);
//   const [markerLongitude, setMarkerLongitude] = useState(null);
//   const handleMarkerPress = () => {
//     setMarkerLatitude(latitude);
//     setMarkerLongitude(longitude);
//   };
//
//   useEffect(() => {
//     const markerScript = `
//       const markerLatitude = ${markerLatitude};
//       const markerLongitude = ${markerLongitude};
//
//       const marker = new kakao.maps.Marker({
//         position: new Takao.maps.LatLng(markerLatitude, markerLongitude),
//       });
//       marker.setMap(map);
//     `;
//
//     // WebView 리로드하여 마커 스크립트를 적용
//     const webViewReload = () => {
//       const webViewRef = webviewRef.current;
//       if (webViewRef) {
//         webViewRef.injectJavaScript(markerScript);
//       }
//     };
//
//     webViewReload();
//   }, [markerLatitude, markerLongitude]);
//
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//
//   useEffect(() => {
//     // 위치 정보를 가져오는 비동기 함수
//     const getLocation = async () => {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           // 권한이 허용된 경우
//           Geolocation.getCurrentPosition(
//             position => {
//               setLatitude(position.coords.latitude);
//               setLongitude(position.coords.longitude);
//             },
//             error => console.log(error.message),
//             {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//           );
//         } else {
//           // 권한이 거부된 경우
//           console.log('위치 권한이 거부되었습니다.');
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//
//     getLocation();
//   }, []);
//
//     return (
//       <View style={styles.container}>
//         <WebView
//           ref={webviewRef}
//           style={styles.webview}
//           source={{uri: 'https://map.kakao.com'}}
//           javaScriptEnabled={true}
//         />
//         <View style={styles.coordinatesContainer}>
//           <Text style={styles.coordinatesText}>
//             Latitude: {latitude ? latitude.toFixed(6) : 'Loading...'}
//           </Text>
//           <Text style={styles.coordinatesText}>
//             Longitude: {longitude ? longitude.toFixed(6) : 'Loading...'}
//           </Text>
//           <Button title="마커 추가" onPress={handleMarkerPress} />
//         </View>
//       </View>
//     );
//   };

/*return (
    <KakaoMapView
      markerImageName="customImageName" // 옵션1
      // markerImageUrl="https://github.com/jiggag/react-native-kakao-maps/blob/develop/example/custom_image.png?raw=true" // 옵션2
      markerImageUrl="https://github.com/jiggag/react-native-kakao-maps/blob/develop/example/custom_image.png?raw=true" // 옵션2
      markerList={[
        {
          lat: 37.59523,
          lng: 127.086,
          markerName: 'marker',
        },
        {
          lat: 37.59523,
          lng: 127.08705,
          markerName: 'marker2',
        },
      ]}
      width={300}
      height={500}
      centerPoint={{
        lat: 37.59523,
        lng: 127.086,
      }}
      onChange={event => {
        // event.nativeEvent
      }}
    />
  );
};*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  coordinatesContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  coordinatesText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default MapScreen;
