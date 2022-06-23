import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";

import { IColorsProps } from "./types";

export const Label = styled.Text``;

export const Field = styled.View<IColorsProps>`
  border-bottom-color: ${(props) =>
    props.primary ? props?.theme?.colors?.grey : props?.theme?.colors?.light};
  border-bottom-width: 1;

  width: 100%;
  height: 48;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Input = styled.TextInput<IColorsProps>`
  color: ${({ theme, primary }) =>
    primary ? theme.colors?.grey : theme.colors?.light};

  width: 80%;

  padding-left: 16;
`;

export const Icons = styled.TouchableOpacity``;

export const Show = styled(Entypo)`
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};

  color: ${({ theme }) => theme.colors.light};
`;

export const Hide = styled(Entypo)`
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};

  color: ${({ theme }) => theme.colors.light};
`;

export const Icon = styled.View``;
