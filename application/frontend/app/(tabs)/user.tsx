import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, TextInput } from "react-native";
import { useRouter } from 'expo-router';
import Footer from "../components/Footer";
import Podium from "../components/Podium";
import Header from "../components/Header";
import React, { useState, useEffect } from 'react';
import { ensureAuth, user } from "../utils/firebase";

const { width, height } = Dimensions.get("window");

export default function User() {
    const [username, setUsername] = useState('USERNAME HERE');
    const [editingUsername, setEditingUsername] = useState(false);
    const [photoURL, setPhotoURL] = useState('');

    const router = useRouter();

    // put thier previous wins here?
    const players = [
        { name: '1', image: '' },
        { name: '3', image: '' },
        { name: '5', image: '' }
    ];

    function handleUsernameChange() {
        if (editingUsername) {
            // backend request
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

            setPhotoURL((user as any).photoURL);
        }
        load();
    }, []);

  return (
    <View style={styles.container}>
      <Header></Header>

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
                    placeholder="Enter some text"  // Placeholder text
                /> :
                <Text style={styles.username}>{username}</Text>
            }
            <TouchableOpacity onPress={handleUsernameChange}>
                <Text style={styles.editButton}>{editingUsername ? "Save Username" : "Edit Username"}</Text>
            </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#444",
    borderBottomWidth: 1,
    backgroundColor: "#1f1f1f",
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
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
    width: '100%'
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
    height: height * 0.25
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
