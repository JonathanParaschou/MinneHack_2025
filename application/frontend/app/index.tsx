import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { signInWithGoogle, user } from "./utils/firebase";
import styles from "./style/google-button";
import { useRouter } from 'expo-router';

interface UserInfo {
    friends: string[];
    email: string;
    uid: string;
    dispName:string;
    photoURL: string;
    friendRequests: string[];
}

export default function Index() {
  const router = useRouter();
    const handlePress = async () => {
        try {
            await signInWithGoogle();
            if (!user) {
                console.log('User not authenticated');
                return;
            }
            
            const info: UserInfo = {
                friends: [],
                email: (user as any).email,
                uid: (user as any).uid,
                dispName: (user as any).displayName,
                photoURL: (user as any).photoURL,
                friendRequests: []
            }

            fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info)
            });
            router.push('/home');
        } 
        catch {
            console.log('uh oh!');
        }
    };

    return (
        <View style={loginStyles.container}>
            <View>
                <View style={loginStyles.titleContainer}>
                    <Text style={loginStyles.title}>Draw</Text>
                    <Image
                        source={{uri: 'https://static.vecteezy.com/system/resources/previews/048/690/582/non_2x/a-brush-isolated-on-transparent-background-free-png.png'}} 
                        style={{width: 50, height: 50, marginRight: -15, marginLeft: -15}}
                    />
                    <Text style={loginStyles.title}>t.</Text>
                </View>
                <Text style={loginStyles.subtitle}>Show off daily drawings to your friends and compete in weekly competitions</Text>
            </View>
            <TouchableOpacity style={styles.materialButton} onPress={handlePress}>
                <View style={styles.materialButtonContentWrapper}>
                    <View style={styles.materialButtonIcon}>
                        <Image 
                            source={{uri: 'https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png'}} 
                            style={{width: 20, height: 20}} 
                        />
                    </View>
                    <Text style={styles.materialButtonContents}>Sign in with Google</Text>
                    <View style={styles.materialButtonState} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const loginStyles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#1f1f1f",
        alignContent: 'center',
        textAlign: 'center',
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
        fontSize: 50,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50,
        color: 'white',
    }
});