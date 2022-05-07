import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  DEACTIVATE_COLOR,
  PRIMARY_COLOR,
  SECOND_COLOR,
} from '../../constants/colors';
import { Button, Input } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';

export const RegistrationBirthday = ({ data, onChange, next }) => {
  const [disabled, setDisabled] = React.useState(true);

  const [day, setDay] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');

  const [dayError, setDayError] = React.useState('');
  const [monthError, setMonthError] = React.useState('');
  const [yearError, setYearError] = React.useState('');

  const dayInput = React.createRef();
  const monthInput = React.createRef();
  const yearInput = React.createRef();

  const handleChangeDay = (text) => {
    setDayError(false);
    if (text.length >= 2) {
      monthInput.current.focus();
    }
    setDay(text);
  };

  const handleChangeMonth = (text) => {
    setMonthError(false);
    if (text.length === 2) {
      yearInput.current.focus();
    } else if (text.length === 0) {
      dayInput.current.focus();
    }
    setMonth(text);
  };
  const handleChangeYear = (text) => {
    if (text.length === 0) {
      monthInput.current.focus();
    }
    setYear(text);
  };

  const handleSubmit = () => {
    let submit = true;
    if (+day > 31 || +day === 0) {
      setDayError(true);
      submit = false;
    }
    if (+month > 12 || +month === 0) {
      setMonthError(true);
      submit = false;
    }
    if (submit) {
      const data = new Date(year, month, day);
      onChange(data, 'birthday');
      next();
    }
  };

  React.useEffect(() => {
    if (day.length === 2 && month.length === 2 && year.length === 4) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [day, month, year]);

  return (
    <View style={styles['container']}>
      <Text style={styles['registerText']}>My birthday is</Text>
      <View style={{ flexDirection: 'row' }}>
        <Input
          autoFocus
          ref={dayInput}
          onChangeText={handleChangeDay}
          value={day}
          maxLength={2}
          keyboardType={'number-pad'}
          returnKeyType={'next'}
          inputStyle={styles['input']}
          containerStyle={styles['dayContainer']}
          placeholder={'DD'}
          errorMessage={dayError && 'Wrong!'}
          errorStyle={styles['error']}
        />
        <Input
          ref={monthInput}
          onChangeText={handleChangeMonth}
          maxLength={2}
          value={month}
          keyboardType={'number-pad'}
          returnKeyType={'next'}
          containerStyle={styles['monthContainer']}
          inputStyle={styles['input']}
          errorStyle={styles['error']}
          errorMessage={monthError && 'Wrong!'}
          placeholder={'MM'}
        />
        <Input
          ref={yearInput}
          onChangeText={handleChangeYear}
          value={year}
          keyboardType={'number-pad'}
          maxLength={4}
          inputStyle={styles['input']}
          containerStyle={styles['yearContainer']}
          errorStyle={styles['error']}
          errorMessage={yearError && 'Wrong!'}
          placeholder={'YYYY'}
        />
      </View>

      {/* <TextInputMask
        type={'datetime'}
        options={{
          format: 'DD/MM/YYYY',
        }}
        placeholder={'DD/MM/YYYY'}
        value={data.birthday}
        onChangeText={handleChangeText}
        style={{
          height: 50,
          width: 200,
          fontSize: 24,
        }}
        maxLength={10}
      /> */}
      <View style={styles['doneBtnContainer']}>
        <Button
          title={'Next'}
          buttonStyle={styles['doneBtn']}
          onPress={handleSubmit}
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
  dayContainer: {
    maxWidth: 100,
  },
  monthContainer: {
    maxWidth: 100,
  },
  yearContainer: {
    maxWidth: 100,
  },
  input: {
    fontSize: 24,
    textAlign: 'center',
  },
  error: {
    textAlign: 'center',
  },
});
