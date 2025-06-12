import { StyleSheet } from "react-native";
import { verticalScale } from "../../utils/styling";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

export default StyleSheet.create({
  card: {
    width: WINDOW_WIDTH * 0.7,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: verticalScale(180),
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    textAlign: "center",
  },
});
