import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';

export const IconButton = ({
  containerStyle,
  iconName,
  iconSize,
  iconColor,
  onPress,
  background,
}) => {
  return (
    <View style={styles['wrapper']}>
      <Button
        icon={<Ionicons name={iconName} size={iconSize} color={iconColor} />}
        containerStyle={containerStyle}
        type={'clear'}
        onPress={onPress}
      />
      {background && <View style={styles['background']} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  background: {
    backgroundColor: 'white',
    width: 25,
    height: 25,
    bottom: 0,
    right: 0,
    position: 'absolute',
  },
});
