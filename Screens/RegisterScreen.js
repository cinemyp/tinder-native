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
    await ImageApi.updateImage(image, currentUser._id);
    dispatch('auth/update', { isSignedIn: true });
    navigation.goBack();
    // await AuthApi.signOn(state, dispatch, setProgressLoading);
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
    <KeyboardAvoidingView style={styles['container']} behavior={'padding'}>
      <View>
        <Text style={styles['registerText']}>Welcome, {currentUser.name}</Text>
        <Text style={styles['stepText']}>Step 1: The Profile Picture</Text>
        {image ? (
          <View style={styles['avatarContainer']}>
            <LazyImage
              source={{
                uri: image,
              }}
              style={{ width: 150, height: 150, borderRadius: 25 }}
              resizeMode={'cover'}
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
        <Text style={styles['stepText']}>Step 2: The Description</Text>
        <TextInput
          placeholder="Enter your description"
          style={styles['textArea']}
          textAlign="left"
          maxLength={250}
          keyboardType="default"
          onFocus={handleFocusText}
        />
      </View>
      <Button
        title={'Update Profile'}
        style={styles['doneBtn']}
        onPress={handlePressRegister}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  dateContainer: {
    width: '100%',
  },
  avatarContainer: {
    marginTop: 15,
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
    color: '#555',
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
  doneBtn: {
    marginTop: 30,
  },
  thumbnail: {
    width: 250,
    height: 350,
    resizeMode: 'cover',
    borderRadius: 5,
    zIndex: 0,
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
  gender_btnContainer: {
    justifyContent: 'center',
    marginBottom: 50,
  },
  gender_button: {
    marginTop: 50,
    width: 150,
    backgroundColor: PRIMARY_COLOR,
    borderWidth: 1,
    borderColor: 'black',
  },
  gender_button__nonselected: {
    marginTop: 50,
    width: 150,
    backgroundColor: PRIMARY_COLOR + '95',
    borderWidth: 0,
  },
});
