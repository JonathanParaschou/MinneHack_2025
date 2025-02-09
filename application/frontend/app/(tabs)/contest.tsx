import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../components/header';
import Footer from '../components/Footer';
import { fetchWithUid } from '../utils/fetch';
import { ensureAuth, user } from '../utils/firebase';
import { NavigationOptions } from 'expo-router/build/global-state/routing';

const { width, height } = Dimensions.get('window');

const ContestScreen = () => {
    const router = useRouter();
    let currentTime = new Date();
    const [data, setData] = useState({});

    // 'not started', 'in progress', 'voting', 'ended'
    const [contestFlag, setContestFlag] = useState('not started');

    useEffect(() => {
        async function load() {
            await ensureAuth();
            if (!user) {
                router.push('/login');
                return;
            }

            const response = await fetchWithUid('http://localhost:8080/api/contests', {}, user.uid);
            const respData = await response.json();
            const date = new Date(respData.time.seconds * 1000);
            respData.time = date;
            setData(respData);

            const votingTime = new Date(date.getTime() + 5 * 60000);
            const contestEndTime = new Date(date.getTime() + 15 * 60000);

            router.push(`/draw?id=${respData.contestId}`);
            return;
            
            currentTime = new Date();
            if (currentTime < date) {
                setContestFlag('not started');
            }
            else if (currentTime < votingTime) {
                setContestFlag('in progress');
                router.push(`/draw?id=${respData.contestId}`);
                return;
            }
            else if (currentTime < contestEndTime) {
                setContestFlag('voting');
                router.push('/voting');
                return;
            }
            else {
                setContestFlag('ended');
            }

            //check time and update accordingly
            const interval = setInterval(() => {
                currentTime = new Date();
                if (currentTime < date) {
                    setContestFlag('not started');
                }
                else if (currentTime < votingTime) {
                    setContestFlag('in progress');
                    router.push(`/draw?id=${respData.contestId}`);
                    clearInterval(interval);
                }
                else if (currentTime < contestEndTime) {
                    setContestFlag('voting');
                    router.push('/voting');
                    clearInterval(interval);
                }
                else {
                    setContestFlag('ended');
                }
            }, 1000);

            //clear interval on un-mount
            return () => clearInterval(interval);
        }
        load();
    }, []);

    return (
        <View style={styles.container}>
            <Header />
            
            {/* Content wrapper that pushes the footer down */}
            <View style={styles.content}>
                { contestFlag === 'not started' ? 
                    <View>
                        <Text style={styles.countdownText}>Contest has not started yet!</Text> 
                        <Text style={[styles.countdownText, {marginTop: -10, fontSize: 12}]}>Starts at: {data.time?.toLocaleString()}</Text>
                        <Text style={styles.countdownText}>Get those drawing skills ready!</Text>
                    </View>
                : contestFlag === 'ended' ? 
                    <Text style={styles.countdownText}>Contest has ended</Text> 
                :
                    <Text style={styles.countdownText}>Contest ends in:</Text>
                }
            </View>
            
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensures full height usage
        backgroundColor: '#121212',
    },
    content: {
        flex: 1, // Pushes the footer to the bottom
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
    countdownText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 20,
    },
    footer: {
        width: '100%',
        position: 'absolute', // Ensures it stays at the bottom
        bottom: 0,
    },
});

export default ContestScreen;
