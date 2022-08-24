import styled from "styled-components/native";

export interface Props {
  width?: any;
}

export const Heading = styled.View`
  align-items: flex-end;

  border-bottom-color: ${({ theme }) => theme.colors.red};
  border-bottom-width: 1;
`;

export const Titles = styled.View<Props>`
  flex-direction: row;
  width: ${({ width }) => (width ?? "40%")};;
`;

export const Title = styled.Text`
  margin-left: 10;

  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.blue};
`;
