import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

import { ISizeProps, ISvgProps } from "./types";

export const Content = styled.TouchableOpacity<ISizeProps>`
  height: ${({ heigth }) => (heigth ? heigth : "48")};
  width: ${({ width }) => (width ? width : "100%")};

  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : "#A60100"};
  border-radius: 10;
`;

export const Background = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;

  width: 100%;
  height: 100%;

  border-radius: 10;
`;

export const BoxIcon = styled.View<ISvgProps>`
  margin-right: ${({ icon }) => (icon ? "5" : "0")};
`;

export const Title = styled.Text<ISizeProps>`
  font-size: ${({ size, theme }) =>
    size ? size : theme.fonts.fontSize.small};
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};

  text-transform: uppercase;
  letter-spacing: 1;

  color: ${({ theme }) => theme.colors.light};
`;
