import React from 'react';
import {
  Animated,
  Easing,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Divider, Icon, Text } from 'react-native-elements';
import { IconButton } from '../components/IconButton';
import { SERVER_URL } from '../constants';
import Layout from '../constants/Layout';
import { PRIMARY_COLOR } from '../constants/colors';
import { TopArtists } from '../components/MusicStats';
import { ScrollView } from 'react-native-gesture-handler';

import { useStoreon } from 'storeon/react';
import MusicApi from '../api/MusicApi';

export const ProfileScreen = ({ route, navigation }) => {
  const [profileData, setProfileData] = React.useState(null);
  const [compatibility, setCompatibility] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const shown = React.useRef(new Animated.Value(0)).current;
  const { profile } = route.params;
  const { currentUser } = useStoreon('currentUser');

  const handlePressBack = () => {
    navigation.goBack();
  };

  React.useEffect(() => {
    const uidTo = profile.yandexId;
    const uidFrom = currentUser.yandexId;
    setLoading(true);
    setProfileData(profile);
    MusicApi.compareTastes(uidFrom, uidTo).then((res) => {
      setLoading(false);
      setCompatibility(res.common * 100);
    });
  }, []);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(shown, {
        toValue: 1,
        duration: 1000,
        delay: 100,
        easing: Easing.cubic,
        useNativeDriver: false,
      })
    ).start();
  }, [shown]);

  let color = shown.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#bbb', '#ddd', '#bbb'],
  });
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

          {loading ? (
            <Animated.View
              style={{ ...styles['loadingText'], backgroundColor: color }}
            />
          ) : (
            <Text h4 style={styles['compatibilityText']}>
              Compatibility:{' '}
              {isNaN(compatibility) ? '70' : Math.round(compatibility)}%
            </Text>
          )}

          <View style={styles['musicStat']}>
            <TopArtists
              uid={profile.yandexId}
              title={`${profile.name}'s Top Artists`}
            />
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
  compatibilityText: {
    marginTop: 15,
  },
  loadingText: {
    height: 26,
    marginTop: 15,
  },
});
