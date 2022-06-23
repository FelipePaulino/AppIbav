import styled from "styled-components/native";

export const Navigation = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  text-transform: uppercase;

  font-size: 14;
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
`;
