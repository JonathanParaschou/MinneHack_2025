import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { signInWithGoogle } from "../utils/firebase";
// import styles from "../style/google-button.ts"; // Import your styles here

export default function Index() {
    const handlePress = async () => {
        await signInWithGoogle();
    };

    return (
        // <View>
        //     <TouchableOpacity style={styles.materialButton} onPress={handlePress}>
        //         <View style={styles.materialButtonContentWrapper}>
        //             <View style={styles.materialButtonIcon}>
        //                 <Image 
        //                     source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Google_2015_logo.svg'}} 
        //                     style={{width: 20, height: 20}} 
        //                 />
        //             </View>
        //             <Text style={styles.materialButtonContents}>Sign in with Google</Text>
        //             <View style={styles.materialButtonState} />
        //         </View>
        //     </TouchableOpacity>
        // </View>
    );
}
