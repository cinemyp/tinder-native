import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dialog } from '../components/Dialog/Dialog';
import { EmptyMessengerView } from '../components/EmptyViews/EmptyMessengerView';
import { auth, firestore } from '../firebase';

const LATEST_MESSAGE_DEFAULT = 'New Dialog';

export default function MessengerScreen({ navigation }) {
  const [dialogs, setDialogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { uid } = auth.currentUser;
    const unsubscribe = firestore
      .collection('dialogs')
      .doc(uid)
      .collection('userDialogs')
      .onSnapshot((querySnapshot) => {
        const dialogs = querySnapshot.docs.map((documentSnapshot) => ({
          _id: documentSnapshot.id,
          ...documentSnapshot.data(),
        }));
        setDialogs(dialogs);

        if (loading) {
          setLoading(false);
        }
      });
    return () => unsubscribe();
  }, []);

  const handlePressDialog = (item) => {
    navigation.navigate('Dialog', { dialog: item });
  };
  const handlePressAvatarDialog = () => {
    navigation.navigate('Profile');
  };

  if (dialogs.length === 0) return <EmptyMessengerView />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.fullHeight}>
        {dialogs.map(({ _id, latestMessage, user }) => (
          <Dialog
            key={_id}
            avatar={''}
            name={user.name}
            message={
              latestMessage ? latestMessage.text : LATEST_MESSAGE_DEFAULT
            }
            onPressDialog={() =>
              handlePressDialog({ _id, latestMessage, user })
            }
            onPressAvatarDialog={handlePressAvatarDialog}
          />
        ))}
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
