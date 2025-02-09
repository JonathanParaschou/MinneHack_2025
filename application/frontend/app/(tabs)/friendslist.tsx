import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, Button, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchWithUid } from '../utils/fetch';
import { auth, ensureAuth, user } from '../utils/firebase';
import Footer from '../components/Footer';
import Header from '../components/header';

const { width, height } = Dimensions.get("window");

const FriendsListPage = () => {
    const [friends, setFriends] = useState([]);
    const [incomingRequests, setIncomingRequests] = useState([]);  // New state for incoming requests
    const router = useRouter();

    function removeFriend(friendId: string) {
        fetchWithUid(`http://localhost:8080/api/friends/removeFriend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: (user as any).uid,
                other: friendId,
            }),
        }, (user as any).uid);
    
        // Update the list of friends
        const updatedFriends = friends.filter((f: any) => f.uid !== friendId);
        setFriends(updatedFriends);
    }

    // Function to load the data
    const load = async () => {
        await ensureAuth();
        if (user) {
            const res = await fetchWithUid(`http://localhost:8080/api/users/friends`, {}, user.uid);
            const friendsData = await res.json();
            setFriends(friendsData);

            // Fetch incoming friend requests
            const requestsRes = await fetchWithUid(`http://localhost:8080/api/users/user`, {}, user.uid);
            const requestsData = await requestsRes.json();

            console.log(requestsData.friendRequests);
            if (requestsData.friendRequests.length > 0) {
                const usersRes = await fetchWithUid(`http://localhost:8080/api/users/${requestsData.friendRequests.join(',')}`, {}, user.uid);
                const usersData = await usersRes.json();
                setIncomingRequests(usersData);
            } else {
                setIncomingRequests([]);
            }
        } else {
            router.push('/login');
        }
    };

    useEffect(() => {
        load();
    }, []);

    // Function to handle accept or decline of friend requests
    const handleRequestAction = async (requestId: string, action: 'accept' | 'decline') => {
        // Make an API call to accept/decline the request
        if (user) {
            await fetchWithUid(`http://localhost:8080/api/friends/${action}Request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user.uid,
                    other: requestId,
                }),
            }, user.uid).then(() => {
                load();
            });
        }
    };

    return (
        <View style={styles.page}>
            <Header />
            <View style={styles.headerContainer}>
                <Text style={styles.pageTitle}></Text>
            </View>

            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
                <Text style={styles.subTitle}>Incoming Friend Requests</Text>
                {incomingRequests.length > 0 ? (
                    incomingRequests.map((request: any) => (
                        <View key={request} style={styles.user}>
                            <Image source={{ uri: request.photoURL }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                            <Text style={styles.userText}>{request.dispName}</Text>
                            <TouchableOpacity onPress={() => handleRequestAction(request.uid, 'accept')}>
                                <Text style={styles.buttonText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleRequestAction(request.uid, 'decline')}>
                                <Text style={styles.buttonText}>Decline</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.userText}>No incoming requests</Text>
                )}
                <View style={{marginTop: 30}}></View>
                <Text style={styles.subTitle}>Your Friends</Text>
                {friends.length > 0 ? (
                    friends.map((friend: any) => (
                        <View key={friend.id || friend.uid} style={styles.user}>
                            <Image source={{ uri: friend.photoURL }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                            <Text style={styles.userText}>{friend.dispName}</Text>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => removeFriend(friend.uid)}>
                                    <Text style={styles.buttonText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.userText}>No friends found</Text>
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
        justifyContent: 'space-between', // Ensures footer stays at the bottom
    },
    headerContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    pageTitle: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
    },
    subTitle: {
        color: 'white',
        fontSize: 20,
        marginVertical: 10,
        fontWeight: 'bold',
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
        // flex: 1,
    },
    buttonText: {
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 5,
        borderRadius: 5,
        marginLeft: 'auto'
    },
});

export default FriendsListPage;
