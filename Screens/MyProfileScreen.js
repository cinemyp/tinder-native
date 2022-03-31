import React, { useEffect, useState } from 'react';
import { useStoreon } from 'storeon/react';
import { getUserAge } from '../utils/date';
import AuthApi from '../api/AuthApi';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Layout from '../constants/Layout';
import { LazyImage } from '../components/LazyImage';
import { openImagePickerAsync } from '../utils/images';
import LoadingView from '../components/LoadingView';
import ImageApi from '../api/ImagesApi';

const EditButton = ({ onPressEdit }) => (
  <View style={styles['editButton']}>
    <Button
      icon={<Ionicons name={'pencil-sharp'} size={42} color={'#4E4E4E'} />}
      type={'clear'}
      onPress={onPressEdit}
    />
  </View>
);

export default function MyProfileScreen({ navigation }) {
  const { currentUser, dispatch } = useStoreon('currentUser');
  const { _id, name, age, birthdayDate, avatar, thumbnailId } = currentUser;
  const [loading, setLoading] = useState(false);

  const handlePressLogout = () => {
    AuthApi.signOut(dispatch);
  };
  const handlePressEdit = async () => {
    const result = await openImagePickerAsync();
    if (!result) {
      return;
    }
    setLoading(true);
    await ImageApi.updateImage(result.avatarUri, _id);

    dispatch('user/get');
    setLoading(false);
    // await ImagesApi.updateAvatar(
    //   id,
    //   avatarId,
    //   result.avatarUri,
    //   thumbnailId,
    //   result.thumbnailUri
    // );
  };

  useEffect(() => {
    if (currentUser.name) return;
    setLoading(true);

    dispatch('user/get');
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LoadingView show={loading} />
      <View style={styles.imageContainer}>
        <LazyImage
          thumbnailSource={{ uri: currentUser.thumbnailUrl }}
          source={{
            uri: `http://192.168.0.17:8000${currentUser.avatar}`,
          }}
          style={{ width: 250, height: 250, borderRadius: 125 }}
          resizeMode={'cover'}
        />
        <EditButton onPressEdit={handlePressEdit} />
      </View>
      <Text h2 style={styles.name}>
        {name}, {age}
      </Text>
      <View style={styles.buttons}>
        {/*  <Button
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
        />*/}
      </View>
      <Button
        title={'Log out'}
        onPress={handlePressLogout}
        type={'clear'}
        titleStyle={styles['logOut']}
      />
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
  logOut: {
    color: 'red',
  },
  editButton: {
    position: 'absolute',
    bottom: -10,
    right: 0,
    backgroundColor: '#d5d5d5',
    borderRadius: 10,
  },
});
