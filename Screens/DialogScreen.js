import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

import { BackHandler } from 'react-native';

import { useStoreon } from 'storeon/react';
import { EmptyChatView } from '../components/EmptyViews/EmptyChatView';
import { PRIMARY_COLOR } from '../constants/colors';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const DialogScreen = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);

  const { dialog, socket } = route.params;
  const { currentUser } = useStoreon('currentUser');

  const handleSend = useCallback((messages = []) => {
    const text = messages[0].text;
    socket.emit('msg:send', dialog._id, currentUser._id, text);
  }, []);

  const handleGoBack = () => {
    socket.emit('dialogs', currentUser._id);
  };

  useEffect(async () => {
    socket.emit('msg:get', dialog._id);
    socket.on('msg:update', (msgs) => {
      setMessages(msgs);
    });
    const listener = navigation.addListener('beforeRemove', handleGoBack);
    return () => {
      return listener;
    };
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => handleSend(messages)}
      user={{
        _id: currentUser._id,
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
export default DialogScreen;
