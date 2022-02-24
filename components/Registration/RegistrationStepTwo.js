import React from 'react';
import { TextInput, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

export const RegistrationStepTwo = ({ setState, next, values, styles }) => {
  const handleChangeDate = (event, selectedDate) => {
    setState((prevState) => ({ ...prevState, date: selectedDate }));
  };
  return (
    <>
      <Text h4>Choose your birthday</Text>
      <View style={styles['dateContainer']}>
        <DateTimePicker
          mode={'date'}
          value={values.date}
          onChange={handleChangeDate}
          display={'spinner'}
        />
      </View>
      <View style={styles['buttonContainer']}>
        <Button
          title={'Go next'}
          buttonStyle={styles['button']}
          onPress={next}
        />
      </View>
    </>
  );
};
