import { StyleSheet } from "react-native";
import { colors, radius } from "../../constants/theme";

export default StyleSheet.create({
  button: {
    backgroundColor: colors.primaryDark,
    alignSelf: "flex-start",
    borderRadius: radius._12,
    borderCurve: "continuous",
    padding: 5,
  },
});
