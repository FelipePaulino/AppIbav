import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

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
};

export const Box = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding: 2px 5px;
  margin: 10px 0;

  border-bottom-color: ${({ theme }) => theme.colors.grey};
  border-bottom-width: 0.5;
`;

export const ContainerPerson = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const TextName = styled.Text`
  text-transform: uppercase;
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

export const IconContent = styled.View`
  justify-content: space-between;
  flex-direction: row;
`

export const SpacingIcon = styled.View`
margin: 5px 0 0 25px;
`

export const Icon = styled(FontAwesome)`
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};
`;

export const IconEdit = styled(FontAwesome)`
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};
`;
