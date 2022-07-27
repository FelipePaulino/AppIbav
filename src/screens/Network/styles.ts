import { Image } from "react-native";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";


export const ContainerNav = styled.View`
  flex-direction: row;
`;

export const Navigation = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  text-transform: uppercase;

  font-size: ${({ theme }) => theme.fonts.fontSize.small};
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
`;

export const Content = styled.View`
  max-width: 350;
  width: 100%;
  height: 100%;

  margin-top: 32;
  margin-left: auto;
  margin-right: auto;
`;

export const Form = styled.KeyboardAvoidingView`
  margin-top: 0;
  height: 100%;
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

export const DescriptionC = styled.Text`
  width: 100%;

  font-size: 14;
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
  color: ${({ theme }) => theme.colors.grey};
  text-transform: uppercase;

  border-bottom-color: ${({ theme }) => theme.colors.grey};
  border-bottom-width: 1;
`;

export const Observations = styled.TextInput`
  border-color: ${({ theme }) => theme.colors.grey};
  border-width: 1;

  padding-left: 10;
  padding-right: 10;

  margin-top: 15;
`;

export const ContentButton = styled.View`
  display: flex;
  align-items: flex-end;
`;

export const Loading = styled(Image)``;
