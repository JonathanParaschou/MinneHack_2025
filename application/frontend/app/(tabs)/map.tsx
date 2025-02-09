import React from 'react';
import { View, StyleSheet } from 'react-native';

const WebMap: any = require('react-native-web-maps').WebMap;
const WebMarker: any = require('react-native-web-maps').WebMarker;


const MapComponent = () => {
  return (
    // <View style={styles.container}>
    //   <WebMap
    //     center={{ lat: 37.7749, lng: -122.4194 }}
    //     zoom={10}
    //     style={styles.map}
    //     >

    //     <WebMarker position={{ lat: 37.7749, lng: -122.4194 }} />
    //   </WebMap>
    // </View>
    0
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '100%',
    width: '100%',
  },
});

export default MapComponent;
