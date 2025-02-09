import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { useRouter } from 'expo-router';
import Footer from "../components/Footer";
import Podium from "../components/Podium";
import React, { useState } from 'react';

const { width, height } = Dimensions.get("window");

export default function User() {
    const [username, setUsername] = useState('USERNAME HERE');
    const [editingUsername, setEditingUsername] = useState(false);
    const router = useRouter();

    const players = [
        { name: '1', image: '' },
        { name: '3', image: '' },
        { name: '5', image: '' }
    ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/friends')}>
          <Text style={styles.text}>Friends</Text>
        </TouchableOpacity>
        <Text style={styles.title}>DrawIt.</Text>
        <TouchableOpacity onPress={() => router.push('/user')}>
          <Text style={styles.profileText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.userTop}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://avatars.githubusercontent.com/u/134348337?v=4",
              }}
              />
              <Text style={styles.username}>{username}</Text>
              <TouchableOpacity onPress={() => setEditingUsername(!editingUsername)}>
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
    padding: 5,
  }
});
