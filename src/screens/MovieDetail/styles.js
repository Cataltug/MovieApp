import { Dimensions, StyleSheet } from "react-native";
import { colors, spacingX, spacingY } from "../../constants/theme";
import { verticalScale } from "../../utils/styling";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const POSTER_WIDTH = SCREEN_WIDTH;
const POSTER_RATIO = 1.4;
const POSTER_HEIGHT = POSTER_WIDTH * POSTER_RATIO;

export default StyleSheet.create({
  headerBg: {
    width: "100%",
    height: POSTER_HEIGHT,
    position: "relative",
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  headerRow: {
    position: "absolute",
    top: spacingY._10,
    left: spacingX._20,
    right: spacingX._20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  headerContent: {
    position: "absolute",
    bottom: spacingY._20,
    left: spacingX._20,
    right: spacingX._20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacingY._2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.textLight,
    marginHorizontal: 8,
  },
  genres: { flexDirection: "row", flexWrap: "wrap", marginTop: spacingY._5 },
  genre: { marginRight: spacingX._10, marginBottom: spacingY._10 },
  castItem: {
    width: verticalScale(80),
    marginRight: spacingX._15,
    alignItems: "center",
  },
  castPhoto: {
    width: verticalScale(80),
    height: verticalScale(80),
    borderRadius: 40,
    overflow: "hidden",
  },
});
