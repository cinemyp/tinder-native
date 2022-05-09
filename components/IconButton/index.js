import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';

export const IconButton = ({
  containerStyle,
  buttonStyle,
  iconName,
  iconSize,
  iconColor,
  onPress,
  background,
}) => {
  const divide = iconSize / 2.2;
  const styles = StyleSheet.create({
    wrapper: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    background: {
      backgroundColor: 'white',
      width: divide,
      height: divide,
      bottom: divide,
      right: divide,
      position: 'absolute',
      zIndex: -5,
    },
  });
  return (
    <View style={styles['wrapper']}>
      <Button
        icon={<Ionicons name={iconName} size={iconSize} color={iconColor} />}
        containerStyle={containerStyle}
        buttonStyle={buttonStyle}
        type={'clear'}
        onPress={onPress}
      />
      {background && <View style={styles['background']} />}
    </View>
  );
};
