import React from 'react';
import { View, Image, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProgressBar from 'react-native-progress/Bar';
import { PRIMARY_COLOR } from '../../constants/colors';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const resizeOptions = {
  newWidth: 500,
  newHeight: 500,
  compress: 1,
  saveFormat: SaveFormat.JPEG,
};

export const RegistrationStepFour = ({
  setState,
  next,
  values,
  styles,
  progressLoading,
}) => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [showButton, setShowButton] = React.useState(false);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    resizeImage(pickerResult.uri);
  };

  const resizeImage = async (imageUri) => {
    const manipResult = await manipulateAsync(
      imageUri,
      [
        {
          resize: {
            width: resizeOptions.newWidth,
            height: resizeOptions.newHeight,
          },
        },
      ],
      { compress: resizeOptions.compress, format: resizeOptions.saveFormat }
    );
    const thumbnail = await manipulateAsync(
      imageUri,
      [
        {
          resize: {
            width: 40,
            height: 40,
          },
        },
      ],
      { compress: resizeOptions.compress, format: resizeOptions.saveFormat }
    );
    const { uri } = manipResult;

    setSelectedImage(uri);
    setState((prevState) => ({
      ...prevState,
      imageUri: uri,
      thumbnailUri: thumbnail.uri,
    }));
    setShowButton(true);
  };

  const handlePressRemoveSelectedImage = () => {
    setSelectedImage(null);
    setState((prevState) => ({ ...prevState, imageUri: '' }));
    setShowButton(false);
  };

  return (
    <>
      <View style={styles['imageContainer']}>
        {selectedImage && showButton ? (
          <View style={styles['removeBtn']}>
            <Button
              icon={<Ionicons name={'close-circle'} color={'red'} size={42} />}
              type={'clear'}
              onPress={handlePressRemoveSelectedImage}
            />
          </View>
        ) : null}
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles['thumbnail']} />
        )}
        {!selectedImage && (
          <View style={styles['addPhotoBtn']}>
            <Button
              icon={
                <Ionicons
                  name={'add-circle-outline'}
                  color={'#a5a5a5'}
                  size={64}
                />
              }
              type={'clear'}
              onPress={openImagePickerAsync}
            />
          </View>
        )}
      </View>

      <View style={styles['buttonContainer']}>
        {showButton && (
          <Button
            title={'Register'}
            buttonStyle={styles['button']}
            onPress={() => {
              setShowButton(false);
              next();
            }}
          />
        )}
      </View>
      {selectedImage && !showButton && (
        <ProgressBar
          progress={progressLoading}
          width={250}
          color={PRIMARY_COLOR}
        />
      )}
    </>
  );
};
