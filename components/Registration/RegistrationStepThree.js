import React, { useEffect } from 'react';
import { TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import GenderApi from '../../api/GenderApi';
import { capitalizeFirstLetter } from '../../utils';

export const RegistrationStepThree = ({ setState, next, values, styles }) => {
  const [selectedGender, setSelectedGender] = React.useState(null);
  const [genders, setGenders] = React.useState([]);

  const handlePressButton = (id) => {
    setSelectedGender(id);
  };

  const GenderButton = ({ name, _id }) => (
    <Button
      title={name}
      buttonStyle={[
        styles['gender_button'],
        selectedGender !== _id && selectedGender !== null
          ? styles['gender_button__nonselected']
          : null,
      ]}
      onPress={(e) => {
        handlePressButton(_id);
      }}
      activeOpacity={1}
    />
  );

  useEffect(() => {
    GenderApi.getGenders().then((data) => {
      setGenders(data);
    });
  }, []);

  return (
    <>
      <View style={styles['gender_btnContainer']}>
        {genders.length > 0 &&
          genders.map((item) => (
            <GenderButton
              key={item._id}
              name={capitalizeFirstLetter(item.name)}
              _id={item._id}
            />
          ))}
      </View>

      <View style={styles['buttonContainer']}>
        <Button
          title={'Go next'}
          buttonStyle={styles['button']}
          onPress={() => {
            setState((prevState) => ({ ...prevState, genderId: id }));
            next();
          }}
          disabled={selectedGender === null}
        />
      </View>
    </>
  );
};
