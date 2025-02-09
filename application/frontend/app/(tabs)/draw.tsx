import React, { useState } from "react";
import { View, Button, StyleSheet, Text, Alert } from "react-native";
import Svg, { Path } from "react-native-svg";
import Slider from "@react-native-community/slider";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmzZE1MkkCs0zDteZd4XUvbaBLfqi5uss",
  authDomain: "drawit-25b8c.firebaseapp.com",
  projectId: "drawit-25b8c",
  storageBucket: "drawit-25b8c.firebasestorage.app",
  messagingSenderId: "887264139761",
  appId: "1:887264139761:web:c285bbf327dc1377a50c50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export default function DrawPage() {
  const [paths, setPaths] = useState<Array<string>>([]); // Store drawn paths
  const [currentPath, setCurrentPath] = useState<string>(""); // Path being drawn
  const [strokeColor, setStrokeColor] = useState<string>("#FF0000"); // Default color (Red)
  const [strokeWidth, setStrokeWidth] = useState<number>(5); // Default brush size

  // Handle touch start (begin drawing)
  const handleTouchStart = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    const newPath = `M${locationX},${locationY}`; // Move to start point (M)
    setCurrentPath(newPath); // Initialize path with the start point
  };

  // Handle touch move (continue drawing)
  const handleTouchMove = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    if (currentPath) {
      setCurrentPath(`${currentPath} L${locationX},${locationY}`); // Draw line (L) to new point
    }
  };

  // Handle touch end (finish drawing)
  const handleTouchEnd = () => {
    if (currentPath) {
      setPaths([...paths, currentPath]); // Add the current path to paths state
      setCurrentPath(""); // Reset current path for the next drawing
    }
  };

  // Save the drawing as an image to Firebase Storage
  const handlePost = async () => {
    const svg = `<svg width="300" height="400">${paths
      .map(
        (path) =>
          `<path d="${path}" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="none" />`
      )
      .join("")}</svg>`;
    
    // Convert SVG to Blob (you can adjust this method depending on your library/tools)
    const svgBlob = new Blob([svg], { type: "image/svg+xml" });

    // Upload to Firebase Storage
    const storageRef = ref(storage, `drawings/${Date.now()}.svg`);
    const uploadTask = uploadBytesResumable(storageRef, svgBlob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can track progress here if needed
      },
      (error) => {
        console.error("Upload failed", error);
        Alert.alert("Upload failed", "There was an issue uploading the drawing.");
      },
      () => {
        // After upload, get the URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Drawing uploaded successfully! URL: ", downloadURL);
          Alert.alert("Upload successful", `Your drawing is available at: ${downloadURL}`);

          const submissionObj = {
            photoURL: downloadURL,
            prompt: "Draw something",
            creatorId: "TestUser",
            submittedAt: new Date(),
            comments: []
          }

          // MAKE A POST TO THE NODE API
          fetch("http://localhost:5000/api/submissions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submissionObj),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      }
    );
  };

  // Clear canvas (reset all paths)
  const clearCanvas = () => {
    setPaths([]);
  };

  // Undo the last drawing path
  const undoDrawing = () => {
    setPaths(paths.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      {/* Brush Size Slider */}
      <View style={styles.sliderContainer}>
        <Text style={styles.text}>Brush Size</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={20}
          value={strokeWidth}
          onValueChange={(value) => setStrokeWidth(value)}
        />
      </View>

      {/* Canvas for drawing */}
      <View
        style={styles.canvas}
        onStartShouldSetResponder={() => true} // Enable touch events
        onResponderStart={handleTouchStart} // Start drawing
        onResponderMove={handleTouchMove} // Continue drawing
        onResponderEnd={handleTouchEnd} // End drawing
      >
        <Svg width="300" height="400">
          {/* Render all paths */}
          {paths.map((path, index) => (
            <Path
              key={index}
              d={path}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              fill="none"
            />
          ))}
          {/* Render the current path being drawn */}
          {currentPath && (
            <Path
              d={currentPath}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              fill="none"
            />
          )}
        </Svg>
      </View>

      {/* Buttons for additional functionalities */}
      <View style={styles.buttonContainer}>
        <Button title="Post" onPress={handlePost} />
        <Button title="Clear Canvas" onPress={clearCanvas} />
        <Button title="Undo" onPress={undoDrawing} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  canvas: {
    backgroundColor: "white",
    marginBottom: 20,
    width: 300,
    height: 400,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
  },
  sliderContainer: {
    marginBottom: 20,
    width: "80%",
  },
  slider: {
    width: "100%",
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
});
