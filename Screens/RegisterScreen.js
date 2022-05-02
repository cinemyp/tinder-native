import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useStoreon } from 'storeon/react';
import AuthApi from '../api/AuthApi';
import ImageApi from '../api/ImagesApi';
import { LazyImage } from '../components/LazyImage';
import { PRIMARY_COLOR } from '../constants/colors';
import { openImagePickerAsync } from '../utils/images';

export const RegisterScreen = ({ navigation }) => {
  const { currentUser, dispatch } = useStoreon('currentUser');
  const [image, setImage] = useState(null);
  const [focus, setFocus] = useState(null);
  const [desc, setDesc] = useState('');
  const handleChooseImage = async () => {
    const result = await openImagePickerAsync();
    if (!result) {
      return;
    }
    setImage(result.avatarUri);
  };
  const handleFocusText = () => {
    setFocus(true);
  };
  const handlePressRegister = async () => {
    console.log(image);
    await ImageApi.updateImage(image, currentUser._id);
    dispatch('auth/update', { isSignedIn: true });
    navigation.goBack();
  };

  React.useEffect(() => {
    if (!currentUser.name) {
      dispatch('user/get');
    }
  }, []);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        focus ? (
          <Button
            onPress={() => {
              Keyboard.dismiss();
              setFocus(false);
            }}
            title="Done"
            type={'clear'}
          />
        ) : null,
    });
  }, [navigation, focus]);

  return (
    <KeyboardAvoidingView behavior={'padding'}>
      <View style={styles['container']}>
        <Text style={styles['registerText']}>Welcome, {currentUser.name}</Text>
        <Text style={styles['stepText']}>Step 1: The Profile Picture</Text>
        {image ? (
          <View style={styles['avatarContainer']}>
            <LazyImage
              source={{
                uri: image,
              }}
              style={styles['thumbnail']}
              resizeMode={'cover'}
              shadow
            />
          </View>
        ) : (
          <Button
            title={'Choose from gallery'}
            type={'clear'}
            style={styles['registerLink']}
            onPress={handleChooseImage}
          />
        )}
        {/* <Text style={styles['stepText']}>Step 2: The Description</Text>
        <TextInput
          placeholder="Enter your description"
          style={styles['textArea']}
          textAlign="left"
          maxLength={250}
          keyboardType="default"
          onFocus={handleFocusText}
        /> */}
        {image ? (
          <View style={styles['doneBtnContainer']}>
            <Button
              title={'Update Profile'}
              buttonStyle={styles['doneBtn']}
              onPress={handlePressRegister}
            />
          </View>
        ) : null}
      </View>
    </KeyboardAvoidingView>
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
  },
  inputContainer: {
    width: '80%',
  },
  avatarContainer: {
    marginTop: 10,
    width: '100%',
    height: '90%',
  },
  textArea: {
    marginTop: 10,
    fontSize: 20,
    width: '80%',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  button: {
    width: '100%',
  },
  registerText: {
    color: '#a5a5a5',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepText: {
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginTop: 10,
  },
  registerLink: {
    marginTop: 10,
  },
  doneBtnContainer: {
    position: 'absolute',
    bottom: 80,
    width: '50%',
  },
  doneBtn: {
    backgroundColor: PRIMARY_COLOR,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 252,
    height: 352,
    backgroundColor: '#ccc',
    borderColor: '#aaa',
    borderWidth: 2,
    borderRadius: 5,
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    zIndex: 99,
    right: -20,
    top: -20,
  },
  addPhotoBtn: {
    position: 'absolute',
    zIndex: 99,
  },
});
