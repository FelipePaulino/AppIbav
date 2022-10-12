import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const Content = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const Container = styled.View`
  background-color: white;
  width: 100%;

  padding-top: 15;
  padding-bottom: 15;
`;

export const ContentOptions = styled.View`
  padding-left: 15;
  padding-right: 15;
`;

export const Options = styled.TouchableOpacity`
  margin-bottom: 5;
`;

export const OptionSelect = styled.Text`
  font-size: ${theme.fonts.fontSize.small};
  text-transform: capitalize;

  padding-top: 5;
  padding-bottom: 5;

  text-align: center;

  width: 100%;
`;
