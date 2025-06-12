import { StyleSheet } from "react-native";
import { colors, spacingX, spacingY } from "../../constants/theme";
import { verticalScale } from "../../utils/styling";

export default StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacingY._15,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral700,
    marginBottom: spacingY._15,
  },

  gridContainer: {
    paddingBottom: spacingY._20,
  },
  gridRow: {
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
    marginBottom: spacingY._20,
  },
  gridItem: {
    flex: 1,
    marginHorizontal: spacingX._5,
  },
  gridImage: {
    width: "100%",
    height: verticalScale(200),
    borderRadius: 8,
  },
});
