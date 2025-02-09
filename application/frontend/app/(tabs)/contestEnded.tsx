import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import Header from '../components/header';
import Footer from '../components/Footer';
import Podium from '../components/Podium';

interface UserInfo {
    friends: string[];
    email: string;
    uid: string;
    dispName:string;
    photoURL: string;
    friendRequests: string[];
}

export default function ContestEnded() {
    return (
        <View style={styles.container}>
            <Header></Header>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>Contest has ended!</Text>
                <Text style={styles.subTitle}>Voting Results:</Text>
            </View>
            {/* <Podium></Podium> */}
=            <Footer></Footer>
        </View>
    );
}

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#1f1f1f",
        alignContent: 'center',
        textAlign: 'center',
        height: '100%'
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
        marginBottom: 50,
        width: '85%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: -40
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 70,
        color: 'white',
    },
    subTitle: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
    }
});