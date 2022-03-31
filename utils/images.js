import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

import { Alert } from 'react-native';

const resizeOptions = {
  newWidth: 500,
  newHeight: 500,
  compress: 1,
  saveFormat: SaveFormat.JPEG,
};

const openImagePickerAsync = async () => {
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

  return await resizeImage(pickerResult.uri);
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
  console.log(manipResult);
  return { avatarUri: manipResult.uri, thumbnailUri: thumbnail.uri };
};

export { openImagePickerAsync };
