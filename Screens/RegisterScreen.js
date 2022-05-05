import React, { useState } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import { useStoreon } from 'storeon/react';
import ImageApi from '../api/ImagesApi';
import { RegistrationPhoto } from '../components/Registration/RegistrationPhoto';
import SocketContext from '../contexts';
import { openImagePickerAsync } from '../utils/images';

export const RegisterScreen = ({ navigation }) => {
  const { currentUser, dispatch } = useStoreon('currentUser');
  const [image, setImage] = useState(null);
  const [focus, setFocus] = useState(null);

  const socket = React.useContext(SocketContext);

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
    dispatch('user/get');

    setTimeout(() => {
      socket.auth = { customId: currentUser._id };
      socket.connect();

      dispatch('auth/update', { isSignedIn: true });
    }, 1000);
    navigation.goBack();
  };
  const handleRemoveImage = () => {
    setImage(null);
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
      <RegistrationPhoto
        data={{
          image,
          currentUser,
        }}
        onChooseImage={handleChooseImage}
        onRemoveImage={handleRemoveImage}
        next={handlePressRegister}
      />
    </KeyboardAvoidingView>
  );
};
