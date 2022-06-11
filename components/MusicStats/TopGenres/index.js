import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ArtistProfile } from '../../ArtistProfile';
import { compareArrays } from '../../../utils';

import * as WebBrowser from 'expo-web-browser';

import MusicApi from '../../../api/MusicApi';
import { Text, Button } from 'react-native-elements';

export const DEFAULT_TOP_GENRES = [{}, {}, {}];

export default TopGenres = ({ title = 'Top Artists', uid }) => {
  const [loadingGenres, setLoadingGenres] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [genres, setGenres] = React.useState(DEFAULT_TOP_GENRES);

  const handlePressOpenSettings = async () => {
    loadGenres();
  };

  const loadGenres = () => {
    setLoadingGenres(true);
    setError(false);
    MusicApi.getTopArtists(uid).then((data) => {
      if (data.status !== false) {
        setGenres(data.topArtists);
        setError(false);
      } else {
        setError(true);
      }
      setLoadingGenres(false);
    });
  };

  React.useEffect(() => {
    if (compareArrays(genres, DEFAULT_TOP_GENRES)) {
      loadGenres();
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
          {genres &&
            genres.map((artist, index) => (
              <ArtistProfile
                key={artist.id || index}
                uri={artist.uri}
                name={artist.name}
                load={loadingGenres}
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
