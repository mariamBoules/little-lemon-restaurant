import {View, Text, StyleSheet, Button} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

function Home({navigation}){

return(    <View style={HomeStyles.container}>
        <Text style={HomeStyles.text}>
Home.js
        </Text>
        <Icon name="arrow-back-circle" color="#495E57" size={24} />
        <Button
        title='Go to Profile'
        onPress = { ()=> navigation.navigate('Profile')
        }
        />
    </View>);

}

const HomeStyles = StyleSheet.create({
    container:{
        flex:1,
        alignContent: 'center'
    },
    text:{
    fontSize: 24,
    fontWeight: 'bold'
    }
})

export default Home;
