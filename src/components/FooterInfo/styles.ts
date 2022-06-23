import styled from "styled-components/native";

export const Footer = styled.View`
  padding-top: 25;
  margin-bottom: 15;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around
`;

export const Info = styled.Text`
font-size: 12px;
`;

export const Decoration = styled.Text`
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
  color: ${({ theme }) => theme.colors.blue};
`;
