import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Footer = () => {
  const router = useRouter();

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/contest')}>
        <Text style={styles.text}>Contest</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/map')}>
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
    borderTopColor: "#444", // Lighter border color
    borderTopWidth: 1,
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