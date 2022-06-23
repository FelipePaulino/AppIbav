import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Content = styled(TouchableOpacity)`
  align-items: center;
  flex-direction: column;
`;

export const BackgroundIcon = styled.View`
  border-radius: 64;

  background-color: ${({ theme }) => theme.colors.red};

  height: 65;
  width: 65;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  max-width: 86;
  width: 100%;

  text-align: center;

  margin-top: 5;

  color: ${({ theme }) => theme.colors.grey};
`;
