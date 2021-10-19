import React from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import { Divider, Icon, Text } from "react-native-elements";
import Layout from "../constants/Layout";

const Social = ({ name }) => (
  <Icon
    name={name}
    type="font-awesome"
    containerStyle={styles.iconContainer}
    size={32}
  />
);

export const ProfileScreen = ({
  name = "Amelia",
  desc,
  pic = "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  socials = [{ title: "instagram" }],
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: pic }} style={styles.image} />
      </View>
      <Text h4 style={styles.name}>
        {name}
      </Text>
      <Text style={styles.desc}>Fashion Designer at Amelia & Co.</Text>
      <Divider style={styles.divider} />
      <Text style={styles.desc}>
        I love to travel. I have a cat named pickles. If he likes you, I
        probably will too. {desc}
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
    alignItems: "center",
    backgroundColor: "#fff",
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
    color: "#5E5E5E",
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  desc: {
    color: "#5E5E5E",
    alignSelf: "flex-start",
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 14,
  },
  divider: {
    backgroundColor: "#C0C0C0",
    width: Layout.window.width - 60,
    margin: 20,
  },
  socialLinks: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    width: Layout.window.width,
    marginLeft: 40,
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
});
