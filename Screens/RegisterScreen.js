import React, { useState } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import { useStoreon } from 'storeon/react';

import ImageApi from '../api/ImagesApi';
import ProfilesApi from '../api/ProfilesApi';

import {
  RegistrationPhoto,
  RegistrationName,
  RegistrationBirthday,
  RegistrationGender,
} from '../components/Registration';
import SocketContext from '../contexts';
import { openImagePickerAsync } from '../utils/images';

const MAX_STEP = 4;
const DEFAULT_PROFILE = {
  name: null,
  avatar: null,
  birthday: null,
  gender: null,
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

  const handleChangeData = (value, prop) => {
    setData((prevState) => ({ ...prevState, [prop]: value }));
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

  const handlePressRegister = async () => {
    const profileUpdate = ProfilesApi.updateAccount({
      _id: currentUser._id,
      ...data,
    });
    const imageUpdate = ImageApi.updateImage(data.avatar, currentUser._id);
    await Promise.all([profileUpdate, imageUpdate]);

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
      onChange={handleChangeData}
      next={handleNext}
    />,
    <RegistrationGender
      data={data}
      onChange={handleChangeData}
      next={handleNext}
    />,
    <RegistrationBirthday
      data={data}
      onChange={handleChangeData}
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

  return (
    <KeyboardAvoidingView behavior={'padding'}>
      {registerSteps[step]}
    </KeyboardAvoidingView>
  );
};
