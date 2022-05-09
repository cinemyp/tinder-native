import React, { useEffect, useState } from 'react';
import { useStoreon } from 'storeon/react';
import AuthApi from '../api/AuthApi';
import ImageApi from '../api/ImagesApi';
import MusicApi from '../api/MusicApi';

import { LazyImage } from '../components/LazyImage';
import { ArtistProfile } from '../components/ArtistProfile';
import LoadingView from '../components/LoadingView';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import { openImagePickerAsync } from '../utils/images';
import { SERVER_URL } from '../constants';
import { compareArrays } from '../utils';
import { TopArtists } from '../components/MusicStats';

const EditButton = ({ onPressEdit }) => (
  <View style={styles['editButton']}>
    <Button
      icon={<Ionicons name={'pencil-sharp'} size={42} color={'#4E4E4E'} />}
      type={'clear'}
      onPress={onPressEdit}
    />
  </View>
);

const DEFAULT_TOP_ARTISTS = [{}, {}, {}];

export default function MyProfileScreen({ navigation }) {
  const { currentUser, dispatch } = useStoreon('currentUser');
  const { _id, name, age } = currentUser;

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
            uri: `${SERVER_URL + currentUser.avatar}`,
          }}
          style={{ width: 250, height: 250, borderRadius: 125 }}
          resizeMode={'cover'}
        />
        <EditButton onPressEdit={handlePressEdit} />
      </View>
      <Text h2 style={styles.name}>
        {name}, {age}
      </Text>
      <View style={styles['musicStat']}>
        <TopArtists uid={currentUser.yandexId} title={'My Top Artists'} />
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
  musicStat: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 20,
    width: '100%',
  },
});
