import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg'; // Import SvgXml

const { width, height } = Dimensions.get('window');

interface Submission {
  photoURL: string;
  creatorId: string;
  submittedAt: Date;
  prompt: string;
}

const SubmissionTile = ({ submission }: { submission: Submission }) => {
  const { photoURL, creatorId, submittedAt, prompt } = submission;
  const [svgContent, setSvgContent] = useState<string | null>(null); // State to hold the fetched SVG content
  const [svgWidth, setSvgWidth] = useState<number>(0);
  const [svgHeight, setSvgHeight] = useState<number>(0);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(photoURL);
        const svgText = await response.text();
        setSvgContent(svgText);

        // Extract width and height from the SVG viewBox
        const match = svgText.match(/viewBox="0 0 (\d+) (\d+)"/);
        if (match) {
          const [_, width, height] = match;
          setSvgWidth(parseInt(width, 10));
          setSvgHeight(parseInt(height, 10));
        }
      } catch (error) {
        console.error('Error fetching SVG:', error);
      }
    };

    if (photoURL) {
      fetchSvg();
    }
  }, [photoURL]);

  // Calculate aspect ratio of the SVG
  const aspectRatio = svgWidth && svgHeight ? svgWidth / svgHeight : 1;

  // Limit the max height and width
  const maxWidth = width * 0.9; // Max width to 90% of the screen width
  const maxHeight = height * 0.5; // Max height to 50% of the screen height

  // Calculate the desired width and height based on the aspect ratio
  let svgWidthAdjusted = maxWidth;
  let svgHeightAdjusted = maxWidth / aspectRatio;

  // If the height exceeds the max height, adjust accordingly
  if (svgHeightAdjusted > maxHeight) {
    svgHeightAdjusted = maxHeight;
    svgWidthAdjusted = maxHeight * aspectRatio;
  }

  return (
    <View style={styles.tileContainer}>
      {/* Conditionally render the SVG if it's available */}
      {svgContent ? (
        <SvgXml xml={svgContent} width={svgWidthAdjusted} height={svgHeightAdjusted} />
      ) : (
        <Text style={styles.timeText}>Loading SVG...</Text>
      )}

      <Text style={styles.timeText}>Posted {submittedAt.toString()}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('../comments')}>
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
