import React from "react";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import MenuNavigation from "../../common/constants/navigation";
import * as S from "./styles";

export function MultiplicationCelula() {
  return (
    <>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.MULTIPLICATION_CELULA}</S.TitlePage>
        </S.ComeBack>
      </HeaderComponent>
    </>
  );
}
