import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// Reusable ToggleSwitch component with slide animation
function ToggleSwitch({ label, value, onToggle }) {
  const slideAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  // Animate whenever the value changes
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: value ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value]);

  // The circle slides horizontally within the switch container
  const circlePosition = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.8}>
      <View style={styles.toggleRow}>
        <Text style={styles.toggleText}>{label}</Text>
        <View
          style={[
            styles.switchContainer,
            value ? styles.switchOn : styles.switchOff,
          ]}
        >
          <Animated.View
            style={[
              styles.circle,
              { transform: [{ translateX: circlePosition }] },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Settings({
  navigation,
  single,
  setSingle,
  darkMode,
  setDarkMode,
  animation,
  setAnimation,
  soundEffects,
  setSoundEffects,
  soundRef,
  audi,
  startAudio,
  stopAudio,
}) {


  const changeDarkMode = () => {
    setDarkMode(!darkMode);
    console.log(`Dark Mode: ${!darkMode}`);
  };
  const changeSoundEffects = () => {
    setSoundEffects(!soundEffects);
    console.log(`Sound Effects: ${!soundEffects}`);
   
  };
  const changeAnimation = () => {
    setAnimation(!animation);
    console.log(`Animation: ${!animation}`);
  };

  return (
    <ScrollView
      style={styles.bigContainer}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.settingsCard}>
        <ToggleSwitch
          label="Dark Mode"
          value={darkMode}
          onToggle={() => changeDarkMode()}
        />
        <ToggleSwitch
          label="Sound Effects"
          value={soundEffects}
          onToggle={() => changeSoundEffects()}
        />
        <ToggleSwitch
          label="Animations"
          value={animation}
          onToggle={() => changeAnimation()}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.goHome}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.goHomeText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Outer scrollable container with a light gray background
  bigContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  contentContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  // Header area for the settings page title
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#333",
  },
  // The card that holds all settings with a soft drop shadow
  settingsCard: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  // Style for each row that contains the toggle label and switch
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  toggleText: {
    fontSize: 18,
    color: "#333",
  },
  // Switch container
  switchContainer: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    padding: 2,
  },
  // Background for enabled state
  switchOn: {
    backgroundColor: "#34C759",
  },
  // Background for disabled state
  switchOff: {
    backgroundColor: "#ccc",
  },
  // The sliding circle inside the toggle
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  // Difficulty section styling
  difficultySection: {
    marginTop: 30,
    paddingTop: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  difficultyOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  difficultyButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  selectedButton: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  difficultyText: {
    fontSize: 16,
    color: "#333",
  },
  selectedButtonText: {
    color: "#fff",
  },

  goHome: {
    marginTop: 50,
    padding: 10,
    paddingVertical: 30,
    paddingHorizontal: 45,
    borderRadius: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  goHomeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
  },
});
