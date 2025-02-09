import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { ensureAuth, user } from '../utils/firebase';

const { width, height } = Dimensions.get("window");

const Header = ({ friends } : { friends?: boolean }) => {
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
      {friends ? 
        <TouchableOpacity onPress={() => router.push('/friendslist')}>
          <Text style={styles.text}>Friends List</Text>
        </TouchableOpacity>
      :
        <TouchableOpacity onPress={() => router.push('/friends')}>
          <Text style={styles.text}>Friends</Text>
        </TouchableOpacity>
      }
      <TouchableOpacity style={{ flex: 1 }} onPress={() => router.push('/home')}>
        <View style={styles.titleContainer}>
            <Text style={styles.textSegment}>Draw</Text>
            <Image
                source={{uri: 'https://static.vecteezy.com/system/resources/previews/048/690/582/non_2x/a-brush-isolated-on-transparent-background-free-png.png'}} 
                style={{width: 40, height: 40, marginRight: -15, marginLeft: -15}}
            />
            <Text style={styles.textSegment}>t.</Text>
        </View>
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textSegment: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#444", // Lighter border color
    borderBottomWidth: 1,
    backgroundColor: "#1f1f1f", // Dark background for the header
    paddingVertical: 5,
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