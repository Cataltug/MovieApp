import { StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral900,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "50%",
    height: undefined,
    aspectRatio: 1,
  },
});
