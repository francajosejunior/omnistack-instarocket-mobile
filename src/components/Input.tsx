import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import styles from "./../Styles";

const Input: React.FC<TextInputProps> = props => {
  return (
    <TextInput style={styles.input} placeholderTextColor="#999" {...props} />
  );
};

export default Input;
