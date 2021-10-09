import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-deck-swiper";
import { Card } from "../components/Card";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        cards={[
          {
            pic: {},
            title: "Amelia, 27",
            caption: "16 miles away",
          },
          {
            pic: "https://unsplash.com/photos/rDEOVtE7vOs",
            title: "Joanna, 19",
            caption: "2 miles away",
          },
          {
            pic: "",
            title: "Charlie, 32",
            caption: "24 miles away",
          },
          {
            pic: "",
            title: "Mary, 23",
            caption: "45 miles away",
          },
        ]}
        renderCard={Card}
        infinite
        backgroundColor="white"
        cardHorizontalMargin={0}
        stackSize={2}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
