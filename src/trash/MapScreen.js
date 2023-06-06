import React, {useRef} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import KakaoMapHTML from './kakao_map.html';

const MapScreen = () => {
  const KakaoMapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=9e9ee36df97402dc8c47586afe7ed493"></script>
      <meta charset="utf-8"/>
      <title>Kakao 지도 시작하기</title>
    </head>
    <body>
      <div id="map" style="width:100%;height:100%;"></div>
      <script>
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        };
      
        var map = new kakao.maps.Map(container, options);
      </script>
    </body>
    </html>
  `;

  return (
    <WebView
      source={{html: KakaoMapHTML}}
      style={{flex: 1}}
      javaScriptEnabled={true}
    />
  );
};

export default MapScreen;

// const addMarkerToMap = () => {
//   webViewRef.current.injectJavaScript(`
//     var container = document.getElementById('map');
//     var options = {
//       center: new kakao.maps.LatLng(37.5665, 126.9780),
//       level: 8
//     };
//
//     var map = new kakao.maps.Map(container, options);
//
//     var marker = new kakao.maps.Marker({
//       position: new kakao.maps.LatLng(37.5665, 126.9780),
//       draggable: true
//     });
//
//     marker.setMap(map);
//
//     kakao.maps.event.addListener(marker, 'dragend', function() {
//       var newPosition = marker.getPosition();
//       var newLatitude = newPosition.getLat();
//       var newLongitude = newPosition.getLng();
//
//       window.ReactNativeWebView.postMessage(
//         JSON.stringify({
//           latitude: newLatitude,
//           longitude: newLongitude
//         })
//       );
//     });
//   `);
// };
//
// const onMessageReceived = event => {
//   const {data} = event.nativeEvent;
//   if (data) {
//     const {latitude, longitude} = JSON.parse(data);
//     console.log('마커 이동 완료');
//     console.log('이동된 위도:', latitude);
//     console.log('이동된 경도:', longitude);
//   }
// };

//   return (
//     <WebView
//       ref={webViewRef}
//       source={{html: KakaoMapHTML}}
//       style={{flex: 1}}
//       // onLoad={addMarkerToMap}
//       // onMessage={onMessageReceived}
//       javaScriptEnabled={true}
//     />
//   );
// };

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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   webview: {
//     flex: 1,
//   },
//   coordinatesContainer: {
//     backgroundColor: 'white',
//     padding: 10,
//   },
//   coordinatesText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
// });
