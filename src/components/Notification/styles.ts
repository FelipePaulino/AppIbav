import styled from "styled-components/native";

import { Ionicons } from "@expo/vector-icons";

export const Notification = styled.TouchableOpacity`
  position: relative;
`;

export const Icon = styled(Ionicons)`
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};

  color: ${({ theme }) => theme.colors.light};
`;

export const Count = styled.View`
  position: absolute;
  right: 0;
  top: -5;

  background-color: ${({ theme }) => theme.colors.red};

  border-radius: 15;

  height: 15;
  width: 15;

  align-items: center;
  justify-content: center;
`;

export const Number = styled.Text`
  color: ${({ theme }) => theme.colors.light};

  font-size: 10;
`;
