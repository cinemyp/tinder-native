import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Tile } from 'react-native-elements';
import Layout from '../../constants/Layout';
import { getUserAge } from '../../utils/date';

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49;

export const Card = ({
  name,
  avatarUrl,
  birthdayDate,
  age,
  caption = '16 miles away',
  onPressCard,
}) => {
  return (
    <Tile
      imageSrc={{
        uri: avatarUrl,
      }}
      imageContainerStyle={styles.imageContainer}
      title={name}
      titleStyle={styles.title}
      caption={`${age} years old`}
      captionStyle={styles.caption}
      activeOpacity={0.9}
      containerStyle={styles.container}
      featured
      onPress={onPressCard}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: Layout.window.width - 30,
    height: Layout.window.height - BOTTOM_BAR_HEIGHT * 6,
    borderRadius: 20,
    overflow: 'hidden', // this does magic
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  title: {
    position: 'absolute',
    left: 10,
    bottom: 30,
    fontSize: 34,
  },
  caption: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    fontSize: 20,
  },
});
