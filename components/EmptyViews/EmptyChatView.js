import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const EmptyChatView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.emptyText}>There are no messages</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    transform: [{ scaleY: -1 }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});
