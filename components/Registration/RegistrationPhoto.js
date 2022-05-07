import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PRIMARY_COLOR, SECOND_COLOR } from '../../constants/colors';
import { Button } from 'react-native-elements';
import { LazyImage } from '../LazyImage';
import { IconButton } from '../IconButton';

const AddPhotoBtn = ({ onChooseImage }) => {
  return (
    <IconButton
      containerStyle={styles['addPhotoBtn']}
      iconName={'add-circle'}
      iconSize={72}
      iconColor={'#888'}
      onPress={onChooseImage}
    />
  );
};

const RemovePhotoBtn = ({ onRemoveImage }) => {
  return (
    <IconButton
      containerStyle={styles['removePhotoBtn']}
      iconName={'close-circle'}
      iconSize={48}
      iconColor={SECOND_COLOR}
      onPress={onRemoveImage}
      background
    />
  );
};

export const RegistrationPhoto = ({
  data,
  onChooseImage,
  onRemoveImage,
  next,
}) => {
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    if (data.avatar) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [data.avatar]);

  return (
    <View style={styles['container']}>
      <Text style={styles['registerText']}>Add Photo</Text>
      <View style={styles['avatarContainer']}>
        {data.avatar && (
          <LazyImage
            source={{
              uri: data.avatar,
            }}
            style={styles['thumbnail']}
            resizeMode={'cover'}
            shadow
          />
        )}
        {!data.avatar ? (
          <AddPhotoBtn onChooseImage={onChooseImage} />
        ) : (
          <RemovePhotoBtn onRemoveImage={onRemoveImage} />
        )}
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
    position: 'relative',
    height: '100%',
  },
  avatarContainer: {
    marginTop: 20,
    borderRadius: 15,
    borderColor: '#a5a5a5',
    borderWidth: 2,
    backgroundColor: '#ccc',
    width: '90%',
    height: '70%',
    position: 'relative',
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
  },
  registerText: {
    color: 'black',
    fontWeight: '300',
    fontSize: 36,
  },
  doneBtnContainer: {
    width: '70%',
    marginTop: 30,
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
  removePhotoBtn: {
    position: 'absolute',
    zIndex: 99,
    right: -20,
    bottom: -20,
  },
  addPhotoBtn: {},
});
