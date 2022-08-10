import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

export const Container = styled.View`
  margin: 0 20px;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const Division = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Navigation = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-size: ${({ theme }) => theme.fonts.fontSize.small};
`;

export const RegisterIcon = styled(FontAwesome5)`
  color: ${({ theme }) => theme.colors.light};
  font-size: ${({ theme }) => theme.fonts.fontSize.small};
`;

export const Information = styled.View`
  margin: 0 0 10px 0;
`;

export const BoxPrimary = styled.View`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Form = styled.View`
  padding-left: 15;
  padding-right: 15;
  margin-top: 15;
`;

export const GridDate = styled.View`
  width: 48%;
  height: 58%;
  background: red;
`;

export const GridForm = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const GridItem = styled.View`
  width: 48%;
  margin-bottom: 12;
`;

export const GridItemFull = styled.View`
  width: 100%;
  margin-bottom: 5;
`;

export const GridItemLarge = styled.View`
  width: 73%;
  margin-bottom: 12;
`;

export const GridItemSmall = styled.View`
  width: 25%;
  margin-bottom: 12;
`;

export const FooterFields = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 15;
  padding-right: 15;
  margin-bottom: 15;
`;

export const Required = styled.Text`
  font-size: 8px;
`;