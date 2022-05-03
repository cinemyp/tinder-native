import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Divider, Icon, Text } from 'react-native-elements';
import UserApi from '../api/UserApi';
import { SERVER_URL } from '../constants';
import Layout from '../constants/Layout';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PRIMARY_COLOR } from '../constants/colors';

const Social = ({ name }) => (
  <Icon
    name={name}
    type="font-awesome"
    containerStyle={styles.iconContainer}
    size={32}
  />
);

export const ProfileScreen = ({
  socials = [{ title: 'instagram' }],
  route,
  navigation,
}) => {
  const [profileData, setProfileData] = React.useState(null);
  const { profile } = route.params;

  const handlePressBack = () => {
    navigation.goBack();
  };

  React.useEffect(() => {
    setProfileData(profile);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: SERVER_URL + profileData?.avatar }}
          style={styles.image}
        />
        <Button
          icon={
            <Ionicons
              name={'chevron-back-circle'}
              size={64}
              color={PRIMARY_COLOR}
              style={styles['iconBack']}
            />
          }
          onPress={handlePressBack}
          containerStyle={styles['btnContainer']}
          buttonStyle={styles['btnBack']}
          type={'clear'}
        />
      </View>
      <View style={styles['descWrapper']}>
        <Text h2 style={styles.name}>
          {profileData?.name}, {profileData?.age}
        </Text>
        <Divider style={styles.divider} />
        <Text style={styles.desc}>
          I love to travel. I have a cat named pickles. If he likes you, I
          probably will too.
        </Text>
        <Divider style={styles.divider} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    margin: 0,
    width: '100%',
    maxHeight: '60%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
  },
  desc: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginTop: 5,
    fontSize: 18,
  },
  divider: {
    backgroundColor: '#C0C0C0',
    maxWidth: Layout.window.width,
    marginTop: 5,
  },
  descWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  btnContainer: {
    position: 'absolute',
    right: 0,
    bottom: -30,
  },
});
