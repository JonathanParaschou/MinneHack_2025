// import React from 'react';
// import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
// import { useRouter } from 'expo-router'; // Use expo-router's useRouter for navigation
// import Timer from '../components/ContestTimer'; // Import the Timer component

// const { width } = Dimensions.get('window'); // Get the window width for responsive styling

// const ContestScreen = () => {
//   const router = useRouter(); // Using useRouter for navigation
//   const contestStartTime = new Date('2025-02-10T00:00:00'); // Example contest start time
//   const timeRemaining = contestStartTime - new Date();

//   const handleTimeEnd = () => {
//     router.push('/voting'); // Navigate to /rating when time is up
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image
//           source={require('../images/user-friends.png')} // Convert your SVG to PNG or use a library like react-native-svg
//           style={styles.friends}
//         />
//         <Text style={styles.title}>DrawIt.</Text>
//         <Text style={styles.user}>User photo</Text> {/* Example text for the user photo */}
//       </View>
//       <View>
//         <Text style={styles.countdownText}>Contest ends in:</Text>
//         <Timer duration={timeRemaining} onTimeEnd={handleTimeEnd} />
//         {/* Add your Draw component here */}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212', // Dark background for the whole screen
//     color: '#ffffff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderBottomColor: '#444', // Lighter border color
//     borderBottomWidth: 1,
//     backgroundColor: '#1f1f1f', // Dark background for the header
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//   },
//   friends: {
//     width: width * 0.08,
//     height: width * 0.08,
//   },
//   user: {
//     height: width * 0.06,
//     width: width * 0.06,
//     borderRadius: 15,
//     backgroundColor: '#ccc', // Placeholder for user photo
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     flex: 1,
//     textAlign: 'center',
//     color: '#ffffff', // White text for the dark mode
//   },
//   countdownText: {
//     color: '#ffffff', // White text color for the countdown
//     textAlign: 'center',
//     fontSize: 20,
//     marginVertical: 20,
//   },
// });

// export default ContestScreen;
