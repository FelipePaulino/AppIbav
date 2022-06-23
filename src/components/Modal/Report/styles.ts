import styled from "styled-components/native";

export const ContentModal = styled.View`
  background-color: ${({ theme }) => theme.colors.light};
  width: 100%;

  padding-left: 20;
  padding-right: 20;
  padding-bottom: 20;
  padding-top: 20;

  border-radius: 5;
`;

export const TitleModal = styled.Text`
  margin-bottom: 10;

  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
  font-size: ${({ theme }) => theme.fonts.fontSize.small};
  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.blue};

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
