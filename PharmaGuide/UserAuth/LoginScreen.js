import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import firebase from "./firebaseConfig";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const handleSendOTP = async () => {
    try {
      const confirmationResult = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber);
      setConfirmation(confirmationResult);
      Alert.alert("Success", "OTP sent successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await confirmation.confirm(verificationCode);
      // Successful OTP verification
      Alert.alert("Success", "OTP verified successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Phone Number"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
      />

      {confirmation ? (
        <>
          <TextInput
            placeholder="Verification Code"
            onChangeText={setVerificationCode}
            value={verificationCode}
          />
          <Button title="Verify OTP" onPress={handleVerifyOTP} />
        </>
      ) : (
        <Button title="Send OTP" onPress={handleSendOTP} />
      )}
    </View>
  );
};

export default LoginScreen;
