import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TextInput, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { fetchWithUid } from '../utils/fetch';
import { useRouter } from 'expo-router';
import { auth, ensureAuth, user } from '../utils/firebase';
import Footer from '../components/Footer';

const { width, height } = Dimensions.get("window");


const FriendsComponent = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  function handleAddFriend(uid: string) {
    console.log(uid);
  }

  useEffect(() => {
    async function load() {
      await ensureAuth();
      if (user) {
        const res = await fetchWithUid('http://localhost:8080/api/users', {}, user.uid);
        const data = await res.json();
        setUsers(data);
        console.log(data);
      } else {
        router.push('/login');
      }
    }
    load();
  }, []);
  
  return (
    <View style={styles.page}>
      <Header />
      <View style={{marginTop: 80}}></View>
      <View>
        <Text style={styles.pageTitle}>
          Search for Friends
        </Text>
      </View>
      <TextInput
          style={styles.input}
          value={search}  // Bind state value to TextInput
          onChangeText={setSearch}  // Update state on text change
          placeholder="Search username or email"  // Placeholder text
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
      />
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
        {users.length > 0 ? (
          users.map((user: any) => (
            <View key={user.id || user.uid} style={styles.user}>
              <Image source={{ uri: user.photoURL }} style={{ width: 50, height: 50, borderRadius: 50 }} />
              <Text style={styles.userText}>{user.dispName}</Text>
              <TouchableOpacity onPress={() => handleAddFriend(user.uid)}>
                  <Text style={styles.buttonText}>Add Friend</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.userText}>No users found</Text>
        )}
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1, // Ensures the entire page takes full screen height
    backgroundColor: 'black',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1, // Makes the ScrollView take up the remaining space
    width: width,
  },
  container: {
    flexGrow: 1, // Ensures content expands inside ScrollView
    alignItems: 'center',
    paddingVertical: 20,
  },
  user: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#555',
    width: width * 0.9,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'left',
    flex: 1,
  },
  pageTitle: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    // fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    width: width * 0.7,
    paddingHorizontal: 10,
    marginTop: 10,
    color: 'white',
  },
  buttonText: {
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 5,
    borderRadius: 5,
  }
});



export default FriendsComponent;
