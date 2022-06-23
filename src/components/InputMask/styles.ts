import styled from "styled-components/native";
import { IColorsProps } from "../InputField/types";

export const Field = styled.View<IColorsProps>`
  border-bottom-color: ${({ theme }) => theme.colors.grey};
  border-bottom-width: 1;

  width: 100%;
  height: 48;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Input = styled.TextInput<IColorsProps>`
  color: ${(props) =>
    props.primary ? props?.theme?.colors?.grey : props?.theme?.colors?.light};

  width: 80%;

  padding-left: 16;
`;
