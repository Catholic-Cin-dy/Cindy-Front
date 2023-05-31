import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

const MapScreen = () => {
  const webviewRef = useRef(null);
  const [markerLatitude, setMarkerLatitude] = useState(null);
  const [markerLongitude, setMarkerLongitude] = useState(null);

  useEffect(() => {
    const markerScript = `
      const markerLatitude = ${markerLatitude};
      const markerLongitude = ${markerLongitude};
      
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(markerLatitude, markerLongitude),
      });
      marker.setMap(map);
    `;

    // WebView 리로드하여 마커 스크립트를 적용
    const webViewReload = () => {
      const webViewRef = webviewRef.current;
      if (webViewRef) {
        webViewRef.reload();
      }
    };

    webViewReload();
  }, [markerLatitude, markerLongitude]);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    // 위치 정보를 가져오는 비동기 함수
    const getLocation = async () => {
      try {
        const {granted} = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            error => console.log(error.message),
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          console.log('위치 권한이 거부되었습니다.');
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        style={styles.webview}
        source={{uri: 'https://map.kakao.com'}}
        javaScriptEnabled={true}
      />
      <View style={styles.coordinatesContainer}>
        <Text style={styles.coordinatesText}>
          Latitude: {latitude ? latitude.toFixed(6) : 'Loading...'}
        </Text>
        <Text style={styles.coordinatesText}>
          Longitude: {longitude ? longitude.toFixed(6) : 'Loading...'}
        </Text>
      </View>
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
