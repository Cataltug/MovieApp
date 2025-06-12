import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@react-navigation/elements";
import * as Icons from "phosphor-react-native";
import { colors } from "../../constants/theme";
import { verticalScale } from "../../utils/styling";
import styles from "./styles";

export default function CustomTabs({ state, descriptors, navigation }) {
  const iconMap = {
    HomeTab: (focused) => (
      <Icons.House
        size={verticalScale(30)}
        weight={focused ? "fill" : "regular"}
        color={focused ? colors.primary : colors.neutral400}
      />
    ),
    FavoritesTab: (focused) => (
      <Icons.Heart
        size={verticalScale(30)}
        weight={focused ? "fill" : "regular"}
        color={focused ? colors.primary : colors.neutral400}
      />
    ),
    SearchTab: (focused) => (
      <Icons.MagnifyingGlass
        size={verticalScale(30)}
        weight={focused ? "fill" : "regular"}
        color={focused ? colors.primary : colors.neutral400}
      />
    ),
    ProfileTab: (focused) => (
      <Icons.UserCircle
        size={verticalScale(30)}
        weight={focused ? "fill" : "regular"}
        color={focused ? colors.primary : colors.neutral400}
      />
    ),
  };

  const labelMap = {
    HomeTab: "Home",
    FavoritesTab: "Favorites",
    SearchTab: "Search",
    ProfileTab: "Profile",
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const iconRenderer = iconMap[route.name];
        const label = labelMap[route.name] ?? route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const onLongPress = () => {
          navigation.emit({ type: "tabLongPress", target: route.key });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            {iconRenderer?.(isFocused)}
            <Text
              style={[
                styles.tabLabel,
                isFocused ? styles.tabLabelFocused : null,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
