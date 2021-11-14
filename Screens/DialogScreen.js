import React, { useCallback, useEffect, useState } from 'react';
import { database } from '../firebase';
import { StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { EmptyChatView } from '../components/EmptyViews/EmptyChatView';
import { PRIMARY_COLOR } from '../constants/colors';

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
              right: { backgroundColor: PRIMARY_COLOR },
              left: { backgroundColor: '#eee' },
            }}
          />
        );
      }}
      renderChatEmpty={EmptyChatView}
      inverted={true}
      bottomOffset={getBottomSpace()}
    />
  );
};
const styles = StyleSheet.create({
  messagesContainer: {
    backgroundColor: '#fff',
  },
});
