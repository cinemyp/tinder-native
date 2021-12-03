import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStoreon } from 'storeon/react';
import ChatApi from '../api/ChatApi';
import ImagesApi from '../api/ImagesApi';
import { Dialog } from '../components/Dialog/Dialog';
import { EmptyMessengerView } from '../components/EmptyViews/EmptyMessengerView';

const LATEST_MESSAGE_DEFAULT = 'New Dialog';

export default function MessengerScreen({ navigation }) {
  const [dialogs, setDialogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = ChatApi.dialogListener(setDialogs, loading, setLoading);
    return () => unsubscribe();
  }, []);

  const handlePressDialog = (item) => {
    navigation.navigate('Dialog', { dialog: item });
  };
  const handlePressAvatarDialog = (participant) => {
    navigation.navigate('Profile', { profile: participant });
  };

  if (dialogs.length === 0) return <EmptyMessengerView />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.fullHeight}>
        {dialogs.map(({ _id, latestMessage, participant }) => {
          return (
            <Dialog
              key={_id}
              name={participant.name}
              message={
                latestMessage ? latestMessage.text : LATEST_MESSAGE_DEFAULT
              }
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
