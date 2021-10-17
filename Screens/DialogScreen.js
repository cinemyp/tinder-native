import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { EmptyChatView } from "../components/EmptyViews/EmptyChatView";

export default DialogScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      messagesContainerStyle={styles.messagesContainer}
      renderBubble={(props) => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: { backgroundColor: "#fcb9b8" },
              left: { backgroundColor: "#eee" },
            }}
          />
        );
      }}
      renderChatEmpty={EmptyChatView}
      inverted={false}
      alwaysShowSend
    />
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
  messagesContainer: {
    backgroundColor: "#fff",
  },
});
