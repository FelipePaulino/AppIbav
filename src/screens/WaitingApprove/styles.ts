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
    padding-left: 10;
    padding-right: 10;
    padding-top: 20;
`;

export const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 10;
    padding-bottom: 10;

    border-bottom-color: ${({ theme }) => theme.colors.grey};
    border-bottom-width: 1;
`;

export const RowText = styled.Text`
    font-size: 12;
`;

export const Decoration = styled.Text`
    font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
    color: ${({ theme }) => theme.colors.grey};
`;

export const RowDetails = styled.Text`
    color: ${({ theme }) => theme.colors.red};
`;

export const Loading = styled(Image)``;
