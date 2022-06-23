import styled from "styled-components/native";
import { IDataProps } from './types'

export const Navigation = styled.Text<IDataProps>`
  text-transform: uppercase;

  color: ${({ disabled }) => disabled ? 'grey' : '#F2F2F2'};
  font-size: 14;
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};

`;
