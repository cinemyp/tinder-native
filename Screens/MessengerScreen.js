import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStoreon } from 'storeon/react';
import ChatApi from '../api/ChatApi';
import { Dialog } from '../components/Dialog/Dialog';
import { EmptyMessengerView } from '../components/EmptyViews/EmptyMessengerView';
import socketClient from 'socket.io-client';
import { SERVER_URL } from '../constants';

const LATEST_MESSAGE_DEFAULT = 'New Dialog';

export default function MessengerScreen({ navigation }) {
  const { currentUser } = useStoreon('currentUser');
  const [dialogs, setDialogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const socket = socketClient(SERVER_URL, {
    query: {
      userId: currentUser._id,
    },
  });

  useEffect(() => {
    socket.on('user dialogs', (data) => {
      setDialogs(data);
    });
    const unsubscribe = navigation.addListener('focus', () => {
      socket.emit('dialogs', currentUser._id);
    });
    return () => {
      socket.off();
      return unsubscribe;
    };
  }, []);

  const handlePressDialog = (item) => {
    navigation.navigate('Dialog', {
      dialog: item,
      socket: socket,
      title: '123',
    });
  };
  const handlePressAvatarDialog = (participant) => {
    // navigation.navigate('Profile', { profile: participant });
  };

  if (dialogs.length === 0) return <EmptyMessengerView />;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.fullHeight}>
        {dialogs.map(({ _id, latestMessage, participant }) => {
          const isNotEmpty = !!latestMessage;

          return (
            <Dialog
              key={_id}
              name={participant.name}
              message={isNotEmpty ? latestMessage.text : LATEST_MESSAGE_DEFAULT}
              isNew={!isNotEmpty}
              onPressDialog={() =>
                handlePressDialog({ _id, latestMessage, participant })
              }
              onPressAvatarDialog={() => handlePressAvatarDialog(participant)}
              avatar={participant?.thumbnailUrl}
            />
          );
        })}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fullHeight: {
    height: '100%',
  },
});
