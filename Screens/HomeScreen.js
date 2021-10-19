import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-deck-swiper";
import { Card } from "../components/Card";
import {
  EmptyProfileView,
  EmptyView,
} from "../components/EmptyViews/EmptyProfileView";

export default function HomeScreen({ navigation }) {
  const [viewProfiles, setViewProfiles] = useState(false);
  const [profilesData, setProfilesData] = useState([]);
  let data = [
    {
      pic: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      title: "Amelia, 27",
      caption: "16 miles away",
    },
    {
      pic: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      title: "Joanna, 19",
      caption: "2 miles away",
    },
    {
      pic: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      title: "Charlie, 32",
      caption: "24 miles away",
    },
    {
      pic: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      title: "Mary, 23",
      caption: "45 miles away",
    },
  ];
  const handleSwipedLeft = (index) => {
    console.log("Swipe left");
  };
  const handleSwipedRight = (index) => {
    console.log("Swipe right");
  };

  const handleSwipedAll = () => {
    console.log("Swiped all");
    //TODO: подгрузка данных, когда все закончились, иначе выводить, что ничего нет
    setViewProfiles(false);
    setProfilesData([]);
  };

  const handleReload = () => {
    console.log("Reload");
    setProfilesData(data);
    setViewProfiles(true);
  };

  const handleTapCard = () => {
    navigation.navigate("Profile");
  };

  useEffect(() => {
    setProfilesData(data);
    setViewProfiles(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {viewProfiles ? (
        <Swiper
          cards={profilesData}
          renderCard={(props) => {
            return <Card {...props} onPressCard={handleTapCard} />;
          }}
          backgroundColor={"white"}
          cardHorizontalMargin={0}
          stackSize={2}
          onSwipedLeft={handleSwipedLeft}
          onSwipedRight={handleSwipedRight}
          onSwipedAll={handleSwipedAll}
          disableBottomSwipe={true}
          disableTopSwipe={true}
          animateCardOpacity
          animateOverlayLabelsOpacity
          overlayLabelStyle={{
            fontSize: 45,
            fontWeight: "bold",
            borderRadius: 10,
            padding: 10,
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
          overlayLabels={{
            left: {
              element: <Text>NOPE</Text> /* Optional */,
              title: "NOPE",
              style: {
                label: {
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              element: <Text>LIKE</Text> /* Optional */,
              title: "LIKE",
              style: {
                label: {
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
          }}
        />
      ) : (
        <EmptyProfileView titleReload={"Reload"} onReload={handleReload} />
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
