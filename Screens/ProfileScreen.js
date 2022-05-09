import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Divider, Icon, Text } from 'react-native-elements';
import { IconButton } from '../components/IconButton';
import { SERVER_URL } from '../constants';
import Layout from '../constants/Layout';
import { PRIMARY_COLOR } from '../constants/colors';
import { TopArtists } from '../components/MusicStats';
import { ScrollView } from 'react-native-gesture-handler';

export const ProfileScreen = ({ route, navigation }) => {
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
      <ScrollView style={styles['fullHeight']}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: SERVER_URL + profileData?.avatar }}
            style={styles.image}
          />
          <IconButton
            iconName={'chevron-back-circle'}
            iconSize={64}
            iconColor={PRIMARY_COLOR}
            containerStyle={styles['btnContainer']}
            buttonStyle={styles['btnBack']}
            onPress={handlePressBack}
            background
          />
        </View>
        <View style={styles['descWrapper']}>
          <Text h2 style={styles.name}>
            {profileData?.name}, {profileData?.age}
          </Text>
          <Divider style={styles.divider} />
          <View style={styles['musicStat']}>
            <TopArtists uid={profile.yandexId} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: Layout.window.height / 1.7,
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
    marginBottom: 150,
    paddingHorizontal: 20,
  },
  btnContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  musicStat: {
    marginTop: 15,
  },
  fullHeight: {},
});
