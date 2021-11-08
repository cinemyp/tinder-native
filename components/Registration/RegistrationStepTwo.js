import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

export const RegistrationStepTwo = ({ setState, next, values, styles }) => {
  const [selectedImage, setSelectedImage] = React.useState(null);

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
  };

  const handlePressRemoveSelectedImage = () => {
    setSelectedImage(null);
    setState((prevState) => ({ ...prevState, imageUri: '' }));
  };

  return (
    <>
      <View style={styles['imageContainer']}>
        {selectedImage && (
          <>
            <View style={styles['removeBtn']}>
              <Button
                icon={
                  <Ionicons
                    name={'close-circle-outline'}
                    color={'red'}
                    size={42}
                  />
                }
                type={'clear'}
                onPress={handlePressRemoveSelectedImage}
              />
            </View>

            <Image
              source={{ uri: selectedImage.localUri }}
              style={styles['thumbnail']}
            />
          </>
        )}
      </View>

      <View style={styles['buttonContainer']}>
        {selectedImage ? (
          <Button
            title={'Register'}
            buttonStyle={styles['button']}
            onPress={next}
          />
        ) : (
          <Button
            title={'Add photo'}
            buttonStyle={styles['button']}
            onPress={openImagePickerAsync}
          />
        )}
      </View>
    </>
  );
};
