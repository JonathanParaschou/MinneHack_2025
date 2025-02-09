import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { fetchWithUid } from '../utils/fetch';
import { useRouter } from 'expo-router';
import { auth, ensureAuth, user } from '../utils/firebase';


const FriendsComponent = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

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
    <View style={styles.container}>
      <Header></Header>
      <Text style={{marginTop: 50}}></Text>
      {(users as any).map((user: any) => {
        <View style={styles.user}>
          <Text>{user.name}</Text>
        </View>
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  user: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }
});

export default FriendsComponent;
