import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props {
  options: string[];
  selectedOptions: string[];
  onSelect: (option: string) => void;
}

const ThemeButtonGroup = ({ options, selectedOptions, onSelect }: Props) => {
  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => onSelect(option)}
          style={[
            styles.button,
            selectedOptions.includes(option) && {
              backgroundColor: primaryColor,
            },
          ]}
        >
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={[
              styles.buttonText,
              selectedOptions.includes(option) && { color: "white" },
            ]}
          >
            {option[0].toUpperCase() + option.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    flex: 1,
    backgroundColor: "#e0e0e0", // Fondo por defecto para botones no seleccionados
  },
  buttonText: {
    color: "#333", // Color del texto para botones no seleccionados
    fontSize: 16,
  },
});

export default ThemeButtonGroup;
