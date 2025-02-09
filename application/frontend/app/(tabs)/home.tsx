import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import Footer from "../components/Footer";
import Header from "../components/header";
import SubmissionTile from "../components/SubmissionTile";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchWithUid } from "../utils/fetch";

export default function Index() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState([]);
  const [prompt, setPrompt] = useState<{ prompt: string; uids: string[] } | null>(null);
  const [userHasDrawn, setUserHasDrawn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login'); // Redirect to login if not authenticated
        return;
      }

      try {
        // Fetch prompt
        const promptResponse = await fetch('http://localhost:8080/api/prompt');
        const promptData = await promptResponse.json();
        setPrompt(promptData);

        // Check if the user has drawn
        setUserHasDrawn(promptData.uids.includes(user.uid));

        // Fetch submissions
        const submissionsResponse = await fetch('http://localhost:8080/api/submissions');
        const submissionsData = await submissionsResponse.json();
        console.log(submissionsData);
        setSubmissions(submissionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!userHasDrawn) {
    return (
      <View style={styles.blockedContainer}>
        <Text style={styles.blockedText}>You must draw today's prompt to unlock your feed!</Text>
        <Text style={[styles.blockedText, {fontWeight: 'bold'}]}>{(prompt as any).prompt}</Text>
        <TouchableOpacity style={styles.drawButton} onPress={() => router.push('/(tabs)/draw')}>
          <Text style={styles.drawButtonText}>Draw Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{prompt?.prompt}</Text>
        {submissions.length > 0 ? (
          submissions.map((submission, index) => (
            <SubmissionTile key={index} submission={submission} />
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
    backgroundColor: "#121212",
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#121212",
  },
  blockedText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    width: '90%',
  },
  drawButton: {
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  drawButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },
  noDataText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#121212",
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
  },
});
