import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { ensureAuth, user } from '../utils/firebase';

const { width, height } = Dimensions.get("window");

const Header = () => {
  const router = useRouter();

  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    async function load() {
      await ensureAuth();
      setPhotoURL((user as any).photoURL);
    }
    load();
  }, []);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push('/friends')}>
        <Text style={styles.text}>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => router.push('/home')}>
        <Text style={styles.title}>DrawIt.</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/user')}>
        <Image
          style={styles.avatar}
          source={{
            uri: photoURL,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  title: {
    fontSize: 30,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: "#ffffff", // White text for dark mode
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'white'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
});

export default Header;