import { ScrollView, Text, View, Image, Dimensions, Button, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import SubmissionTile from "../components/SubmissionTile";
import { useRouter } from 'expo-router';
import Footer from "../components/Footer";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Friends</Text>
        <Text style={styles.title}>DrawIt.</Text>
        <Text style={styles.text}>User photo</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/draw')}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
        <SubmissionTile />
        <SubmissionTile />
        <SubmissionTile />
        <SubmissionTile />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#444", // Lighter border color
    borderBottomWidth: 1,
    backgroundColor: "#1f1f1f", // Dark background for the header
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
  },
  scrollContent: {
    paddingTop: 60, // Ensure content starts below the fixed header
    paddingBottom: 20,
  },
  friends: {
    width: width * 0.08,
    height: width * 0.08,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: "#ffffff", // White text for dark mode
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'white'
  }
});

