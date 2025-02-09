import { ScrollView, Text, View, Image, Dimensions, Button, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import SubmissionTile from "../components/SubmissionTile";
import { useRouter } from 'expo-router';
import Footer from "../components/Footer";
import Header from "../components/Header";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/draw')}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity> */}
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

