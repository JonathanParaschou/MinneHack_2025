import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import { RouteProp, useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function CommentsPage() {
  type RouteParams = {
    submissionId: string;
    comments: string;
  };

  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>(); // Get route parameters passed to the screen
  const navigation = useNavigation<NavigationProp<any>>();
  const { submissionId, comments: initialComments } = route.params; // Access the submissionId and comments

  const [commentsList, setCommentsList] = useState<{ comment: string; creatorId: string; createdAt: Date }[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigation.navigate('Login'); // Redirect to login if not authenticated
        return;
      }
      setUser(user);

      try {
        // Initialize comments from the passed route params
        const initialCommentsList = initialComments ? JSON.parse(decodeURIComponent(initialComments)) : [];
        setCommentsList(initialCommentsList);

        // Fetch existing comments for the submission
        const response = await fetch(`http://localhost:8080/api/submissions/${submissionId}/comments`);
        const data = await response.json();
        setCommentsList((prevComments) => [...prevComments, ...data]); // Append backend comments
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [submissionId, initialComments, navigation]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      return; // Don't allow empty comments
    }

    try {
      const response = await fetch(`http://localhost:8080/api/submissions/${submissionId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: newComment,
          creatorId: user.uid,
          createdAt: new Date(),
        }),
      });

      if (response.ok) {
        // Add the new comment to the list
        setCommentsList([...commentsList, { comment: newComment, creatorId: user.uid, createdAt: new Date() }]);
        setNewComment(''); // Clear the input field
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments</Text>

      <FlatList
        data={commentsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentText}>{item.comment}</Text>
            <Text style={styles.commentAuthor}>
              {item.creatorId === user.uid ? 'You' : item.creatorId} - {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noCommentsText}>No comments yet.</Text>}
        contentContainerStyle={styles.commentsList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleAddComment}>
          <Text style={styles.submitButtonText}>Post Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
  },
  commentContainer: {
    backgroundColor: '#1f1f1f',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    width: '100%',
  },
  commentText: {
    color: 'white',
    fontSize: 16,
  },
  commentAuthor: {
    color: '#777',
    fontSize: 12,
    marginTop: 5,
  },
  commentsList: {
    marginBottom: 20,
  },
  noCommentsText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  input: {
    backgroundColor: '#1f1f1f',
    color: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
