import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import ImagesApi from '../../api/ImagesApi';

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
      <Avatar
        {...avatarProps}
        avatarStyle={styles['avatar']}
        titleStyle={styles['titleStyle']}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{name}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>{message}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    color: 'whitesmoke',
  },
  avatar: {
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    color: '#3F3F3F',
  },
  subtitle: {
    color: '#A5A5A5',
  },
});
