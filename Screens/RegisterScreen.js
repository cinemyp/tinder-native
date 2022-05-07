import React, { useState } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import { useStoreon } from 'storeon/react';
import ImageApi from '../api/ImagesApi';
import {
  RegistrationPhoto,
  RegistrationName,
} from '../components/Registration';
import SocketContext from '../contexts';
import { openImagePickerAsync } from '../utils/images';

const MAX_STEP = 2;
const DEFAULT_PROFILE = {
  name: null,
  avatar: null,
  birthday: null,
  genderId: null,
};

export const RegisterScreen = ({ navigation }) => {
  const { currentUser, dispatch } = useStoreon('currentUser');
  const [data, setData] = useState(DEFAULT_PROFILE);
  const [focus, setFocus] = useState(null);
  const [step, setStep] = useState(0);

  const socket = React.useContext(SocketContext);

  const handleNext = () => {
    if (step + 1 === MAX_STEP) {
      return handlePressRegister();
    }
    setStep((prevState) => prevState + 1);
  };

  const handleChangeName = (value) => {
    setData((prevState) => ({ ...prevState, name: value }));
  };

  const handleChooseImage = async () => {
    const result = await openImagePickerAsync();
    if (!result) {
      return;
    }
    setData((prevState) => ({ ...prevState, avatar: result.avatarUri }));
  };
  const handleRemoveImage = () => {
    setData((prevState) => ({ ...prevState, avatar: null }));
  };
  const handleFocusText = () => {
    setFocus(true);
  };

  const handlePressRegister = async () => {
    await ImageApi.updateImage(data.image, currentUser._id);
    dispatch('user/get');

    setTimeout(() => {
      socket.auth = { customId: currentUser._id };
      socket.connect();

      dispatch('auth/update', { isSignedIn: true });
    }, 1000);
    navigation.goBack();
  };

  const registerSteps = [
    <RegistrationName
      data={data}
      onChangeName={handleChangeName}
      next={handleNext}
    />,
    <RegistrationPhoto
      data={data}
      onChooseImage={handleChooseImage}
      onRemoveImage={handleRemoveImage}
      next={handleNext}
    />,
  ];

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
      {registerSteps[step]}
    </KeyboardAvoidingView>
  );
};
