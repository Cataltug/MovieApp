import { StyleSheet } from "react-native";
import { colors, spacingX, spacingY } from "../../constants/theme";
import { verticalScale } from "../../utils/styling";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacingY._15,
    paddingHorizontal: spacingX._20,
  },
  searchButton: {
    flex: 1,
    padding: spacingY._10,
    backgroundColor: colors.neutral700,
    borderRadius: 8,
    alignItems: "center",
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutral700,
    borderRadius: 8,
    paddingHorizontal: spacingX._10,
  },
  searchInput: {
    flex: 1,
    color: colors.white,
    height: verticalScale(36),
  },
  chip: {
    paddingHorizontal: spacingX._15,
    paddingVertical: spacingY._8,
    backgroundColor: colors.neutral700,
    borderRadius: 20,
    marginRight: spacingX._10,
  },
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._15,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral700,
  },
  touchableRow: {
    flex: 1,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: colors.neutral800,
    borderRadius: 8,
    padding: spacingY._20,
    maxHeight: "60%",
  },
  modalItem: {
    paddingVertical: spacingY._10,
  },
  modalList: {
    paddingBottom: spacingY._10,
  },
  modalItem: {
    paddingVertical: spacingY._10,
  },
});
