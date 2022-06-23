import styled from "styled-components/native";

export const Content = styled.View`
  max-height: 100;
  height: 100%;

  justify-content: center;

  background-color: ${({ theme }) => theme.colors.blue};

  padding: 0 16px;
`;

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  margin-top: 10;
`;
