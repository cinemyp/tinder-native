import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dialog } from '../components/Dialog/Dialog';
import { auth, firestore } from '../firebase';

export default function MessengerScreen({ navigation }) {
  const messages = [
    {
      id: 0,
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'Amelia, 27',
      message: "Let's get to your favorite restaurant.",
    },
    {
      id: 1,
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'Amelia, 27',
      message: "Let's get to your favorite restaurant.",
    },
    {
      id: 2,
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'Amelia, 27',
      message: "Let's get to your favorite restaurant.",
    },
    {
      id: 3,
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'Amelia, 27',
      message: "Let's get to your favorite restaurant.",
    },
  ];

  const [dialogs, setDialogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { uid } = auth.currentUser;
    console.log(uid);
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

  useEffect(() => {
    console.log(dialogs);
  }, [dialogs]);

  const handlePressDialog = (item) => {
    navigation.navigate('Dialog', { dialog: item });
  };
  const handlePressAvatarDialog = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.fullHeight}>
        {dialogs.map(({ _id, latestMessage, user }) => (
          <Dialog
            key={_id}
            avatar={''}
            name={user.name}
            message={latestMessage.text}
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
