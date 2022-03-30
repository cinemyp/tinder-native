import React, { useEffect, useState } from 'react';

import { useStoreon } from 'storeon/react';
import Swiper from 'react-native-deck-swiper';
import { StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfilesApi from '../api/ProfilesApi';
import LikeApi from '../api/LikeApi';

import { Card } from '../components/Card';
import { EmptyProfileView } from '../components/EmptyViews/EmptyProfileView';

export default function HomeScreen({ navigation }) {
  const [viewProfiles, setViewProfiles] = useState(false);
  const [profilesData, setProfilesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { currentUser } = useStoreon('currentUser');

  const handleSwipe = () => {
    setCurrentIndex((prevState) => prevState + 1);
  };

  const handleSwipedLeft = (index) => {
    console.log('Swipe left');
  };
  const handleSwipedRight = (index) => {
    const { _id } = profilesData[index];
    LikeApi.likeUser(currentUser._id, _id);
    console.log('Swipe right');
  };

  const handleSwipedAll = () => {
    console.log('Swiped all');
    //TODO: подгрузка данных, когда все закончились, иначе выводить, что ничего нет
    setViewProfiles(false);
    // loadProfiles();
  };

  const handleReload = () => {
    console.log('Reload');
    loadProfiles();
    setCurrentIndex(0);
  };

  const handleTapCard = () => {
    //TODO: вернуть навигацию обратно, когда будет полностью доделана страничка описания профиля
    // navigation.navigate('Profile', { profile: profilesData[currentIndex] });
  };

  useEffect(() => {
    if (currentUser.name) {
      loadProfiles();
    }
  }, [currentUser]);

  const loadProfiles = () => {
    ProfilesApi.getProfiles(currentUser._id).then((profilesData) => {
      if (profilesData.length === 0) {
        return;
      }
      setProfilesData(profilesData);
      setViewProfiles(true);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {viewProfiles ? (
        <Swiper
          cards={profilesData}
          renderCard={(props) => {
            return <Card {...props} onPressCard={handleTapCard} />;
          }}
          backgroundColor={'white'}
          cardHorizontalMargin={0}
          stackSize={2}
          onSwiped={handleSwipe}
          onSwipedLeft={handleSwipedLeft}
          onSwipedRight={handleSwipedRight}
          onSwipedAll={handleSwipedAll}
          disableBottomSwipe={true}
          disableTopSwipe={true}
          animateCardOpacity
          animateOverlayLabelsOpacity
          overlayLabelStyle={{
            fontSize: 45,
            fontWeight: 'bold',
            borderRadius: 10,
            padding: 10,
            overflow: 'hidden',
            backgroundColor: '#fff',
          }}
          overlayLabels={{
            left: {
              element: <Text>NOPE</Text> /* Optional */,
              title: 'NOPE',
              style: {
                label: {
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              element: <Text>LIKE</Text> /* Optional */,
              title: 'LIKE',
              style: {
                label: {
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
          }}
        />
      ) : (
        <EmptyProfileView titleReload={'Reload'} onReload={handleReload} />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
