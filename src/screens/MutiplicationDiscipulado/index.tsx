import React from "react";
import { ScrollView } from "react-native";
import MenuNavigation from "../../common/constants/navigation";
import { ComeBackComponent } from "../../components/ComeBack";
import { HeaderComponent } from "../../components/Header";
import { TitleComponent } from "../../components/Title";

import * as S from "./styles";

export function MultiplicationDiscipulado() {
  return (
    <>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.MULTIPLICATION_DISCIPULADO}</S.TitlePage>
        </S.ComeBack>
      </HeaderComponent>
      <ScrollView>
        <S.Content>
          <S.Grid>
            <TitleComponent title={`Rede`} small primary />
            <S.ContentC>
              <S.IconC name="vector-square" />

            </S.ContentC>
          </S.Grid>
        </S.Content>
      </ScrollView>
    </>
  )
}
