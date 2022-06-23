import styled from "styled-components/native";
import { Image } from "react-native";

export const Navigation = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  text-transform: capitalize;

  font-size: ${({ theme }) => theme.fonts.fontSize.small};
`;

export const Content = styled.View`
  flex: 1;

  max-width: 350;
  width: 100%;
  margin-top: 20;
  margin-left: auto;
  margin-right: auto;
`;

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

export const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.fontSize.small};
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};

  text-transform: uppercase;
  margin-top: -10;
  color: ${({ theme }) => theme.colors.grey};
`;

export const Button = styled.View`
  justify-content: flex-end;
  margin-bottom: 20;
`;

export const Loading = styled(Image)``;
