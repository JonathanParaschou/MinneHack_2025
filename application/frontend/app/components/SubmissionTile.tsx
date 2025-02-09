import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import SvgUri from 'react-native-svg'; // This is one option to render SVG

const { width } = Dimensions.get('window');

interface Submission {
  photoURL: string;
  creatorId: string;
  submittedAt: Date;
  prompt: string;
}

const SubmissionTile = ({ submission }: { submission: Submission }) => {
  // Destructure the properties from the submission prop
  console.log(submission);
  
  const { photoURL, creatorId, submittedAt, prompt } = submission;
  return (
    <View style={styles.tileContainer}>
      {/* Render the post image if it's an SVG */}
      {/* <SvgUri
        width="100%" // Full width of the container
        height={width * 0.5} // Same height as before
        uri={photoURL}  // The URL of the SVG image
      /> */}

      <Text style={styles.timeText}>Posted {submittedAt.toString()}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    backgroundColor: '#1f1f1f',
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
    color: '#FFF',
  },
  postImage: {
    width: '100%',
    height: width * 0.5,
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
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default SubmissionTile;
