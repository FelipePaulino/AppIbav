import { TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
export interface IContentProps extends TouchableOpacityProps {
  title: string;
  icon?: React.ComponentProps<typeof Feather>["name"];
  isLoading?: boolean;
  width?: string;
  heigth?: string;
  size?: string;
  color?: string;
  disabled?: any
}

export interface ISizeProps {
  width?: string;
  heigth?: string;
  size?: string;
  icon?: string;
}

export interface ISvgProps {
  icon?: boolean;
}