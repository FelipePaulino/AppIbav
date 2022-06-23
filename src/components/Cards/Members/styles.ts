import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 48;
  width: 100%;

  border-bottom-color: ${({ theme }) => theme.colors.grey};
  border-bottom-width: 1;
`;

export const ContentName = styled.View`
  width: 60%;
`;

export const InfoName = styled.Text`
  color: ${({ theme }) => theme.colors.grey};

  font-size: 14;
  text-transform: uppercase;
`;

export const ContainerSelect = styled.View`
  flex-direction: row;
  height: 100%;
  width: 40%;
`;

export const BoxSelect = styled.View`
margin-left: 10;
`;

export const ContentPresent = styled.View``;
