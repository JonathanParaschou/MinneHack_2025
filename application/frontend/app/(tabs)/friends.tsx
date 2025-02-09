import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TextInput, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { fetchWithUid } from '../utils/fetch';
import { useRouter } from 'expo-router';
import { auth, ensureAuth, user } from '../utils/firebase';
import Footer from '../components/Footer';

const { width, height } = Dimensions.get("window");

const FriendsComponent = () => {
  const [users, setUsers] = useState([]);  // Filtered list
  const [allUsers, setAllUsers] = useState([]); // Full list
  const [search, setSearch] = useState('');
  const router = useRouter();

  // handle the add friend button
  function handleAddFriend(otherId: string) {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: (user as any).uid, other: otherId }),
    }
    fetchWithUid('http://localhost:8080/api/friends/sendRequest', params, (user as any).uid);

    // Update the list of users
    const updatedUsers = users.filter((u: any) => u.uid !== otherId);
    setUsers(updatedUsers);
  }

  function handleSearch(text: string) {
    setSearch(text); // Update state with the search text
    if (!text.trim()) {
      setUsers(allUsers); // Reset to original list when search is cleared
      return;
    }

    const filteredUsers = allUsers.filter((user: any) =>
      user.dispName.toLowerCase().includes(text.toLowerCase()) ||
      user.email.toLowerCase().includes(text.toLowerCase())
    );

    setUsers(filteredUsers);
  }

  useEffect(() => {
    async function load() {
      await ensureAuth();
      if (user) {
        const res = await fetchWithUid('http://localhost:8080/api/users', {}, user.uid);
        let data = await res.json();
        data = data.filter((u: any) => !(u.friendRequests.includes((user as any).uid) || u.friends.includes((user as any).uid)));

        setUsers(data);
        setAllUsers(data); // Store full list of users
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
        <Text style={styles.pageTitle}>Search for Friends</Text>
      </View>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={handleSearch} // Properly handle text input
        placeholder="Search username or email"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
      />
      <Text style={{fontSize: 10, color: 'white', marginTop: 3}}>Friends and friend requests will not show up here</Text>
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
          <Text style={styles.userText}>No users found!</Text>
        )}
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    width: width,
  },
  container: {
    flexGrow: 1,
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
