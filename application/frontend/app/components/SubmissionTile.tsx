import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { SvgXml } from 'react-native-svg'; // Import SvgXml
import { fetchWithUid } from '../utils/fetch';
import { ensureAuth, user } from '../utils/firebase';
import { useRouter } from 'expo-router';

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
  const [userData, setUserData] = useState<any>({photoURL: '', dispName: ''});

  const router = useRouter();

  function makePostedString(date: Date) {
    date = new Date(date);
    const options: any = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options) + ' at ' + date.toLocaleTimeString();
    return "";
  }

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

        await ensureAuth();
        const userResponse = await fetchWithUid(`http://localhost:8080/api/users/${creatorId}`, {}, (user as any).uid);
        console.log(userData);
        setUserData(userData);
        console.log(userData);
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
      <View style={styles.tileHeader}>
        <Image
            source={{uri: userData.photoURL}} 
            style={{width: 40, height: 40, borderRadius: 20}}
            onClick={() => router.push('/user?id=' + userData.uid)}
          />
          <Text style={styles.username}>
            {userData.dispName}
          </Text>
      </View>
      {/* Conditionally render the SVG if it's available */}
      {svgContent ? (
        <SvgXml xml={svgContent} width={svgWidthAdjusted} height={svgHeightAdjusted} />
      ) : (
        <Text style={styles.timeText}>Loading SVG...</Text>
      )}

      <Text style={styles.timeText}>{makePostedString(submittedAt)}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('../comments')}>
          <Text style={styles.buttonText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  username: {
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20
  },
  tileHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10
  },
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
    marginTop: 5
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
