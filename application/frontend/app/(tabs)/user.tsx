import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, TextInput } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import Footer from "../components/Footer";
import Podium from "../components/Podium";
import Header from "../components/header";
import React, { useState, useEffect } from 'react';
import { ensureAuth, user } from "../utils/firebase";
import { fetchWithUid } from "../utils/fetch";

const { width, height } = Dimensions.get("window");

export default function User() {
    const [username, setUsername] = useState(''); 
    const [editingUsername, setEditingUsername] = useState(false);
    const [photoURL, setPhotoURL] = useState('');
    const [userData, setUser] = useState({} as any);
    const [owner, setOwner] = useState(false);
    let { id } = useLocalSearchParams();

    const router = useRouter();

    const players = [
        { name: '1', image: '' },
        { name: '3', image: '' },
        { name: '5', image: '' }
    ];

    function handleUsernameChange() {
        if (editingUsername) {
            userData.dispName = username;
            const config = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...userData })
            }

            fetchWithUid(`http://localhost:8080/api/users/${(userData as any).uid}`, config, (user as any).uid);
        }

        setEditingUsername(!editingUsername);
    }

    useEffect(() => {
        async function load() {
            await ensureAuth();
            if (!user) {
                router.push('/login');
                return;
            }

            if (!id) {
              id = (user as any).uid;
            }

            const resp = await fetchWithUid(`http://localhost:8080/api/users/${id}`, {}, user.uid);
            const data = (await resp.json())[0];

            if (data.uid === (user as any).uid) {
                setOwner(true);
            }

            setUser(data);
            console.log(data);
            setUsername(data.dispName || ''); // Ensure a fallback for username
            setPhotoURL((data as any).photoURL);
        }
        load();
    }, [id]);

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollView}>
        <View style={styles.userTop}>
            <Image
              style={styles.avatar}
              source={{
                uri: photoURL,
              }}
            />
            {editingUsername ?
                <TextInput
                    style={styles.input}
                    value={username}  // Bind state value to TextInput
                    onChangeText={setUsername}  // Update state on text change
                    placeholder="Enter new username"  // Placeholder text
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                /> :
                <Text style={styles.username}>{username}</Text>
            }
            {owner ?
            <TouchableOpacity onPress={handleUsernameChange}>
                <Text style={styles.editButton}>{editingUsername ? "Save Username" : "Edit Username"}</Text>
            </TouchableOpacity> : null
            }
        </View>

        <Podium players={players} />
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
  input: {
    height: 40,
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    width: width * 0.5,
    paddingHorizontal: 10,
    marginTop: 10,
    color: 'white',
  },
  scrollView: {
    width: '100%',
  },
  userTop: {
    width: width,
    marginTop: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 999,
    width: height * 0.25,
    height: height * 0.25,
  },
  username: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileText: {
    fontWeight: 'bold',
    color: 'white',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: "#ffffff",
  },
  text: {
    color: 'white',
  },
  editButton: {
    color: 'white',
    marginTop: 10,
    backgroundColor: '#1f1f1f',
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  }
});
