import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { useEffect, useContext, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  dropTable,
  fetchTableData,
  InitializeDatabase,
  insertMenuItems,
} from "../Database/Data";

function Home() {
  const [data, setData] = useState("");
  const [availableCategories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        //dropTable();
        InitializeDatabase();
        const storedData = await loadAndFilter();
        if (storedData.length === 0) {
          const response = await fetch(
            "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
          );
          remoteData = await response.json();
          const menuItems = remoteData.menu;
          await insertMenuItems(menuItems);
          setData(menuItems);
          const categories = [
            ...new Set(menuItems.map((item) => item.category)),
          ];
          setCategories(categories);
        } else {
          const categories = [
            ...new Set(storedData.map((item) => item.category)),
          ];
          setCategories(categories);
        }
      } catch (error) {
        return error;
      }
    };
    loadData();
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
  
    return (...args) => {
      clearTimeout(timeoutId);
  
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  useEffect(() => {
    debounce(loadAndFilter(),500);
  }, [selectedCategories, searched])

  const loadAndFilter = async () => {
    try {
      const result = await fetchTableData([selectedCategories, searched]);
      setData(result);
      return result;
    } catch (error) {
      Alert.alert(error);
    }
  }

  const Item = ({ name, price, description, image, category }) => {
    const blur = require("../images/blur.jpeg");
    const uriImage = {
      uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
    };
    return (
      <View style={HomeStyles.item_container}>
        <View style={HomeStyles.menuContainer}>
          <Text style={HomeStyles.item_title}>{name}</Text>

          <Text style={HomeStyles.Menutext}>{description}</Text>
          <Text style={HomeStyles.item_price}>$ {price}</Text>
        </View>
        <Image
          source={uriImage}
          style={HomeStyles.menuImage}
          resizeMode="cover"
          defaultSource={blur}
        />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        name={item.name}
        price={item.price}
        description={item.description}
        image={item.image}
        category={item.category}
      />
    );
  };

  const TogglePressedCategory = (category) => {
    if (selectedCategories.includes(category)) {
      const newSelected = selectedCategories.filter(
        (index) => index !== category
      );
      setSelectedCategories(newSelected);
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const CategoryMenu = () => {
    return availableCategories.map((category, index) => (
      <TouchableOpacity
        key={index}
        style={[
          selectedCategories.includes(category)
            ? {
                ...HomeStyles.category_container,
                backgroundColor: "#495E57 ",
                borderColor: "#909492",
              }
            : HomeStyles.category_container,
        ]}
        onPress={() => TogglePressedCategory(category)}
      >
        <Text
          style={[
            selectedCategories.includes(category)
              ? { ...HomeStyles.category_text, color: "#909492" }
              : HomeStyles.category_text,
          ]}
        >
          {category}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={HomeStyles.container}>
        <View style={HomeStyles.hero_container}>
          <View style={HomeStyles.title_container}>
            <Text style={HomeStyles.title}>Little Lemon</Text>
            <Text style={HomeStyles.subtitle}>Chicago</Text>
            <Text style={HomeStyles.sub_subtitle}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="search-circle"
                color="#EEEEEE"
                size={54}
                style={{ margin: 5 }}
              />
              <TextInput
                style={HomeStyles.input}
                onChangeText={(text) => setSearched(text)}
                autoCapitalize="none"
                selectionColor={"#495E57"}
              />
            </View>
          </View>
          <Image
            source={require("../images/Hero image.png")}
            style={HomeStyles.image}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            ...HomeStyles.item_container,
            flex: 0.25,
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              ...HomeStyles.subtitle,
              color: "#495E57",
              fontFamily: "Avenir Next",
              fontWeight: "bold",
              borderColor: "black",
              marginBottom: 5,
              marginTop: 5,
            }}
          >
            Order for Delivery !
          </Text>

          <ScrollView style={HomeStyles.item_container} horizontal={true}>
            <CategoryMenu />
          </ScrollView>
        </View>

        <FlatList
          style={HomeStyles.container}
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  title_container: {
    flex: 1,
    backgroundColor: "#495E57",
    marginRight: 10,
  },
  menuContainer: {
    flex: 1,
    marginBottom: 10,
    marginLeft: 10,
  },
  hero_container: {
    flex: 0.8,
    backgroundColor: "#495E57",
    flexDirection: "row",
    alignItems: "center", // Vertically center content
    justifyContent: "space-between", // Pushes text to the left and image to the right
  },
  item_container: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 0.2,
  },
  category_container: {
    height: 32,
    borderRadius: 10,
    backgroundColor: "#C2C6C4",
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    alignContent: "center",
    borderWidth: 1,
    borderColor: "#C2C6C4",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  Menutext: {
    fontSize: 14,
    color: "grey",
  },
  category_text: {
    fontSize: 16,
    color: "#495E57",
    fontWeight: "bold",
    margin: 5,
    alignSelf: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    fontFamily: "Avenir Next",
    marginTop: 20,
    marginLeft: 10,
    color: "#F4CE14",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Avenir",
    marginBottom: 10,
    marginLeft: 10,
    color: "#EEEEEE",
  },
  sub_subtitle: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Avenir",
    marginTop: 10,
    marginLeft: 10,
    color: "#EEEEEE",
  },
  item_title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Avenir",
    marginBottom: 5,
    marginTop: 10,
    color: "black",
  },
  item_price: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Avenir",
    marginBottom: 5,
    marginTop: 5,
    color: "#495E57",
  },
  menuImage: {
    height: 70,
    width: 70,
    alignSelf: "center",
    marginRight: 10,
  },
  image: {
    height: 130,
    width: 130,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 20,
    borderRadius: 40,
  },
  icon: {
    marginTop: 5,
  },
  input: {
    width: 300,
    height: 40,
    alignSelf: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 50,
    fontSize: 22,
    fontFamily: "Avenir Next",
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: "500",
    color: "#495E57",
  },
});

export default Home;
