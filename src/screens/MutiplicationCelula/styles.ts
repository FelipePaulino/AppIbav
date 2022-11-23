import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import theme from "../../styles/theme";

export const Content = styled.View`
  max-width: 350;
  width: 100%;
  height: 100%;

  margin-top: 32;
  margin-left: auto;
  margin-right: auto;
`;

export const ComeBack = styled.View`
  flex-direction: row;
`;

export const TitlePage = styled.Text`
  color: ${theme.colors.light};
  text-transform: uppercase;

  font-size: 14;
  font-family: ${theme.fonts.fontFamily.bold};
`;

export const TextText = styled.Text`
  color: #000;
  text-transform: uppercase;
`;

export const Grid = styled.View`
  margin-bottom: 32;
`;

export const GridForm = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const GridItem = styled.View`
  width: 48%;
  margin-bottom: 12;
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
  color: ${theme.colors.red};
  font-size: ${theme.fonts.fontSize.medium};
  margin-right: 20;
`;

export const Paragraph = styled.Text`
  color: #999;
  font-size: 12;
`;

export const labelParagraph = styled.View`
  padding: 3px;
  border-bottom-color: #999;
  border-bottom-width: 0.5;
`
