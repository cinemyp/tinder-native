import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  DEACTIVATE_COLOR,
  PRIMARY_COLOR,
  SECOND_COLOR,
} from '../../constants/colors';
import { Button, Input } from 'react-native-elements';

export const RegistrationName = ({ data, onChangeName, next }) => {
  const [disabled, setDisabled] = React.useState(true);

  const handleChangeText = (text) => {
    if (text.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    onChangeName(text);
  };

  return (
    <View style={styles['container']}>
      <Text style={styles['registerText']}>My first name is</Text>
      <Input
        onChangeText={handleChangeText}
        value={data.name}
        placeholder={'First Name'}
        containerStyle={styles['input']}
        maxLength={40}
      />
      <View style={styles['doneBtnContainer']}>
        <Button
          title={'Next'}
          buttonStyle={styles['doneBtn']}
          onPress={next}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    height: '100%',
  },
  registerText: {
    color: 'black',
    fontWeight: '300',
    fontSize: 36,
  },
  doneBtnContainer: {
    width: '70%',
    marginBottom: 100,
  },
  doneBtn: {
    borderRadius: 30,
    backgroundColor: PRIMARY_COLOR,
    height: 50,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
  input: {
    maxWidth: '80%',
  },
});
