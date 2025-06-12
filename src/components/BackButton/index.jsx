import { TouchableOpacity } from "react-native";
import React from "react";
import { CaretLeft } from "phosphor-react-native";
import { verticalScale } from "../../utils/styling";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/theme";
import styles from "./styles";

const BackButton = ({ style, iconSize = 26 }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.button, style]}
    >
      <CaretLeft
        size={verticalScale(iconSize)}
        color={colors.white}
        weight="bold"
      />
    </TouchableOpacity>
  );
};

export default BackButton;
