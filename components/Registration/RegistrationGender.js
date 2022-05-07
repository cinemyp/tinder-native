import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  DEACTIVATE_COLOR,
  PRIMARY_COLOR,
  SECOND_COLOR,
} from '../../constants/colors';
import { Button, Input, Chip } from 'react-native-elements';

const MALE = 'Male';
const FEMALE = 'Female';

export const RegistrationGender = ({ data, onChange, next }) => {
  const [disabled, setDisabled] = React.useState(true);

  const handleChange = (value) => {
    onChange(value, 'gender');
    setDisabled(false);
  };

  return (
    <View style={styles['container']}>
      <Text style={styles['registerText']}>My gender is</Text>
      <View style={styles['chips']}>
        <Chip
          title={MALE}
          titleStyle={
            data.gender === MALE ? styles['titleSelected'] : styles['title']
          }
          buttonStyle={
            data.gender === MALE ? styles['chipSelected'] : styles['chip']
          }
          type={data.gender === MALE ? 'outline' : 'solid'}
          onPress={() => handleChange(MALE)}
        />
        <Chip
          title={FEMALE}
          titleStyle={
            data.gender === FEMALE ? styles['titleSelected'] : styles['title']
          }
          buttonStyle={
            data.gender === FEMALE ? styles['chipSelected'] : styles['chip']
          }
          type={data.gender === FEMALE ? 'outline' : 'solid'}
          onPress={() => handleChange(FEMALE)}
        />
      </View>
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
  chips: {},
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
  title: {
    fontSize: 20,
    color: DEACTIVATE_COLOR,
  },
  titleSelected: {
    fontSize: 20,
    color: PRIMARY_COLOR,
  },
  chip: {
    borderColor: DEACTIVATE_COLOR,
    backgroundColor: 'transparent',
    borderWidth: 2,
    marginTop: 20,
    height: 50,
    width: 200,
  },
  chipSelected: {
    backgroundColor: 'transparent',
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    marginTop: 20,
    height: 50,
    width: 200,
  },
});
