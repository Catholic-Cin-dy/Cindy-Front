import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import MapView, {Marker} from 'react-native-maps';
import SignInFin from '../SignInFin';

export default function MapScreen() {
  const [apiKey, setApiKey] = useState('');
  const [mapOptions, setMapOptions] = useState({
    center: {lat: 37.5642135, lng: 127.0016985},
    level: 3,
  });
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    // API 키를 설정합니다.
    setApiKey('4b0303383dbb3db73c8e4a22fbbe1b65');
  }, []);

  const handleLoad = () => {
    const mapScript = `
      <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services"></script>
      <script>
        const mapContainer = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(${mapOptions.center.lat}, ${mapOptions.center.lng}),
          level: ${mapOptions.level}
        };
        const map = new kakao.maps.Map(mapContainer, options);
      </script>
    `;
    const scriptUrl = 'https://code.jquery.com/jquery-3.6.0.slim.min.js';
    const jqueryScript = `
      <script src="${scriptUrl}"></script>
    `;
    const injectedJavaScript = `
      ${jqueryScript}
      $('body').append('${mapScript}');
    `;

    return injectedJavaScript;
  };

  const handleMapLayout = () => {
    setIsMapReady(true);
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{html: '<div id="map" style="width:100%;height:100%;"></div>'}}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        onLoad={handleLoad}
      />
      {isMapReady && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.5642135,
            longitude: 127.0016985,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onLayout={handleMapLayout}>
          <Marker
            coordinate={{latitude: 37.5642135, longitude: 127.0016985}}
            title="카카오맵"
            description="여기는 카카오맵입니다."
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
