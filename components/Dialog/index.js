import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

export const Dialog = ({ avatar, name, message }) => {
  return (
    <ListItem
      leftAvatar={{ source: avatar, size: "large" }}
      title={name}
      titleStyle={styles.title}
      subtitle={message}
      subtitleStyle={styles.subtitle}
    >
      <Avatar source={{ uri: avatar }} size={"large"} rounded />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{name}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>{message}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#3F3F3F",
  },
  subtitle: {
    color: "#A5A5A5",
  },
});
