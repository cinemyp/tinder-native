import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Message = ({ name, message, own }) => {
  return (
    <View style={[styles.container, own ? styles.own : ""]}>
      <Text style={[styles.message, own ? styles.ownText : ""]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 15,
    flex: 1,
    marginTop: 15,
    alignSelf: "flex-start",
  },
  own: {
    alignSelf: "flex-end",
    backgroundColor: "#fcb9b8",
  },
  ownText: {
    color: "#fff",
  },
  name: {
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    letterSpacing: 0.3,
  },
});
