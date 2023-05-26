import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

export default function MapScreen() {
  const [apiKey, setApiKey] = useState('424b46278da8131aa968c7b90935a465');
  const [mapOptions, setMapOptions] = useState({
    center: {lat: 37.5642135, lng: 127.0016985},
    level: 3,
  });

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

  return (
    <View style={styles.container}>
      <WebView
        source={{html: '<div id="map" style="width:100%;height:100%;"></div>'}}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        onLoad={handleLoad}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
