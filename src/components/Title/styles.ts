import styled from "styled-components/native";

import { IPrimaryColorProps } from "./types";

export const Small = styled.Text<IPrimaryColorProps>`
  color: ${(props) =>
    props.primary ? props.theme.colors.grey : props.theme.colors.light};
  font-size: ${({ theme }) => theme.fonts.fontSize.small};
  font-family: ${(props) =>
    props.weight
      ? props.theme.fonts.fontFamily.bold
      : props.theme.fonts.fontFamily.regular};
  letter-spacing: 1;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
`;

export const Medium = styled.Text<IPrimaryColorProps>`
  color: ${(props) =>
    props.primary ? props.theme.colors.grey : props.theme.colors.light};
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};
  font-family: ${(props) =>
    props.weight
      ? props.theme.fonts.fontFamily.bold
      : props.theme.fonts.fontFamily.regular};
  letter-spacing: 1;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
`;

export const Large = styled.Text<IPrimaryColorProps>`
  color: ${(props) =>
    props.primary ? props?.theme?.colors?.grey : props?.theme?.colors?.light};
  font-size: ${({ theme }) => theme?.fonts?.fontSize?.large};
  font-family: ${(props) =>
    props.weight
      ? props?.theme?.fonts?.fontFamily?.bold
      : props?.theme?.fonts?.fontFamily?.regular};
  letter-spacing: 1;
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
`;

export const Decoration = styled.Text<IPrimaryColorProps>`
  color: ${(props) =>
    props.red ? props.theme.colors.red : props.theme.colors.grey};
  font-size: 14;
  font-family: ${(props) =>
    props.weight
      ? props.theme.fonts.fontFamily.bold
      : props.theme.fonts.fontFamily.regular};
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
`;
