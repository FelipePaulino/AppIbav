import { Image } from "react-native";
import styled from "styled-components/native";

export const ComeBack = styled.View`
  flex-direction: row;
`;

export const TitlePage = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  text-transform: uppercase;

  font-size: 14;
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
`;

export const Container = styled.View`
  margin-top: 20;
  margin-bottom: 20;
  margin-right: 20;
  margin-left: 20;
`;

export const Loading = styled(Image)``;
