import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProgressBar from 'react-native-progress/Bar';
import { PRIMARY_COLOR } from '../../constants/colors';

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
      alert('Permission to access camera roll is required!');
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
    setSelectedImage({ localUri: pickerResult.uri });
    setState((prevState) => ({ ...prevState, imageUri: pickerResult.uri }));
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
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles['thumbnail']}
          />
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
