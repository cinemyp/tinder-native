import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { getBottomSpace } from "react-native-iphone-x-helper";
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
      inverted={true}
      alwaysShowSend
      bottomOffset={getBottomSpace()}
    />
  );
};
const styles = StyleSheet.create({
  messagesContainer: {
    backgroundColor: "#fff",
  },
});
