import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native-elements';
import LoadingView from '../LoadingView';

export const ArtistProfile = ({ uri, name = '', load }) => {
  return (
    <View style={styles['wrapper']}>
      <Image
        source={{
          uri: uri,
        }}
        style={styles['avatar']}
      />

      {load ? (
        <View style={styles['nameLoading']} />
      ) : (
        <Text style={styles['name']}>{name}</Text>
      )}
      <LoadingView show={load} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, alignItems: 'center' },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: { marginTop: 5 },
  nameLoading: { marginTop: 5, backgroundColor: '#ddd', width: 80, height: 16 },
});
