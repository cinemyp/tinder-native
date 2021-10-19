import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Dialog = ({ avatar, name, message, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
      <ListItem
        title={name}
        titleStyle={styles.title}
        subtitle={message}
        subtitleStyle={styles.subtitle}
      >
        <Avatar source={{ uri: avatar }} size={"large"} rounded />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{name}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            {message}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
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
