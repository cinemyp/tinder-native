import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { PRIMARY_COLOR } from '../../constants/colors';

export const Dialog = ({
  avatar,
  name,
  message,
  onPressDialog,
  onPressAvatarDialog,
  isNew,
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
        <View style={styles['listItem']}>
          <ListItem.Title style={styles.title}>{name}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            {message}
          </ListItem.Subtitle>
          {isNew && <View style={styles.newMark}></View>}
        </View>
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
    position: 'relative',
  },
  subtitle: {
    color: '#A5A5A5',
  },
  newMark: {
    backgroundColor: PRIMARY_COLOR,
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    right: -15,
    top: 12,
  },
  listItem: {
    position: 'relative',
  },
});
