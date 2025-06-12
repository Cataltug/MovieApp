import { View } from "react-native";
import React from "react";
import SafeScreen from "../../components/SafeScreen";
import Button from "../../components/Button";
import Typo from "../../components/Typo";
import { colors } from "../../constants/theme";
import { deleteAccount, signOut } from "firebase/auth";
import { auth } from "../../../config/Firebase/firebase";
import { useAuth } from "../../../contexts/authContext";

const Profile = () => {
  const { logout, deleteAccount } = useAuth();

  const handleLogout = async () => {
    await logout(); //
  };

  const handleDeleteAccount = async () => {
    await deleteAccount(); //
  };

  return (
    <SafeScreen>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Button onPress={handleLogout}>
          <Typo color={colors.neutral900} fontWeight="600">
            Logout
          </Typo>
        </Button>

        <Button onPress={handleDeleteAccount}>
          <Typo color={colors.neutral900} fontWeight="600">
            Delete Account
          </Typo>
        </Button>
      </View>
    </SafeScreen>
  );
};

export default Profile;
