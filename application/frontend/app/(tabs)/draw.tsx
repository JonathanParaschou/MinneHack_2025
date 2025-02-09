import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import Slider from "@react-native-community/slider";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { fetchWithUid } from "../utils/fetch";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ensureAuth, user } from "../utils/firebase";

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
  const [paths, setPaths] = useState<Array<{ path: string, color: string, width: number }>>([]); // Store drawn paths with their color and width
  const [currentPath, setCurrentPath] = useState<string>(""); // Path being drawn
  const [strokeColor, setStrokeColor] = useState<string>("#FF0000"); // Default color (Red)
  const [strokeWidth, setStrokeWidth] = useState<number>(5); // Default brush size
  const [timeLeft, setTimeLeft] = useState<string>("");
  const { id } = useLocalSearchParams();

  const colorOptions = [
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#FFFFFF", // White
    "#000000", // Black
  ];

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
      // Add the current path with its color and width to the paths state
      setPaths([...paths, { path: currentPath, color: strokeColor, width: strokeWidth }]);
      setCurrentPath(""); // Reset current path for the next drawing
    }
  };

  // Save the drawing as an image to Firebase Storage
  const handlePost = async () => {
    const svg = `<svg width="300" height="400">${paths
      .map(
        ({ path, color, width }) =>
          `<path d="${path}" stroke="${color}" stroke-width="${width}" fill="none" />`
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

          const submissionObj: any = {
            photoURL: downloadURL,
            prompt: "Draw something",
            creatorId: (user as any).uid || "anonymous",
            submittedAt: new Date(),
            comments: [],
          };

          //add if if applicable
          if (id) {
            submissionObj.contestId = id;
          }

          // MAKE A POST TO THE NODE API
          fetch("http://localhost:8080/api/submissions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submissionObj),
          })
            .then(() => {
              // response.json();
              fetch("http://localhost:8080/api/prompt/uid", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ uid: user?.uid }),
              }).then(() => {
                router.push('/home');
              })
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

  function secondsToMinutes(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds.toFixed(0)}`;
  }

  const router = useRouter();
  useEffect(() => {
    let interval: any = null;

    async function load() { 
        await ensureAuth();
        if (!user) {
            router.push('/login');
            return;
        }

        //case of no contest, user is drawing prompt
        if (!id) {
          let startTime = new Date();
          let endTime = new Date(startTime.getTime() + 2 * 60000);
          setTimeLeft(secondsToMinutes((endTime.getTime() - startTime.getTime()) / 1000));

          interval = setInterval(() => {
            let currentTime = new Date();
            if (currentTime > endTime) {
              handlePost();
              router.push('/home');
              clearInterval(interval);
              return;
            }
            else {
              setTimeLeft(secondsToMinutes((endTime.getTime() - currentTime.getTime()) / 1000));
            }
          }, 1000);
          return;
        }

        //fetch contest stuff
        const response = await fetchWithUid('http://localhost:8080/api/contests', {}, user.uid);
        const respData = await response.json();
        console.log(respData);
        
        //they requested the wrong contest or a nonexistent one
        if (id != respData.contestId) {
            router.push('/home');
            return;
        }
        const startTime = new Date(respData.time.seconds * 1000);
        respData.time = startTime;

      const votingTime = new Date(startTime.getTime() + 500 * 60000);
      const contestEndTime = new Date(startTime.getTime() + 15 * 60000);

      let currentTime = new Date();

      //contest has not started
      if (currentTime < startTime) {
        router.push('/home');
        return;
      }
      else if (currentTime < votingTime) { //contest is in progress, let them continue
        console.log(secondsToMinutes((votingTime.getTime() - currentTime.getTime()) / 1000))
        setTimeLeft(secondsToMinutes((votingTime.getTime() - currentTime.getTime()) / 1000));
      }
      else if (currentTime < contestEndTime) { //voting has started
        router.push('/voting');
        return;
      }
      else { //contest has ended
        router.push('/home');
        return;
      }

        // //check time and update accordingly
        interval = setInterval(() => {
            let currentTime = new Date();

        //contest has not started
        if (currentTime < startTime) {
          router.push('/home');
          clearInterval(interval);
        }
        else if (currentTime < votingTime) { //contest is in progress
          setTimeLeft(secondsToMinutes((votingTime.getTime() - currentTime.getTime()) / 1000));
        }
        else if (currentTime < contestEndTime) { //voting has started
          if (((currentTime as any) - (votingTime as any)) > 2000) {
            handlePost();
          }
          router.push('/voting');
          clearInterval(interval);
        }
        else { //contest has ended
          router.push('/home');
          clearInterval(interval);
        }
      }, 1000);

      //clear interval on un-mount
      return () => clearInterval(interval);
    }
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timeLeftText}>Time left: {timeLeft}</Text>
      {/* Color Picker (Circles) */}
      <View style={styles.colorPickerContainer}>
        {colorOptions.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorCircle, { backgroundColor: color }]}
            onPress={() => setStrokeColor(color)} // Set selected color
          />
        ))}
      </View>
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
          {paths.map(({ path, color, width }, index) => (
            <Path
              key={index}
              d={path}
              stroke={color}
              strokeWidth={width}
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePost} style={styles.button}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearCanvas} style={styles.button}>
          <Text style={styles.buttonText}>Clear Canvas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={undoDrawing} style={styles.button}>
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeLeftText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10
  },
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
  colorPickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
    width: "98%",
  },
  colorCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    margin: 5,
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#GGG',
    fontWeight: 'bold',
  },
});
