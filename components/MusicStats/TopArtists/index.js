import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ArtistProfile } from '../../ArtistProfile';
import { compareArrays } from '../../../utils';

import * as WebBrowser from 'expo-web-browser';

import MusicApi from '../../../api/MusicApi';
import { Text, Button } from 'react-native-elements';

export const DEFAULT_TOP_ARTISTS = [{}, {}, {}];

export default TopArtists = ({ title = 'Top Artists', uid }) => {
  const [loadingArtists, setLoadingArtists] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [artists, setArtists] = React.useState(DEFAULT_TOP_ARTISTS);

  const handlePressOpenSettings = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      'https://music.yandex.ru/settings/other',
      'exp://localhost:19000'
    );
    loadArtists();
  };

  const loadArtists = () => {
    setLoadingArtists(true);
    setError(false);
    MusicApi.getTopArtists(uid).then((data) => {
      console.log(data);
      if (data.status !== false) {
        setArtists(data);
        setError(false);
      } else {
        setError(true);
      }
      setLoadingArtists(false);
    });
  };

  React.useEffect(() => {
    if (compareArrays(artists, DEFAULT_TOP_ARTISTS)) {
      loadArtists();
    }
  }, []);

  return (
    <View style={styles['topArtistsWrapper']}>
      <Text h4>{title}</Text>
      {error ? (
        <>
          <Text style={styles['errorText']}>
            Oops! Your library is private, you need to grant access to your
            music library.
          </Text>
          <Text style={styles['errorText']}>
            Press Open Settings, change value of accessability and go back.
          </Text>
          <Button
            title={'Open Settings'}
            type={'clear'}
            onPress={handlePressOpenSettings}
          />
        </>
      ) : (
        <View style={styles['topArtists']}>
          {artists &&
            artists.map((artist, index) => (
              <ArtistProfile
                key={artist.id || index}
                uri={artist.uri}
                name={artist.name}
                load={loadingArtists}
              />
            ))}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  topArtistsWrapper: {},
  topArtists: {
    marginTop: 15,
    flexDirection: 'row',
  },
  errorText: {
    fontSize: 18,
    marginTop: 5,
    paddingHorizontal: 10,
  },
});
