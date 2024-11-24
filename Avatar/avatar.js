import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AppContext } from "../context/AppContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const AvatarWithInitials = ({ style_1, style_2 }) => {
  const { firstName, lastName } = useContext(AppContext);

  const firstNameInitial = firstName[0] ? firstName[0] : "";
  const lastNameInitial = lastName[0] ? lastName[0] : "";

  return (
    <View style={style_1}>
      <Text style={style_2}>
        {firstNameInitial}
        {lastNameInitial}
      </Text>
    </View>
  );
};

const ProfilePicture = ({ header, changedProfile = null }) => {
  const { profile } = useContext(AppContext);
  return changedProfile === 1 ?
  (
    <AvatarWithInitials
      style_1={avatarStyles.container}
      style_2={avatarStyles.initials}
    />
  ): changedProfile ? (
    <Image source={{ uri: changedProfile }} style={avatarStyles.container} />)
    : (
    profile ? (
      header ? (
        <Image source={{ uri: profile }} style={avatarStyles.container_2} />
      )
       : (
        <Image source={{ uri: profile }} style={avatarStyles.container} />
      ))
     : header ? (
      <AvatarWithInitials
        style_1={avatarStyles.container_2}
        style_2={avatarStyles.initials_2}
      />
    ) : (
      <AvatarWithInitials
        style_1={avatarStyles.container}
        style_2={avatarStyles.initials}
      />
    )
    )
}

const avatarStyles = StyleSheet.create({
  container: {
    justifyContent: "center", 
    alignItems: "center", 
    width: 100, 
    height: 100, 
    backgroundColor: "#F4CE14",
    borderRadius: 50, 
  },
  container_2: {
    justifyContent: "center", 
    alignItems: "center", 
    width: 50, 
    height: 50, 
    backgroundColor: "#F4CE14",
    borderRadius: 50,
    marginRight: 20,
  },
  initials: {
    color: "#ffffff",
    fontSize: 30, 
    fontWeight: "800",
  },
  initials_2: {
    color: "#ffffff", 
    fontSize: 18, 
    fontWeight: "800", 
  },
  image: {
    borderRadius: "50%",
    height: 100,
    width: 100,
  },
});
export default ProfilePicture;
