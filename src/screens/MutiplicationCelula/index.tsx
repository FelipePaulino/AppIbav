import React, { useEffect, useState } from "react";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import MenuNavigation from "../../common/constants/navigation";
import { SelectComponent } from "../../components/Select";
import { TitleComponent } from "../../components/Title";
import * as S from "./styles";
import { TextSelect } from "../../components/Date/styles";
import { useFormReport } from "../../hooks/useFormReport";
import { connectApi } from "../../common/services/ConnectApi";
import { FormReportActions } from "../../contexts/FormReport";
import useUserFiltered from "../../hooks/useUserFiltered";

export function MultiplicationCelula() {
  const [celulas, setCelulas] = useState<any>([]);
  const [celulasSelected, setCelulaSelected] = useState<any>();
  const [listCelula, setListCelula] = useState<any>([]);
  const { state, dispatch } = useFormReport();
  const { user, loading } = useUserFiltered();

  const userInfo = user && user[0][1];
  const whatOffice = userInfo && userInfo.cargo;

  useEffect(() => {
    if (whatOffice !== "lider") {
      const getCelulas = async () => {
        const response = await connectApi.get("/celulas.json");

        setCelulas(Object.values(response.data));
      };
      getCelulas();
    }
  }, []);

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

  const selectedOptionCelula = (value: string) => {
    setCelulaSelected(value);
    dispatch({
      type: FormReportActions.setTextSelectCelula,
      payload: value,
    });
  };

  // tratativas para o usuário administrador
  const redes = celulas.map((item: any) => item.rede);
  const redesUnicas = redes.filter(function (este: any, i: any) {
    return redes.indexOf(este) === i;
  });

  const mapRedesUnicas = redesUnicas.map((item: any) => {
    return {
      value: item,
    };
  });

  const filtrandoRedes = celulas.filter((item: any) => {
    return item.rede === state.redeSelect;
  });

  const discipulado = filtrandoRedes.map((item: any) => item.discipulador);

  const discipuladossUnicos = discipulado.filter(function (este: any, i: any) {
    return discipulado.indexOf(este) === i;
  });

  const mapDiscipuladosUnicos = discipuladossUnicos.map((item: any) => {
    return {
      value: item,
    };
  });

  const filtrandoDiscipulado = celulas.filter((item: any) => {
    return (
      item.discipulador === state.discipuladoSelect &&
      item.rede === state.redeSelect
    );
  });
  const celulaAdm = filtrandoDiscipulado.map((item: any) => {
    return {
      value: `${item.numero_celula} - ${item.lider}`,
    };
  });

  useEffect(() => {
    const listMembers: any = Object.values(celulas).filter((item: any) => {
      return celulasSelected === `${item.numero_celula} - ${item.lider}`;
    });
    setListCelula(listMembers[0]?.membros);
  }, [celulasSelected]);
  
  return (
    <>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.MULTIPLICATION_CELULA}</S.TitlePage>
        </S.ComeBack>
      </HeaderComponent>
      <S.Grid>
        <TitleComponent title={`Teste`} small primary />
        <S.ContentC>
          <S.IconC name="vector-square" />
          <SelectComponent
            onChange={handleRedeChange}
            labelSelect={state.redeSelect}
            dataOptions={mapRedesUnicas}
            selectedOption={handleRedeChange}
            width="300"
          />
        </S.ContentC>
      </S.Grid>
      <S.Grid>
        <TitleComponent title={`Teste 2`} small primary />
        <S.ContentC>
          <S.IconC name="network-wired" />
          <SelectComponent
            onChange={handleDiscipuladoChange}
            labelSelect={state.discipuladoSelect}
            dataOptions={state.redeSelect && mapDiscipuladosUnicos}
            selectedOption={handleDiscipuladoChange}
            width="300"
            disabled={state.redeSelect === "Selecione" ? true : false}
          />
        </S.ContentC>
      </S.Grid>
      <S.Grid>
        <TitleComponent title={`Celula`} small primary />
        <S.ContentC>
          <S.IconC name="user-friends" />
          <SelectComponent
            onChange={handleCelulaChange}
            labelSelect={state.celulaSelect}
            dataOptions={celulaAdm}
            selectedOption={selectedOptionCelula}
            width="300"
            disabled={state.discipuladoSelect === "Selecione" ? true : false}
          />
        </S.ContentC>
      </S.Grid>
      <S.Grid>
        {listCelula &&
          Object.values(listCelula).map((item: any) => {
            console.log(item, "item");
            return <S.TextText>{item.nome}</S.TextText>;
          })}
      </S.Grid>
    </>
  );
}
