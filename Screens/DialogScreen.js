import React, { useCallback, useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import { StyleSheet } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { EmptyChatView } from '../components/EmptyViews/EmptyChatView';
import { PRIMARY_COLOR } from '../constants/colors';
import { useStoreon } from 'storeon/react';
import ChatApi from '../api/ChatApi';

export default DialogScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);

  const { dialog } = route.params;
  const { currentUser } = useStoreon('currentUser');

  const handleSend = useCallback((messages = []) => {
    const { uid } = auth.currentUser;
    const text = messages[0].text;

    ChatApi.sendMessage(text, dialog, currentUser);
  }, []);

  useEffect(() => {
    const messageListener = ChatApi.messagesHandler(dialog, setMessages);
    return () => messageListener();
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => handleSend(messages)}
      user={{
        _id: auth.currentUser.uid,
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
