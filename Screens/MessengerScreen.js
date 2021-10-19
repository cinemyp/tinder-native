import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dialog } from "../components/Dialog/Dialog";

export default function MessengerScreen({ navigation }) {
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

  const handlePressDialog = () => {
    //TODO: передать данные в Store
    navigation.navigate("Dialog");
  };
  const handlePressAvatarDialog = () => {
    //TODO: передать данные в Store
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.fullHeight}>
        {messages.map(({ id, avatar, name, message }) => (
          <Dialog
            key={id}
            avatar={avatar}
            name={name}
            message={message}
            onPressDialog={handlePressDialog}
            onPressAvatarDialog={handlePressAvatarDialog}
          />
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fullHeight: {
    height: "100%",
  },
});
