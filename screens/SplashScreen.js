import { View, Image, StyleSheet } from "react-native";

function SplashScreen() {
  return (
    <View style={SplashStyles.container}>
      <Image
        source={require("../images/logo.png")}
        style={SplashStyles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const SplashStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    padding: 50,
    height: 200,
    width: 200,
    marginTop: 280,
  },
});

export default SplashScreen;
