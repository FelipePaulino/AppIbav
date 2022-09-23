import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";

export type IContentInputProps = TextInputProps & {
  icon?: React.ComponentProps<typeof Feather>["name"];
  value?: string | undefined;
  primary?: boolean;
  label?: string;
  showPass?: () => void;
};

export type IColorsProps = {
  primary?: boolean;
};
