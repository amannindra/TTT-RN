import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { Button } from "react-native";
import { route } from "@react-navigation/native";




export default function Home({
  navigation,
  single,
  setSingle,
  darkMode,
  setDarkMode,
  animation,
  setAnimation,
  soundEffects,
  setSoundEffects
}) {


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    button: {
      backgroundColor: "#007BFF",
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      textAlign: "center",
    },
    seperateButton: {
      backgroundColor: "white",
      gap: 10,
    },
  });

  const navSingle = () => {
    setSingle(true);
    console.log("Updating to Single Player Mode");
    navigation.navigate("Game");
  };

  const navMulti = () => {
    setSingle(false);
    console.log("Updating to Two player Mode")
    navigation.navigate("Game");
  };

  

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Tic Tac Toe</Text>
        <View style={styles.seperateButton}>
          <TouchableOpacity style={styles.button} onPress={() => navSingle()}>
            <Text style={styles.buttonText}>Play with Friend</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navMulti()}>
            <Text style={styles.buttonText}>Play vs Robot</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Settings")}
          >
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}