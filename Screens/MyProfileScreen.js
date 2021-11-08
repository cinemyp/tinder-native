import React, { useEffect } from 'react';
import { auth } from '../firebase';
import { useStoreon } from 'storeon/react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Layout from '../constants/Layout';

export default function MyProfileScreen({
  age = 25,
  onPressSettings,
  onPressEdit,
  navigation,
}) {
  const { dispatch, currentUser } = useStoreon('currentUser');
  const { name } = currentUser;
  const handlePressLogout = () => {
    //TODO: заменить на апи метод
    auth
      .signOut()
      .then(() => {})
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    dispatch('user/get');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: currentUser.avatarUrl,
          }}
        />
      </View>
      <Text h2 style={styles.name}>
        {name}, {age}
      </Text>
      <View style={styles.buttons}>
        <Button
          icon={<Ionicons name={'settings'} size={42} color={'#4E4E4E'} />}
          iconPosition={'top'}
          title={'settings'.toUpperCase()}
          titleStyle={{ color: '#5e5e5e', fontSize: 12 }}
          type={'clear'}
          onPress={onPressSettings}
        />
        <Button
          icon={<Ionicons name={'pencil-sharp'} size={42} color={'#4E4E4E'} />}
          iconPosition={'top'}
          title={'edit'.toUpperCase()}
          titleStyle={{ color: '#5e5e5e', fontSize: 12 }}
          type={'clear'}
          onPress={onPressEdit}
        />
      </View>
      <Button title={'logout'.toUpperCase()} onPress={handlePressLogout} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  profileWrapper: {
    flex: 1,
    width: '100%',
  },
  imageContainer: {
    margin: 20,
  },
  name: {
    color: '#000',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    width: Layout.window.width - 100,
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
