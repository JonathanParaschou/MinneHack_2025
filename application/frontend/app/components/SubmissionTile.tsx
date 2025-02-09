import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SubmissionTile = () => {
  return (
    <View style={styles.tileContainer}>
      <View style={styles.header}>
        <Image 
          source={require('../images/user.png')} // Replace with a local or remote image
          style={styles.avatar}
        />
        <Text style={styles.userName}>John Doe</Text>
      </View>

      <Image
        source={require('../images/user.png')} // Replace with a local or remote image
        style={styles.postImage}
      />

      <Text style={styles.timeText}>Posted 5 minutes ago</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    backgroundColor: 'rgba(',
    borderRadius: 10,
    margin: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  postImage: {
    width: '100%',
    height: width * 0.5, // Image takes half of the screen width
    borderRadius: 10,
    marginVertical: 15,
  },
  timeText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SubmissionTile;
