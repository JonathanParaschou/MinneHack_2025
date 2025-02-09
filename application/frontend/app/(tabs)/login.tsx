import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { signInWithGoogle, user } from "../utils/firebase";
import styles from "../style/google-button";

interface UserInfo {
    friends: string[];
    email: string;
    uid: string;
    dispName:string;
    photoURL: string;
}

export default function Index() {
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
                photoURL: (user as any).photoURL
            }

            fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info)
            });
        } 
        catch {
            console.log('uh oh!');
        }
    };

    return (
        <View>
            <TouchableOpacity style={styles.materialButton} onPress={handlePress}>
                <View style={styles.materialButtonContentWrapper}>
                    <View style={styles.materialButtonIcon}>
                        <Image 
                            source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Google_2015_logo.svg'}} 
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
