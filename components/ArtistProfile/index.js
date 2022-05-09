import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export const ArtistProfile = ({ uri, name = '', load }) => {
  const shown = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(shown, {
        toValue: 1,
        duration: 1000,
        delay: 100,
        easing: Easing.cubic,
        useNativeDriver: false,
      })
    ).start();
  }, [shown]);

  let color = shown.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#bbb', '#ddd', '#bbb'],
  });

  return (
    <View style={styles['wrapper']}>
      <Animated.Image
        source={{
          uri: uri,
        }}
        style={{ ...styles['avatar'], backgroundColor: color }}
      />

      {load ? (
        <Animated.View
          style={{ ...styles['nameLoading'], backgroundColor: color }}
        />
      ) : (
        <Text style={styles['name']}>{name}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, alignItems: 'center' },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  name: { marginTop: 5 },
  nameLoading: { marginTop: 5, width: 80, height: 16 },
});
