import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ContestOverScreen = () => {
  return (
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
        <Text style={styles.text}>The contest is over for this week.</Text>
        <Text style={styles.emoji}>😢</Text>

      </View>
    </ScrollView>
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
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
        marginBottom: 10,
        marginTop:30,
    },
    emoji: {
        fontSize: 56,
        textAlign: 'center',
    },
  });

export default ContestOverScreen;
