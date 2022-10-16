import styled from "styled-components/native";
import theme from "../../styles/theme";

export interface Props {
  width?: any;
}

export const Heading = styled.View`
  align-items: flex-end;

  border-bottom-color: ${theme.colors.red};
  border-bottom-width: 1;
`;

export const Titles = styled.View<Props>`
  flex-direction: row;
  width: ${({ width }) => (width ?? "40%")};;
`;

export const Title = styled.Text`
  margin-left: 10;

  font-family: ${theme.fonts.fontFamily.bold};
  text-transform: uppercase;

  color: ${theme.colors.blue};
`;
