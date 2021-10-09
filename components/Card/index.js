import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Tile } from "react-native-elements";
import Layout from "../../constants/Layout";

const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49;

export const Card = ({ pic, title, caption }) => {
  return (
    <Tile
      imageSrc={{
        uri: "https://vectorified.com/images/make-icon-font-25.png",
      }}
      imageContainerStyle={styles.container}
      imageProps={{ resizeMode: "cover", borderRadius: 20, height: "100%" }}
      title={title}
      titleStyle={styles.title}
      caption={caption}
      captionStyle={styles.caption}
      activeOpacity={0.9}
      containerStyle={styles.container}
      featured
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    width: Layout.window.width - 30,
    height: Layout.window.height - BOTTOM_BAR_HEIGHT * 6,
    borderRadius: 20,
    overflow: "hidden", // this does magic
  },
  title: {
    position: "absolute",
    left: 10,
    bottom: 30,
  },
  caption: {
    position: "absolute",
    left: 10,
    bottom: 10,
  },
});
