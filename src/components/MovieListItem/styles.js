import { StyleSheet } from "react-native";
import { colors, spacingX, spacingY } from "../../constants/theme";
import { verticalScale } from "../../utils/styling";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacingY._15,
    paddingHorizontal: spacingX._20,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral700,
  },
  poster: {
    width: verticalScale(60),
    height: verticalScale(90),
    borderRadius: 4,
  },
  textContainer: {
    marginLeft: spacingX._15,
    flex: 1,
  },
});
