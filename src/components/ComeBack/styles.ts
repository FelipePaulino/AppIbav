import styled from "styled-components/native";

import { MaterialIcons } from "@expo/vector-icons";

export const ArrowLeft = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.light};

  font-size: ${({ theme }) => theme.fonts.fontSize.medium};
`;
