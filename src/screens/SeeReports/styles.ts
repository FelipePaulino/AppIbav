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

export const Container = styled.View`
  margin: 25px 25px 25px 25px;
`;

export const ListContainer = styled.View`
  margin-top: 20px;
`;

export const List = styled.View`
  margin-top: 15px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-bottom-color: #666;
  border-bottom-width: 1;
  padding-bottom: 5px;
`;

