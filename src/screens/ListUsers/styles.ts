import { Image } from "react-native";
import styled from "styled-components/native";

export const ComeBack = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ContentHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Navigation = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-size: ${({ theme }) => theme.fonts.fontSize.small};
`;

export const Container = styled.View`
  margin-top: 20;
  margin-bottom: 20;
  margin-right: 20;
  margin-left: 20;
`;

export const Loading = styled(Image)``;
