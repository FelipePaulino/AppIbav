import React from "react";
import * as S from "./styles";

export function HeaderComponent({ children }: any) {
  return (
    <S.Content>
      <S.Container>{children}</S.Container>
    </S.Content>
  );
}
