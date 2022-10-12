import { Image } from "react-native";
import styled from "styled-components/native";
import theme from "../../styles/theme";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: ${theme.colors.blue};
`;

export const Loading = styled(Image)``;
