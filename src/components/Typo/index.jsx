import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import { colors } from "../../constants/theme";
import { verticalScale } from "../../utils/styling";

const Typo = ({
  size,
  color = colors.text,
  fontWeight = "400",
  children,
  style,
  ...textProps
}) => {
  const textStyle = {
    fontSize: size ? verticalScale(size) : verticalScale(18),
    color,
    fontWeight,
  };

  return (
    <Text style={[textStyle, style]} {...textProps}>
      {children}
    </Text>
  );
};

Typo.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  fontWeight: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Typo.defaultProps = {
  color: colors.text,
  fontWeight: "400",
};

export default Typo;

const styles = StyleSheet.create({});
