import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import {WebView} from 'react-native-webview';

export default function CommuWriteMap() {
  const [position, setPosition] = useState(null);
  const [webViewLoaded, setWebViewLoaded] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (granted === 'granted') {
          Geolocation.getCurrentPosition(handleLocation, handleError, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          });
        } else if (granted === 'denied') {
          const requestResult = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
          if (requestResult === 'granted') {
            Geolocation.getCurrentPosition(handleLocation, handleError, {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
            });
          } else {
            console.log('Location permission not granted.');
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    requestLocationPermission();
  }, []);

  const handleLocation = position => {
    setPosition(position);
  };

  const handleError = error => {
    console.log(error.code, error.message);
  };

  const onWebViewLoad = () => {
    setWebViewLoaded(true);
  };

  const renderMap = () => {
    if (position) {
      const mapUrl = `https://map.kakao.com/link/map/${position.coords.latitude},${position.coords.longitude}`;

      if (Platform.OS === 'android') {
        return (
          <WebView
            source={{uri: mapUrl}}
            style={webViewLoaded ? styles.webview : styles.hidden}
            onLoad={onWebViewLoad}
          />
        );
      } else {
        return <Text style={styles.text}>WebView is not supported on iOS</Text>;
      }
    } else {
      return <Text style={styles.text}>Waiting for location...</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Latitude: {position?.coords?.latitude || ''}
      </Text>
      <Text style={styles.text}>
        Longitude: {position?.coords?.longitude || ''}
      </Text>
      {renderMap()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  hidden: {
    width: 0,
    height: 0,
  },
});
