import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet
} from "react-native";

// interface ButtonProps extends TouchableOpacityProps {
//   text: string;
// }

const Button: React.FC<TouchableOpacityProps> = props => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.textButton}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 42,
    backgroundColor: "#f05a4b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },

  textButton: { color: "#fff", fontWeight: "bold", fontSize: 16 }
});

export default Button;
