import React, { useState } from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import Slider from '@react-native-community/slider';

export default function DrawPage() {
    const [paths, setPaths] = useState<Array<{ path: string, color: string, width: number }>>([]); // Store drawn paths with color and width
    const [currentPath, setCurrentPath] = useState<string>(""); // Path being drawn
    const [strokeColor, setStrokeColor] = useState<string>("#FF0000"); // Default color (Red)
    const [strokeWidth, setStrokeWidth] = useState<number>(5); // Default brush size

    // Predefined color options
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
            setPaths([...paths, { path: currentPath, color: strokeColor, width: strokeWidth }]); // Add new path with color and width
            setCurrentPath(""); // Reset current path for the next drawing
        }
    };

    // Post the drawing (Log paths to console)
    const handlePost = () => {
        console.log("Posted Drawing Paths:", paths);
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

            <View
                style={styles.canvas}
                onStartShouldSetResponder={() => true} // Enable touch events
                onResponderStart={handleTouchStart} // Start drawing
                onResponderMove={handleTouchMove} // Continue drawing
                onResponderEnd={handleTouchEnd} // End drawing
            >
                <Svg width="300" height="400">
                    {paths.map((pathData, index) => (
                        <Path
                            key={index}
                            d={pathData.path}
                            stroke={pathData.color} // Apply color from stored path data
                            strokeWidth={pathData.width} // Apply stroke width from stored path data
                            fill="none"
                        />
                    ))}
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
                <TouchableOpacity style={styles.button} onPress={handlePost}>
                    <Text style={styles.buttonText}>Post</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={clearCanvas}>
                    <Text style={styles.buttonText}>Clear Canvas</Text>
                </TouchableOpacity>
                {/* <Button title="Clear Canvas" onPress={clearCanvas} /> */}
                <TouchableOpacity style={styles.button} onPress={undoDrawing}>
                    <Text style={styles.buttonText}>Undo</Text>
                </TouchableOpacity>
                {/* <Button title="Undo" onPress={undoDrawing} /> */}
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
    colorPickerContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 20,
        width: "80%",
    },
    colorCircle: {
        width: 40,
        height: 40,
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
