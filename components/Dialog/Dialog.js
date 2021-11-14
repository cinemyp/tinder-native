import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

export const Dialog = ({
  avatar,
  name,
  message,
  onPressDialog,
  onPressAvatarDialog,
}) => {
  const avatarProps = {
    title: name[0],
    size: 'large',
    rounded: true,
    onPress: onPressAvatarDialog,
  };
  if (avatar) {
    avatarProps.source = { uri: avatar };
  }

  return (
    <ListItem bottomDivider onPress={onPressDialog}>
      <Avatar {...avatarProps} titleStyle={styles.placeholder} />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{name}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>{message}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    color: 'whitesmoke',
    backgroundColor: '#a5a5a5',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    color: '#3F3F3F',
  },
  subtitle: {
    color: '#A5A5A5',
  },
});
