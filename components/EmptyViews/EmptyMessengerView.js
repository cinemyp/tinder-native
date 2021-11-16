import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export const EmptyMessengerView = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emptyText}>There are no dialogs</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});
