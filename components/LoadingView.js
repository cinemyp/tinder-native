import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingView = ({ show = false }) => {
  return (
    show && (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'#999999'} />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});
export default LoadingView;
