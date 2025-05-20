import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect, useRef } from "react";
import Home from "./Home";
import Game from "./Game";
import Settings from "./Settings";
import music from "./SoundEffects/music.mp3";
import { Audio } from "expo-av";


export default function App() {
  const Stack = createNativeStackNavigator();
  const [single, setSingle] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(false);
  const [animation, setAnimation] = useState(false);

  const soundRef = useRef();
  const [soundLoaded, setSoundLoaded] = useState(false);

  
  const audi = async () => {
    if (soundLoaded || soundRef.current) return; 

    console.log("Loading audio...");
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
      });

      const { sound } = await Audio.Sound.createAsync(music);
      soundRef.current = sound;
      await soundRef.current.setIsLoopingAsync(true);
      await soundRef.current.playAsync();

      setSoundLoaded(true);

    } catch (error) {
      console.log("Audio playback error:", error);
    }
  };

    const stopAudio = async () => {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        console.log("Audio playback stopped");
      }
    };
    const startAudio = async () => {
      if (soundRef.current) {
        await soundRef.current.playAsync();
        console.log("Line 53: Audio playback started");
      }
    };

  useEffect(() => {
    audi(); 
  }, []);

  useEffect(() => {
    if (soundLoaded) {
      if (soundEffects) {
        startAudio();
      } else {
        stopAudio();
      }
    }
  }, [soundEffects]);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => (
            <Home
              {...props} // <— this spreads navigation & route
              single={single}
              setSingle={setSingle}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              animation={animation}
              setAnimation={setAnimation}
              soundEffects={soundEffects}
              setSoundEffects={setSoundEffects}
              soundRef={soundRef}
              audi={audi}
              startAudio={startAudio}
              stopAudio={stopAudio}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Game">
          {(props) => (
            <Game
              {...props}
              single={single}
              setSingle={setSingle}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              animation={animation}
              setAnimation={setAnimation}
              soundEffects={soundEffects}
              setSoundEffects={setSoundEffects}
              soundRef={soundRef}
              audi={audi}
              startAudio={startAudio}
              stopAudio={stopAudio}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Settings">
          {(props) => (
            <Settings
              {...props}
              single={single}
              setSingle={setSingle}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              animation={animation}
              setAnimation={setAnimation}
              soundEffects={soundEffects}
              setSoundEffects={setSoundEffects}
              soundRef={soundRef}
              startAudio ={startAudio}
              stopAudio={stopAudio}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
