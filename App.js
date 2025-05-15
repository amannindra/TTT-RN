import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import Home from "./Home";
import Game from "./Game";
import Settings from "./Settings";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [single, setSingle] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(false);
  const [animation, setAnimation] = useState(false);

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
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
