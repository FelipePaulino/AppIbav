import styled from "styled-components/native";

import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export const Material = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.light};
`;

export const Buttons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.grey};
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};
  text-transform: uppercase;
`;

export const Office = styled.Text`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fonts.fontSize.small};
  margin-top: -10;
`;

export const Names = styled.View`
  align-items: center;
  width: 100%;

  padding-bottom: 12;

  border-bottom-color: ${({ theme }) => theme.colors.grey};
  border-bottom-width: 1;
`;

export const Info = styled.View`
  width: 100%;

  align-items: center;

  margin-top: 24;
`;

export const InfoTextTitle = styled.Text`
  color: ${({ theme }) => theme.colors.blue};

  font-size: 16;
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
  text-transform: uppercase;
`;

export const InfoTextSubtitle = styled.Text`
  color: ${({ theme }) => theme.colors.grey};

  font-size: 16;
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
  text-transform: uppercase;

  margin-top: -8;
`;

export const ContentOptions = styled.View`
  width: 100%;
  margin-top: 24;

  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
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

  font-size: ${({ theme }) => theme.fonts.fontSize.large};
`;

export const ReportView = styled(FontAwesome5)`
  color: ${({ theme }) => theme.colors.light};

  font-size: ${({ theme }) => theme.fonts.fontSize.large};
`;

export const MultiplicationIcon = styled(MaterialCommunityIcons)`
  color: ${({ theme }) => theme.colors.light};

  font-size: ${({ theme }) => theme.fonts.fontSize.large};
`;

export const Loading = styled(Image)``;
