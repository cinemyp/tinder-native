import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { Divider, Icon, Text } from 'react-native-elements';
import UserApi from '../api/UserApi';
import LoadingView from '../components/LoadingView';
import Layout from '../constants/Layout';

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
}) => {
  const [profileData, setProfileData] = React.useState(null);
  const { profile } = route.params;

  React.useEffect(() => {
    if (!profile.avatarUrl) {
      UserApi.getUserById(profile._id).then((user) => {
        setProfileData(user);
      });
    } else {
      setProfileData(profile);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: profileData?.avatarUrl }} style={styles.image} />
      </View>
      <Text h4 style={styles.name}>
        {profileData?.name}
      </Text>
      <Text style={styles.desc}>Fashion Designer at Amelia & Co.</Text>
      <Divider style={styles.divider} />
      <Text style={styles.desc}>
        I love to travel. I have a cat named pickles. If he likes you, I
        probably will too.
      </Text>
      <Divider style={styles.divider} />
      <Text style={styles.desc}>Find me on Social here</Text>
      <View style={styles.socialLinks}>
        {socials.map(({ title, link }) => (
          <Social key={title} name={title} link={link} />
        ))}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    margin: 20,
  },
  image: {
    width: Layout.window.width - 60, // device width - some margin
    height: Layout.window.height / 2 - 60, // device height / 2 - some margin
    borderRadius: 20,
  },
  name: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  desc: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 14,
  },
  divider: {
    backgroundColor: '#C0C0C0',
    width: Layout.window.width - 60,
    margin: 20,
  },
  socialLinks: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: Layout.window.width,
    marginLeft: 40,
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
});
