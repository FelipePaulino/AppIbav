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

export const Loading = styled(Image)``;

export const Heading = styled.View`
  align-items: center;
  margin-bottom: 20;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.blue};
`;

export const Celula = styled.Text`
  font-size: ${({ theme }) => theme.fonts.fontSize.small};
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
  text-transform: uppercase;
  margin-top: -10;
  color: ${({ theme }) => theme.colors.grey};
`;

export const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.blue};
`;

export const TextBold = styled.Text`
  font-weight: bold;
`;

export const TextCapitalize = styled.Text`
  text-transform: capitalize;
`;

export const SubtitlePresents = styled.Text`
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.blue};
  margin-top: 12px;
  margin-bottom: 17px;
`;

export const ContentName = styled.View`
  width: 50%;
`;

export const InfoName = styled.Text`
  font-size: 14;
  text-transform: uppercase;
`;

export const ContainerPresents = styled.View`
  flex-direction: row;
  height: 100%;
  width: 50%;
  justify-content: space-around;

`;

export const ContentPresent = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 7px 0;
  border-bottom-width: 1;
  border-bottom-color: #6666;
`;

export const Presents = styled.Text`
  margin-right: 10%;
`;

export const BoxText = styled.View`
  margin-bottom: 5px;
  flex-direction: row;
`;


