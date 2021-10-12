import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dialog } from "../components/Dialog";

export default function MessengerScreen() {
  const messages = [
    {
      id: 0,
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      name: "Amelia, 27",
      message: "Let's get to your favorite restaurant.",
    },
    {
      id: 1,
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      name: "Amelia, 27",
      message: "Let's get to your favorite restaurant.",
    },
    {
      id: 2,
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      name: "Amelia, 27",
      message: "Let's get to your favorite restaurant.",
    },
    {
      id: 3,
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      name: "Amelia, 27",
      message: "Let's get to your favorite restaurant.",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ height: "100%" }}>
        {messages.map(({ id, avatar, name, message }) => (
          <Dialog key={id} avatar={avatar} name={name} message={message} />
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
