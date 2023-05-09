import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, request } from 'react-native-permissions';

export default function How() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (granted === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              setPosition(position);
            },
            error => {
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        } else if (granted === 'denied') {
          const requestResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          if (requestResult === 'granted') {
            Geolocation.getCurrentPosition(
              position => {
                setPosition(position);
              },
              error => {
                console.log(error.code, error.message);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
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

  return (
    <View style={styles.container}>
      {position ? (
        <>
          <Text style={styles.text}>Latitude: {position.coords.latitude}</Text>
          <Text style={styles.text}>Longitude: {position.coords.longitude}</Text>
        </>
      ) : (
        <Text style={styles.text}>Waiting for location...</Text>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
  },
});

  return (
    <View style={styles.container}>
      {position ? (
        <>
          <Text style={styles.text}>Latitude: {position.coords.latitude}</Text>
          <Text style={styles.text}>
            Longitude: {position.coords.longitude}
          </Text>
        </>
      ) : (
        <Text style={styles.text}>Waiting for location...</Text>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
  },
});
