import React, { useEffect } from 'react';
import { auth } from '../firebase';
import { useStoreon } from 'storeon/react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Layout from '../constants/Layout';
import { getUserAge } from '../utils/date';
import LoadingView from '../components/LoadingView';

export default function MyProfileScreen({
  onPressSettings,
  onPressEdit,
  navigation,
}) {
  const { currentUser } = useStoreon('currentUser');
  const { name, birthdayDate } = currentUser;
  const [loading, setLoading] = React.useState(false);

  const age = getUserAge(birthdayDate?.seconds ?? 0);

  const handlePressLogout = () => {
    //TODO: заменить на апи метод
    auth
      .signOut()
      .then(() => {})
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: currentUser.avatarUrl,
          }}
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoadEnd={() => {
            setLoading(false);
          }}
        />
        {loading && <LoadingView />}
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
    position: 'relative',
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
