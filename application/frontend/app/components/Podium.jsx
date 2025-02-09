import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Podium = ({ players }) => {
  return (
    <View style={styles.container}>
      <View style={styles.podiumContainer}>

        {/* 2nd Place (Medium Height) */}
        <View style={[styles.podiumItem, { height: height * 0.25 }]}>
            <View style={styles.medalContainer}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/179/179251.png' }}  // Placeholder for 2nd place medal
                    style={styles.medal}
                />
            </View>
          <Image
            source={{ uri: players[1].image }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{players[1].name}</Text>
        </View>

        {/* 1st Place (Tallest) */}
        <View style={[styles.podiumItem, { height: height * 0.3 }]}>
            <View style={styles.medalContainer}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/179/179249.png' }}  // Placeholder for 1st place medal
                    style={styles.medal}
                />
            </View>
          <Image
            source={{ uri: players[0].image }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{players[0].name}</Text>
        </View>

        {/* 3rd Place (Shortest) */}
        <View style={[styles.podiumItem, { height: height * 0.2 }]}>
            <View style={styles.medalContainer}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/179/179250.png' }}  // Placeholder for 3rd place medal
                    style={styles.medal}
                />
            </View>
          <Image
            source={{ uri: players[2].image }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{players[2].name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    width: width - 40,
    height: height * 0.4,
  },
  podiumItem: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: width * 0.25,
    marginBottom: 20,
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  medal: {
    width: 50,
    height: 50,
  },
  medalContainer: {
    flex: 1
  },
  avatar: {
    width: height * 0.1,
    height: height * 0.1,
    marginTop: -height * 0.05,
  },
  name: {
    color: '#fff',
    fontSize: 25,
    marginTop: 10,
    paddingBottom: 5,
    fontWeight: 'bold'
  },
});

export default Podium;
