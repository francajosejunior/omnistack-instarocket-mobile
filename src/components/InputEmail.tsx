import React from "react";
import { TextInputProps } from "react-native";
import Input from "./Input";

const InputEmail: React.FC<TextInputProps> = props => {
  return (
    <Input
      placeholder="Seu e-mail"
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      {...props}
    />
  );
};

export default InputEmail;
