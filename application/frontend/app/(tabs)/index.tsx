import { ScrollView, Text, View, Image, Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import SubmissionTile from "../components/SubmissionTile";
import Footer from "../components/Footer";

const { width, height } = Dimensions.get('window');

export default function Index() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.friends}>
          Friends
        </Text>
        <Text style={styles.title}>
          DrawIt.
        </Text>
        <Text style={styles.user}>
          Profile
        </Text>
      </View>

      {/* <ScrollView style={styles.container}>
        <SubmissionTile />
        <SubmissionTile />
        <SubmissionTile />
      </ScrollView> */}
      <Footer/>
    </View>
  );
}

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
    color: '#ffffff',
  },
  user: {
    color: '#ffffff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#ffffff', // White text for the dark mode
  },
});
