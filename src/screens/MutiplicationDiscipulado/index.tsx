import React from "react";
import { ScrollView } from "react-native";
import MenuNavigation from "../../common/constants/navigation";
import { ComeBackComponent } from "../../components/ComeBack";
import { HeaderComponent } from "../../components/Header";
import { SelectComponent } from "../../components/Select";
import { TitleComponent } from "../../components/Title";
import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";

import * as S from "./styles";
import { ButtonComponent } from "../../components/Button";

export function MultiplicationDiscipulado() {
  const { state, dispatch } = useFormReport();

  const handleRedeChange = (value: string) => {
    dispatch({
      type: FormReportActions.setRedeSelect,
      payload: value,
    });
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: "Selecione",
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: "Selecione",
    });
  };

  const handleDiscipuladoChange = (value: string) => {
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: value,
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: "Selecione",
    });
  };

  const handleCelulaChange = (value: string) => {
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: value,
    });
  };


  const mockRedes = [{ value: '1' }, { value: '2' }, { value: '3' }]

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
              <SelectComponent
                onChange={handleRedeChange}
                labelSelect={'Mock'}
                dataOptions={mockRedes}
                selectedOption={handleRedeChange}
                width="300"
              />
            </S.ContentC>
          </S.Grid>
          <S.Grid>
            <TitleComponent title={`Discipulado Atual:`} small primary />
            <S.ContentC>
              <S.IconC name="network-wired" />
              <SelectComponent
                onChange={handleDiscipuladoChange}
                labelSelect={'mock'}
                dataOptions={mockRedes}
                selectedOption={handleDiscipuladoChange}
                width="300"
                disabled={state.redeSelect === "Selecione" ? true : false}
              />
            </S.ContentC>
          </S.Grid>
          <S.Grid>
            <TitleComponent title={`Discipulado Novo:`} small primary />
            <S.ContentC>
              <S.IconC name="user-friends" />
              <SelectComponent
                onChange={handleCelulaChange}
                labelSelect={'mock'}
                dataOptions={mockRedes}
                selectedOption={handleCelulaChange}
                width="300"
                disabled={state.discipuladoSelect === "Selecione" ? true : false}
              />
            </S.ContentC>
          </S.Grid>
          <TitleComponent title={`CÉLULAS:`} small primary uppercase weight />
          <S.labelParagraph>
            <S.Paragraph>
              Selecione as células que vão para o novo discipulado
            </S.Paragraph>
          </S.labelParagraph>
          <S.Grid>

          </S.Grid>
          <ButtonComponent title="Multiplicar" onPress={() => { }} width="100%" />
        </S.Content>
      </ScrollView>
    </>
  )
}
