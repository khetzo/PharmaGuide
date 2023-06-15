import React, { useEffect, useState, useRef } from "react";

//import all the components we are going to use
import {
  FlatList,
  Image,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const dummyArray = [


  {
    id: "4",
    salonName: "teddy Nails",
    slogen: "Fall in Love with the Art of Nails",

    PreviewdIcon: "A",
    image: require("../assets/news/remedy.jpg"),
  },

  {
    id: "6",
    salonName: "teddy Nails",
    slogen: "Fall in Love with the Art of Nails",

    PreviewdIcon: "c",
    image: require("../assets/news/remedy.jpg"),
  },


];
console.log(dummyArray.uri);
const HomeScreen = () => {
  const [listItems, setListItems] = useState(dummyArray);
  const translateX = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  });
  const ItemView = ({ item, index }) => {
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <View style={styles.postContainer}>
        <Animated.View style={{ transform: [{ translateY: translateX }] }}>
          <View style={styles.profileContent}>
            <Text numberOfLines={1} style={styles.cardtitle}>
              {item.salonName}
            </Text>
            {/**
             * <StarRating ratings={marker.rating} reviews={marker.reviews} />
             *
             */}
            <Text numberOfLines={1} style={styles.cardDescription}>
              {item.slogen}
            </Text>
          </View>
          <View key={index} style={{ flexDirection: "row" }}>
            <Image
              source={item.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            {/*  */}
            <View
              style={styles.item}
              // onPress={() => getItem(item)}
            >
              <View style={[styles.Preview, { backgroundColor: "gray" }]}>
                <Text>{item.id}</Text>
              </View>
              <View style={[styles.Preview, { backgroundColor: "gray" }]}>
                <Text>{item.value}</Text>
              </View>
              <View style={[styles.Preview, { backgroundColor: "gray" }]}>
                <Text>{item.value}</Text>
              </View>
              <View style={[styles.Preview, { backgroundColor: "gray" }]}>
                <Text>{item.value}</Text>
              </View>
              <View style={[styles.Preview, { backgroundColor: "gray" }]}>
                <Text>{item.value}</Text>
              </View>
              <View style={[styles.Preview, { backgroundColor: "blue" }]}>
                <Text>+{item.id}</Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.profileContent,
              {
                //backgroundColor: "red",
                height: height * 0.08,

                justifyContent: "space-around",
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
          >
            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}}>
              <AntDesign name="form" size={20} color="black" />
              <Text style={{fontSize:9}}>10 Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}}>
              <Entypo name="flag" size={20} color="black" />
              <Text style={{fontSize:9}}>Flug</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}}>
              <Ionicons name="location-sharp" size={20} color="black" />
              <Text style={{fontSize:9}}>Location</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}}>
              <AntDesign name="sharealt" size={20} color="black" />
              <Text style={{fontSize:9}}>Share</Text>
            </TouchableOpacity>

           
          </View>
        </Animated.View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View style={{ height: 0, width: "1%" }} />
    );
  };

  const getItem = (item) => {
    //Function for click on an item
    alert("Id : " + item.id + " Value : " + item.value);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={listItems}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",

    //backgroundColor: "red",

    marginTop: 5,
  },
  postContainer: {
    elevation: 0.5,
    backgroundColor: "'rgba(228, 223, 225, 0.4)'",

    alignItems: "center",

    height: height * 0.52,
    width: width,
    // overflow: "hidden",
  },
  cardImage: {
   
    width: width * 0.92,
    height: height * 0.33,
    borderRadius: 11,
    marginTop: 2,
    resizeMode: "cover",
  },
  item: {
    padding: 2,
    // fontSize: 18,
    //marginLeft: -7,
    width: width * 0.07,
    height: height * 0.33,
   // backgroundColor: "pink",
    justifyContent:"flex-end",
    borderRadius: 10,
  },
  Preview: {
    height: "10%",
    //width:"90%",
    // backgroundColor:"red",
    borderRadius: 300,
    marginVertical: -1,
    borderWidth: 0.6,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  profileContent: {
    margin: 3,
    width: width * 0.95,
    height: height * 0.08,
    // backgroundColor: "green",
  },
  cardtitle: {
    fontSize: 14,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 13,
    color: "#444",
  },
});

export default HomeScreen;
