// Timer.js
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const Timer = ({ duration, onTimeEnd }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          onTimeEnd(); // Trigger callback when time is up
          return 0;
        }
        return prevTime - 1000; // Decrease time by 1 second
      });
    }, 1000);

    return () => clearInterval(timer); // Clean up on component unmount
  }, [duration, onTimeEnd]);

  return (
    <View>
      <Text>Time remaining: {Math.max(0, Math.floor(timeRemaining / 1000))} seconds</Text>
    </View>
  );
};

export default Timer;
