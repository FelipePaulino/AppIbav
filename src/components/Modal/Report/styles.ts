import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const ContentModal = styled.View`
  background-color: ${theme.colors.light};
  width: 100%;

  padding-left: 20;
  padding-right: 20;
  padding-bottom: 20;
  padding-top: 20;

  border-radius: 5;
`;

export const TitleModal = styled.Text`
  margin-bottom: 10;

  font-family: ${theme.fonts.fontFamily.bold};
  font-size: ${theme.fonts.fontSize.small};
  text-transform: uppercase;

  color: ${theme.colors.blue};

  text-align: center;
`;

export const ListModal = styled.View``;

export const ObservationModal = styled.View`
  margin-top: 20;
  margin-bottom: 20;
`;

export const BoxButton = styled.View`
flex-direction: row;
justify-content: space-between;
`;

export const BoxTitle = styled.View`
flex-direction: row;
flex-wrap: wrap;
`;
