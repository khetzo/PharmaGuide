import React, { useState } from "react";
<Text style={{ marginTop: 20 }}>Enter phone number</Text>;
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  Keyboard,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import firebase from "./firebaseConfig";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { initializeApp, getApp } from "firebase/app";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import countryCodes from "./CountryCodeData";
import { useNavigation } from "@react-navigation/native";

const app = getApp();
const auth = getAuth(app);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Calculate the block dimensions based on the device dimensions
const blockWidth = windowWidth * 0.7; // Adjust the factor as needed
const blockHeight = windowHeight * 0.25; // Adjust the factor as needed
// Calculate the font size based on the screen width
const fontSize = Dimensions.get("window").width * 0.04;

const LogIn = ({ navigation }) => {
  const recaptchaVerifier = React.useRef(null);

  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();


  const [guiedText, setGuiedtext] = React.useState({
    text: "NEXT",
    color: "#FF0000",
  });
  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = React.useState();
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [countryModalVisible, setCountryModalVisible] = useState(false);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const attemptInvisibleVerification = false;
  const deviceHeight = Dimensions.get("window").height;
  const statusBarHeight = StatusBar.currentHeight || 0;
  const DEVICE_HEIGHT = Platform.select({
    ios: deviceHeight,
    android:
      StatusBar.currentHeight > 24
        ? deviceHeight
        : deviceHeight - StatusBar.currentHeight,
  });
  const handleSendOTP = async () => {
    Keyboard.dismiss();

    if (!phoneNumber) {
      showMessage({
        text: "opps! looks like you forgot the entor your number",
        color: "#FF0000",
      });
      setGuiedtext({ text: "Try again", color: "#FF0000" });
      return;
    } else if (phoneNumber.length - selectedCountry.code.length !== 9) {
      console.log(phoneNumber.length - selectedCountry.code.length);
      showMessage({
        text: `Invalid phone number you enterted  ${
          phoneNumber.length - selectedCountry.code.length
        }  digit: please check your phone number and try again   `,
        color: "#FF0000",
      });
      setGuiedtext({ text: "Try again", color: "#FF0000" });
      return;
    } else {
      try {
        console.log(phoneNumber);
        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
          phoneNumber,
          recaptchaVerifier.current
        );

        setVerificationId(verificationId);

        showMessage({
          text: "Verification code has been sent to your phone.",
        });

        ///setVerificationId(verificationId);
      } catch (err) {
        console.error(err);
        showMessage({ text: `Error: ${err.message}`, color: "#FF0000" });
      }
    }
  };

  const handleVerifyOTP = async () => {
    // Get the navigation object using the useNavigation hook
    //Since  ({ navigation }) theer is no need
    //tyconst navigation = useNavigation();
    navigation.navigate("HomeScreen");
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential);

      showMessage({
        text: "Phone authentication successful 👍",
        color: "blue",
      });
      setGuiedtext({ text: "NEXT", color: "#FF0000" });
    } catch (err) {
      showMessage({ text: `Error: ${err.message}`, color: "#FF0000" });
    }
  };
  const handleInputChange = (text) => {
    // Update the phone number state
    const formattedPhoneNumber = selectedCountry.code + text;
    setPhoneNumber(formattedPhoneNumber);
  };
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountryModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        // attemptInvisibleVerification
        attemptInvisibleVerification={true | false /* experimental */}
      />

      {/* Verification Code Input */}
      {verificationId ? (
        <>
          <View style={styles.infoCountainter}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              welcome to Pharmaguide
            </Text>

            <View style={styles.infoCountainter}>
              <Image
                source={require("../assets/Pharmacyicon.png")}
                style={styles.image}
              />
              {/** thise view countatin the ohone number input and v-code */}

              <View style={styles.Phoneinput}>
                <TouchableOpacity
                  style={styles.countryButton}
                  onPress={() => setCountryModalVisible(true)}
                >
                  <Text style={styles.countryButtonText}>
                    {selectedCountry.flag}_:_{selectedCountry.code}
                  </Text>
                </TouchableOpacity>

                <TextInput
                  style={{ marginVertical: 10, fontSize: 17 }}
                  placeholder="+27767786789"
                  autoCompleteType="tel"
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  autoFocus={isKeyboardVisible}
                  onChangeText={handleInputChange}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>

              <TouchableOpacity style={styles.SendOTP} onPress={handleSendOTP}>
                <Text style={{ fontWeight: "600" }}>NEXT</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            visible={countryModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setCountryModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <FlatList
                  data={countryCodes}
                  keyExtractor={(item) => item.code}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.countryInfo}
                      onPress={() => {
                        setCountryModalVisible(false);
                        handleCountrySelect(item);
                      }}
                    >
                      <Text>{`${item.flag} ${item.code} - ${item.country}`}</Text>
                    </TouchableOpacity>
                  )}
                />

                <TouchableOpacity
                  style={{ marginTop: 1 }}
                  onPress={() => setCountryModalVisible(false)}
                >
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <>
          <Text style={{ marginTop: 20 }}>Enter verification code</Text>
          <View style={styles.Phoneinput}>
            <TextInput
              style={{ marginVertical: 10, fontSize: fontSize }}
              placeholder="Verification Code"
              autoFocus
              autoCompleteType="off"
              keyboardType="numeric"
              onChangeText={setVerificationCode}
            />
          </View>
          <TouchableOpacity style={[styles.SendOTP]} onPress={handleVerifyOTP}>
            <Text>Verify code</Text>
          </TouchableOpacity>
        </>
      )}

      {message && (
        <View
          style={[styles.authenticationMessage]}
          onPress={() => showMessage(undefined)}
        >
          <Text
            style={{
              color: message.color || "#0000FF",
              fontSize: fontSize,
              textAlign: "center",
              margin: 20,
            }}
          >
            {message.text}
          </Text>

          <TouchableOpacity
            onPress={() => showMessage(undefined)}
            style={styles.buttonView}
          >
            <Text
              style={{
                // Set the desired text color
                color: guiedText.color || "blue",
                fontSize: fontSize,
                fontWeight: "600",
              }}
            >
              {guiedText.text}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
  input: {
    width: Dimensions.get("window").width * 0.8,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  authenticationMessage: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 0xffffffee,
    justifyContent: "center",
    width: blockWidth,
    maxHeight: blockHeight,

    borderRadius: 9,

    paddingTop: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
    //centoring the bocks at the middle
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -blockWidth / 2 },
      { translateY: -blockHeight / 6 },
    ],
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonView: {
    // backgroundColor: 'blue', // Set the desired background color
    padding: 5,

    width: "60%", // Set the desired width
    height: 40, // Set the desired height
    alignItems: "center",
    borderTopColor: "balck",
    borderColor: "black",
    borderTopWidth: 0.6,
    justifyContent: "center", // Align cont
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
  },
  modalContent: {
    width: Dimensions.get("window").width * 0.8, // Set the desired width
    height: Dimensions.get("window").height * 0.5,
    padding: 16,
    borderRadius: 8,
    //borderWidth: 2,
    borderColor: "black",
    borderColor: "rgba(255, 255, 255, 0.7)",
    backgroundColor: "0 px px rgba(225, 225, 225, 0.9)",
    boxShadow: "0 0px 25px rgba(225, 225, 0, 0.9)",
  },
  countryInfo: {
    padding: 8,
    height: Dimensions.get("window").height * 0.1,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    justifyContent: "center",
    backgroundColor: "rgba(225, 225, 225, 0.9)",
  },
  countryButton: {
    borderRightColor: "gray",
    borderRightWidth: 1,
    justifyContent: "center",
    //  height:Dimensions.get("window").height*0.09,
    width: Dimensions.get("window").width * 0.19,
  },
  SendOTP: {
    width: Dimensions.get("window").width * 0.8,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  Phoneinput: {
    flexDirection: "row",
    width: "80%", // Set the desired width
    height: 50,
    //yellow
    backgroundColor: "rgba(255, 255, 255, 0.3)",

    marginBottom: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderColor: "gray",
    borderRadius: 8,
    borderWidth: 1,
  },
  infoCountainter: {
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.4,
    //backgroundColor:"rgba(225, 225, 225, 0.9)",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.3,
    borderRadius: 4000,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // backgroundColor: 'red', // You can change the color as desired
    justifyContent: "center",
    alignItems: "center",
  },
});
export default LogIn;
