import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ArtistProfile } from '../../ArtistProfile';
import { compareArrays } from '../../../utils';

import * as WebBrowser from 'expo-web-browser';

import MusicApi from '../../../api/MusicApi';
import { Text, Button } from 'react-native-elements';
import { DEACTIVATE_COLOR, PRIMARY_COLOR } from '../../../constants/colors';

export const DEFAULT_TOP_ARTISTS = [{}, {}, {}];

const Genre = ({ title }) => {
  return (
    <View style={styles['genre']}>
      <Text style={styles['genreTitle']}>{title}</Text>
    </View>
  );
};

export default TopArtists = ({ title = 'Top Artists', uid }) => {
  const [loadingArtists, setLoadingArtists] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [artists, setArtists] = React.useState(DEFAULT_TOP_ARTISTS);
  const [genres, setGenres] = React.useState(null);

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
      if (data.status !== false) {
        setArtists(data.topArtists);
        setGenres(data.topGenres);
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
    <>
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
      {!loadingArtists && (
        <View style={styles['topGenresWrapper']}>
          <Text h4>Top Genres</Text>
          <View style={styles['topGenres']}>
            {genres &&
              genres.map((g) => (
                <Genre key={g?.id} title={g?.titles.en.title} />
              ))}
          </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  topArtistsWrapper: {},
  topGenresWrapper: {
    marginTop: 15,
  },
  topArtists: {
    marginTop: 15,
    flexDirection: 'row',
  },
  topGenres: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    flexWrap: 'wrap',
  },
  errorText: {
    fontSize: 18,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  genre: {
    backgroundColor: PRIMARY_COLOR,
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    marginTop: 10,
  },
  genreTitle: {
    color: 'white',
    fontSize: 20,
  },
});
