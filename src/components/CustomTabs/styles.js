import { Platform, StyleSheet } from "react-native";
import { verticalScale } from "../../utils/styling";
import { colors, spacingY } from "../../constants/theme";

export default StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    width: "100%",
    height: Platform.OS === "ios" ? verticalScale(73) : verticalScale(60),
    backgroundColor: colors.neutral800,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: colors.neutral700,
    borderTopWidth: 1,
  },
  tabBarItem: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Platform.OS === "ios" ? spacingY._10 : spacingY._5,
  },
  tabLabel: {
    fontSize: 12,
    color: colors.neutral400,
    marginTop: 4,
  },
  tabLabelFocused: {
    color: colors.primary,
    fontWeight: "600",
  },
});
