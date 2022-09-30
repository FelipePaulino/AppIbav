import styled from "styled-components/native";
import { Image } from "react-native";
import theme from "../../styles/theme";

export const ComeBack = styled.View`
  flex-direction: row;
`;

export const TitlePage = styled.Text`
  color: ${theme.colors.light};
  text-transform: uppercase;

  font-size: 14;
  font-family: ${theme.fonts.fontFamily.bold};
`;

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const BoxSelect = styled.View`
  margin-bottom: 10;
`;

export const Form = styled.View`
  padding-left: 15;
  padding-right: 15;

  margin-top: 15;
`;

export const GridForm = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  margin-bottom: 12;
`;

export const GridItem = styled.View`
  width: 48%;
`;

export const GridItemLarge = styled.View`
  width: 73%;
`;

export const GridItemSmall = styled.View`
  width: 25%;
`;

export const FooterFields = styled.View`
  flex-direction: row;
  justify-content: space-between;

  padding-left: 15;
  padding-right: 15;
 
  margin-top: 20;
  margin-bottom: 15;
`;

export const Required = styled.Text``;

export const Loading = styled(Image)``;
