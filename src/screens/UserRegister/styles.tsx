import styled from "styled-components/native";

export const ComeBack = styled.View`
  flex-direction: row;
`;

export const TitlePage = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  text-transform: uppercase;

  font-size: 14;
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
`;

export const Main = styled.ScrollView`
  padding-left: 12;
  padding-right: 12;
  margin-top: 12
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

export const GridSelect = styled.View`
  margin-bottom: 10;
`;

export const FooterFields = styled.View`
  flex-direction: row;
  justify-content: space-between;

margin-top: 20;
  margin-bottom: 15;
`;

export const Required = styled.Text``;