import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';


const FriendsComponent = () => {
  return (
    <View>
      <Header></Header>
      <Text>
        hello!
      </Text>
    </View>
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

export default FriendsComponent;
