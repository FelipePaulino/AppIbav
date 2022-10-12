import styled from "styled-components/native";

import { IPrimaryColorProps } from "./types";
import theme from "../../styles/theme";

export const Small = styled.Text<IPrimaryColorProps>`
  color: ${(props) =>
    props.primary ? theme.colors.grey : theme.colors.light};
  font-size: ${theme.fonts.fontSize.small};
  font-family: ${(props) =>
    props.weight
      ? theme.fonts.fontFamily.bold
      : theme.fonts.fontFamily.regular};
  letter-spacing: 1;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
`;

export const Medium = styled.Text<IPrimaryColorProps>`
  color: ${(props) =>
    props.primary ? theme.colors.grey : theme.colors.light};
  font-size: ${theme.fonts.fontSize.medium};
  font-family: ${(props) =>
    props.weight
      ? theme.fonts.fontFamily.bold
      : theme.fonts.fontFamily.regular};
  letter-spacing: 1;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
`;

export const Large = styled.Text<IPrimaryColorProps>`
  color: ${(props) =>
    props.primary ? theme?.colors?.grey : theme?.colors?.light};
  font-size: ${theme?.fonts?.fontSize?.large};
  font-family: ${(props) =>
    props.weight
      ? theme?.fonts?.fontFamily?.bold
      : theme?.fonts?.fontFamily?.regular};
  letter-spacing: 1;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
`;

export const Decoration = styled.Text<IPrimaryColorProps>`
  color: ${(props) =>
    props.red ? theme.colors.red : theme.colors.grey};
  font-size: 14;
  font-family: ${(props) =>
    props.weight
      ? theme.fonts.fontFamily.bold
      : theme.fonts.fontFamily.regular};
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
`;
