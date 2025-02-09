import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const VotingProcessScreen = () => {
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const images = [
    'https://via.placeholder.com/150?text=Image1',
    'https://via.placeholder.com/150?text=Image2',
    'https://via.placeholder.com/150?text=Image3',
  ];

  const times = ['12:00 PM', '3:00 PM', '6:00 PM'];

  const handleImageSelection = (image) => {
    setSelectedImage(image);
    setStep(2);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setStep(3);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vote for the Best Option</Text>
      </View>
      <View style={styles.content}>
        {step === 1 && (
          <>
            <Text style={styles.prompt}>Choose an image:</Text>
            <View style={styles.optionContainer}>
              {images.map((image, index) => (
                <TouchableOpacity key={index} onPress={() => handleImageSelection(image)}>
                  <Image source={{ uri: image }} style={styles.image} />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
        {step === 2 && (
          <>
            <Text style={styles.prompt}>Choose a time:</Text>
            <View style={styles.optionContainer}>
              {times.map((time, index) => (
                <TouchableOpacity key={index} onPress={() => handleTimeSelection(time)} style={styles.button}>
                  <Text style={styles.buttonText}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
        {step === 3 && (
          <Text style={styles.thankYouText}>Thank you for voting!</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    color: '#ffffff',
  },
  header: {
    alignItems: 'center',
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    backgroundColor: '#1f1f1f',
    paddingVertical: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  prompt: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
  },
  button: {
    backgroundColor: '#1f1f1f',
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
  },
  thankYouText: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default VotingProcessScreen;
