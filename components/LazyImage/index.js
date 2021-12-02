import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Image } from 'react-native-elements';

export const LazyImage = ({ source, thumbnailSource, style, ...props }) => {
  let thumbnailAnimated = new Animated.Value(0);
  let imageAnimated = new Animated.Value(0);
  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
    }).start();
  };
  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
    }).start();
  };
  return (
    <View style={styles['container']}>
      <Image {...props} source={source} style={style} onLoad={onImageLoad} />
      <Image
        {...props}
        source={thumbnailSource}
        onLoad={handleThumbnailLoad}
        blurRadius={1}
        style={[styles.imageOverlay, style]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#e1e4e8',
  },
});
