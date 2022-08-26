import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import theme from "../../styles/theme";

import { IColorsProps } from "./types";

export const Label = styled.Text``;

export const Field = styled.View<IColorsProps>`
  border-bottom-color: ${(props) =>
    props.primary ? theme?.colors?.grey : theme?.colors?.light};
  border-bottom-width: 1;

  width: 100%;
  height: 48;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Input = styled.TextInput<IColorsProps>`
  width: 80%;
  padding-left: 16;

`;

export const Icons = styled.TouchableOpacity``;

export const Show = styled(Entypo)`
  font-size: ${theme.fonts.fontSize.medium};

  color: ${theme.colors.light};
`;

export const Hide = styled(Entypo)`
  font-size: ${theme.fonts.fontSize.medium};

  color: ${theme.colors.light};
`;

export const Icon = styled.View``;
