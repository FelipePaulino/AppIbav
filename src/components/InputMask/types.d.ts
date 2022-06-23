import { TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
  mask: "cep" | "phone" | "currency";
  inputMaskChange: any;
  primary?: boolean;
}
