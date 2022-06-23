import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface props {
  status: string;
}

const typeStatus = (props: any) => {
  if (props.status === "membro") {
    return {
      Background: "#000A3E",
    };
  }

  if (props.status === "frequentador assiduo") {
    return {
      Background: "#00C637",
    };
  }

  if (props.status === "visitante") {
    return {
      Background: "#FF7E06",
    };
  }

  if (props.status === "aa") {
    return {
      Background: "#D30000",
    };
  }
};

export const Box = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding: 2px 5px;
  margin: 10px 0;

  border-bottom-color: ${({ theme }) => theme.colors.grey};
  border-bottom-width: 0.5;
`;

export const ContainerPerson = styled(TouchableOpacity)`
  flex-direction: column;
  align-items: flex-start;
`;

export const BoxName = styled.View``;

export const TextName = styled.Text`
  font-size: 14;
  line-height: 16;
  color: #666666;
`;

export const BoxStatus = styled.View<props>`
  background: ${(props) =>
    typeStatus(props)?.Background
      ? typeStatus(props)?.Background
      : props.theme.colors.light};
`;

export const TextStatus = styled.Text`
  font-size: 8;
  line-height: 9;
  color: #ffffff;
  padding: 2px 5px;
  text-transform: uppercase;
`;

export const Icon = styled(FontAwesome5)`
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};
`;
