import React, { useState, useEffect } from "react";

import { ActivityIndicator, View, StyleSheet, Image } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
const Splash = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(()=>{
  
     setTimeout(()=>{
setAnimating(false);
AsyncStorage.getItem('user_id').then((value)=>navigation.replace(
  
    value ===null? "Auth":"HomeScrean"
),);

     },4000); 
  },[])
  
  return (
    <View style={styles.container}>
      <Image
      //image will be uplouded afer fixing the bugs 
      source={require('../assets/Pharmacyicon.png')}
        style={{ resizeMode: "contain", margin: 30 }}
      />
      <ActivityIndicator
        size="large"
        animation={animating}
        color="blackS"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
