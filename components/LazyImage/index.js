import React from 'react';
import { View } from 'react-native';

export default LazyImage = (thumbnailSource, source, styles, ...props) => {
  return (
    <View style={styles['container']}>
      <Image {...props} source={thumbnailSource} style={styles} />
    </View>
  );
};
