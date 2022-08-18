import styled from "styled-components/native";
import { Image } from "react-native";

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
  margin: 25px 25px 25px 25px;
`;

export const ListContainer = styled.View`
  margin-top: 20px;
`;

export const List = styled.View`
  margin-top: 15px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-bottom-color: #666;
  border-bottom-width: 1;
  padding-bottom: 5px;
`;

export const Loading = styled(Image)``;

export const Heading = styled.View`
  align-items: center;
  margin-bottom: 20;
  margin-top: 20;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};

  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.blue};
`;

export const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.fontSize.small};
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};

  text-transform: uppercase;
  margin-top: -10;
  color: ${({ theme }) => theme.colors.grey};
`;


