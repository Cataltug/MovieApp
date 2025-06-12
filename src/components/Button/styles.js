import { StyleSheet } from "react-native";
import { colors, radius } from "../../constants/theme";
import { verticalScale } from "../../utils/styling";

export default StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius._17,
    borderCurve: "continuous",
    height: verticalScale(40),
    width: verticalScale(275),
    justifyContent: "center",
    alignItems: "center",
  },
});
