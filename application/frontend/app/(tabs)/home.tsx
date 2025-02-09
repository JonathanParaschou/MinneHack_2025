import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { useRouter } from 'expo-router';
import Footer from "../components/Footer";
import Header from "../components/Header";
import SubmissionTile from "../components/SubmissionTile";

export default function Index() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState([]); // State to hold fetched submission data

  // Fetch data on component mount
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/submissions'); // Replace with actual API URL
        const data = await response.json();
        setSubmissions(data); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []); // Empty dependency array to run only once after component mounts

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/draw')}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>

        {submissions.length > 0 ? (
          submissions.map((submission, index) => (
            <SubmissionTile key={index} submission={submission} /> // Pass each submission as a prop
          ))
        ) : (
          <Text style={styles.noDataText}>No submissions available</Text>
        )}
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background for the whole screen
  },
  scrollContent: {
    paddingTop: 60, // Ensure content starts below the fixed header
    paddingBottom: 20,
  },
  friends: {
    width: width * 0.08,
    height: width * 0.08,
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#GGG',
    fontWeight: 'bold',
  },
  text: {
    color: 'white'
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: "#ffffff", // White text for dark mode
  },
  noDataText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});
