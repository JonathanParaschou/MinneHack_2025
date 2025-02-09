import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Timer from '../components/ContestTimer';
import { useRouter } from 'expo-router';
import Header from '../components/header';

const { width, height } = Dimensions.get('window');

const VotingScreen = () => {
  const [image, setImage] = useState('https://via.placeholder.com/300'); // Placeholder image URL

  const handleVote = (rating: any) => {
    console.log(`Voted: ${rating}`);
    fetchNewImage();
  };

  const fetchNewImage = () => {
    // Placeholder function to simulate fetching a new image from a database
    setImage(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYVx6CB56pxO8gwlzLLOkV8fPN0jfF3T_98w&s`);
  };

  return (
    <View style={styles.container}>
        <Header />
        <ScrollView style={styles.container}>
            <View style={styles.header}>
            <Image
            source={require('../images/user-friends.svg')}
            style={styles.friends}
            />
            <Text style={styles.title}>
            DrawIt.
            </Text>
            <Text>
            User photo
            </Text>
        </View>
        <View style={styles.content}>
            <Text style={styles.text}>Vote on the Drawings!</Text>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.prompt}>Rate this drawing:</Text>
            <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((num) => (
                <TouchableOpacity key={num} style={styles.button} onPress={() => handleVote(num)}>
                <Text style={styles.buttonText}>{num}</Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background for the whole screen
        color: '#ffffff'
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#444', // Lighter border color
        borderBottomWidth: 1,
        backgroundColor: '#1f1f1f', // Dark background for the header
        paddingVertical: 10,
        paddingHorizontal: 15,
      },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 15,
    marginTop:5,
    },
  friends: {
    width: width * 0.08,
    height: width * 0.08,
  },
  user: {
    height: width * 0.06,
    width: width * 0.06,
    borderRadius: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#ffffff', // White text for the dark mode
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  prompt: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#1f1f1f',
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default VotingScreen;