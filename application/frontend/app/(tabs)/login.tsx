import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { signInWithGoogle } from "../utils/firebase";
import styles from "../style/google-button";

  
export default function Index() {
   
    const handlePress = async () => {
        try {
            const userCredential = await signInWithGoogle();
            const idToken = userCredential?.credential?.idToken;

            if (idToken) {
                // Send the ID token to the backend
                const response = await fetch('http://local-host:80/api/authentication', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: idToken }), // Sending the token as JSON
                });

                if (response.ok) {
                    // Handle successful login
                    console.log('User successfully authenticated with backend!');
                } else {
                    console.log('Error authenticating with backend');
                }
            }
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
