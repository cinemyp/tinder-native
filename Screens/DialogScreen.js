import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, ListItem } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Message } from "../components/Dialog/Message";

export default DialogScreen = () => {
  const messages = [
    { id: "0", name: "Alex", message: "123", own: false, dateTime: "" },
    { id: "1", name: "Alex", message: "Hello", own: false, dateTime: "" },
    { id: "2", name: "Alex", message: "Good", own: true, dateTime: "" },
    { id: "3", name: "Alex", message: "123", own: false, dateTime: "" },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message key={item.id} {...item} />}
      />
      <Input
        placeholder={"Type your message here..."}
        containerStyle={styles.input}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
  },
  fullHeight: {
    height: "100%",
  },
  input: {},
});
