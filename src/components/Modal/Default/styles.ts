import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

export const ContentModal = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  width: 100%;

  padding-left: 20;
  padding-right: 20;
  padding-bottom: 20;
  padding-top: 20;

  border-radius: 5;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.grey};

  text-align: center;
  font-size: ${({ theme }) => theme.fonts.fontSize.small};
`;

export const SubDescription = styled.Text`
  color: ${({ theme }) => theme.colors.red};
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.blue};
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};

  text-transform: uppercase;
`;

export const Success = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.blue};
  font-size: 48;

  margin-top: 10;

  text-align: center;
`;

export const InfoModal = styled.View`
  flex-direction: column;
  align-items: center;
`;
