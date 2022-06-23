import styled from "styled-components/native";
import { Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export const Logout = styled(MaterialIcons)`
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};

  color: ${({ theme }) => theme.colors.light};
`;

export const Navigation = styled.Text`
  color: ${({ theme }) => theme.colors.light};

  font-size: ${({ theme }) => theme.fonts.fontSize.small};
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;

  max-width: 350;
  width: 100%;

  margin-top: 32;
  margin-left: auto;
  margin-right: auto;
`;

export const Names = styled.View`
  align-items: center;
  width: 100%;

  border-bottom-color: ${({ theme }) => theme.colors.grey};
  border-bottom-width: 1;
`;

export const Info = styled.View`
  width: 100%;

  align-items: center;

  margin-top: 24;
`;

export const ContentOptions = styled.View`
  width: 100%;
  margin-top: 24;

  flex-direction: row;
  justify-content: space-between;
`;

export const SendReportIcon = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.light};

  font-size: ${({ theme }) => theme.fonts.fontSize.large};
`;

export const MembersIcon = styled(FontAwesome5)`
  color: ${({ theme }) => theme.colors.light};

  font-size: ${({ theme }) => theme.fonts.fontSize.large};
`;

export const RegisterIcon = styled(FontAwesome5)`
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
