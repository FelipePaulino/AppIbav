import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

export const ComeBack = styled.View`
  flex-direction: row;
`;

export const TitlePage = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  text-transform: uppercase;

  font-size: 14;
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
`;


export const TextText = styled.Text`
  color: #000
  text-transform: uppercase;
`;

export const Grid = styled.View`
  margin-bottom: 32;
`;

export const ContentC = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin: 0;
  padding: 0;
  width: 310;
  height: 40;
`;

export const IconC = styled(FontAwesome5)`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};
  margin-right: 20;
`;
