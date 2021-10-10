import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export const EmptyView = ({ titleReload, onReload }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emptyText}>There are no new profiles</Text>
      <Button title={titleReload} onPress={onReload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
  },
});
