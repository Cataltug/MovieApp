import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar, View } from "react-native";
import React from "react";
import { colors } from "../../constants/theme";

function SafeScreen(props) {
  const { top, bottom } = useSafeAreaInsets();
  const { children, applyTopMargin = true } = props;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: applyTopMargin ? top : 0,
        paddingBottom: bottom,
        backgroundColor: colors.neutral900,
      }}
    >
      <StatusBar barStyle="light-content" />
      {children}
    </View>
  );
}

export default SafeScreen;
