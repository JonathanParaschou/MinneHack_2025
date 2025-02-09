import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg'; // Import SvgXml
import { useRouter } from 'expo-router';
import Header from '../components/header';
import { fetchWithUid } from '../utils/fetch';
import { ensureAuth, user } from '../utils/firebase';
import Footer from '../components/Footer';

const { width, height } = Dimensions.get('window');

const VotingScreen = () => {
  const [index, setIndex] = useState(0);
  const [svgContent, setSvgContent] = useState<string | null>(null); // State to hold the fetched SVG content
  const [svgWidth, setSvgWidth] = useState<number>(0);
  const [svgHeight, setSvgHeight] = useState<number>(0);
  const [contestData, setContestData] = useState([]);
  const router = useRouter();

  const handleVote = (rating: any) => {
    const id = (contestData[index] as any).submissionId;
    fetchWithUid(`http://localhost:8080/api/submissions/rating/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: rating }),
    }, (user as any).uid);
    fetchNewImage();
  };

  const fetchNewImage = () => {
    // if (index === contestData.length - 1) {
    //   router.push('/results');
    // }
    setIndex((index + 1));

    fetchSvg();
  };

  const fetchSvg = async () => {
    try {
      console.log(contestData);
      const response = await fetch((contestData[index] as any).photoURL);
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

  useEffect(() => {
    async function load() {
      await ensureAuth();
      if (!user) {
        router.push('/login');
        return;
      }

      const response = await fetchWithUid('http://localhost:8080/api/submissions/', {}, (user as any).uid);
      const data = await response.json();
      console.log(data);

      setContestData(data);


      const contestResponse = await fetch('http://localhost:8080/api/contests');
      const contestDataTemp = await contestResponse.json();

      fetchSvg();
      //use this later
      // const contestSubmissions = data.filter((submission: any) => (submission.contestId && submission.contestId === contestData.id));
    }
    load();
  }, []);

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
    <View style={styles.container}>
        <Header />
        <ScrollView style={styles.container}>
          <View style={styles.content}>
              <Text style={styles.voteText}>Vote on the Drawings!</Text>
                {svgContent ? (
                  <SvgXml xml={svgContent} style={styles.image} width={svgWidthAdjusted} height={svgHeightAdjusted} />
                ) : (
                  <Text style={styles.timeText}>Loading SVG...</Text>
                )}
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
        <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  voteText: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 10,
    marginTop: 65
  },
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