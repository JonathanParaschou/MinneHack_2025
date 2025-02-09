import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Contest</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Heatmap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#1f1f1f',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    // position: 'fixed',
    // bottom: 0,
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
  }
});

export default Footer;