import React, { Fragment, useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

import FormFields from "../../common/constants/form";
import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";
import MenuNavigation from "../../common/constants/navigation";
import RequestService from "../../common/services/RequestService";

import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { SelectComponent } from "../../components/Select";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { PersonLabelComponent } from "../../components/PersonLabel";

import * as S from "./styles";

const loadingGif = require("../../assets/loader-two.gif");

export default function NetworkScreenList() {
  const [celulas, setCelulas] = useState([]);
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useFormReport();

  const services = new RequestService();

  useEffect(() => {
    const getCelulas = async () => {
      const response = await services.getCelulas();

      setCelulas(Object.values(response));
    };
    getCelulas();
  }, []);

  const handleRedeChange = (value: string) => {
    dispatch({
      type: FormReportActions.setRedeSelect,
      payload: value,
    });
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: null,
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: null,
    });
  };

  const handleDiscipuladoChange = (value: string) => {
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: value,
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: null,
    });
  };

  const redes = celulas.map((item: any) => item.rede);
  const redesUnicas = redes.filter((este: any, i: any) => {
    return redes.indexOf(este) === i;
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

  const mapRedesUnicas = redesUnicas.map((item: any) => {
    return {
      value: item,
    };
  });

  const usersPerNetwork = celulas.filter(
    (item: any) => item.rede === state.redeSelect
  );

  const usersPerDisciples = usersPerNetwork.filter(
    (item: any) => item.discipulador === state.discipuladoSelect
  );

  const netWork = state.redeSelect ? state.redeSelect : 'Todos';

  return (
    <Fragment>
      <HeaderComponent>
        <ComeBackComponent />
        <S.Navigation>{MenuNavigation.NETWORK}</S.Navigation>
        {/* <NotificationComponent /> */}
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <ScrollView>
          <S.Content>
            <S.Form behavior="position" enabled>
              <S.Grid>
                <TitleComponent
                  title={`${FormFields.NETWORK}:`}
                  small
                  primary
                />
                <S.ContentC>
                  <S.IconC name="vector-square" />
                  <SelectComponent
                    onChange={handleRedeChange}
                    labelSelect={netWork}
                    dataOptions={mapRedesUnicas}
                    selectedOption={handleRedeChange}
                    width="80%"
                  />
                </S.ContentC>
              </S.Grid>

              <S.Grid>
                <TitleComponent
                  title={`${FormFields.DISCIPLESHIP}:`}
                  small
                  primary
                />
                <S.ContentC>
                  <S.IconC name="network-wired" />
                  <SelectComponent
                    onChange={handleDiscipuladoChange}
                    labelSelect={state.discipuladoSelect}
                    dataOptions={state.redeSelect && mapDiscipuladosUnicos}
                    selectedOption={handleDiscipuladoChange}
                      width="80%"
                      disabled={state.redeSelect === "Todos" ? true : false}
                  />
                </S.ContentC>
              </S.Grid>

              <S.ContentButton>
                <ButtonComponent
                  title="Pesquisar"
                  width="50%"
                  disabled={state.redeSelect === "Todos"}
                />
              </S.ContentButton>
            </S.Form>

            {state.redeSelect !== "Todos" && state.discipuladoSelect === "Todos" && (
              <>
                <Text>Redes</Text>
                {usersPerNetwork.map((item: any) => {
                  return <PersonLabelComponent nome={item.discipulador} />;
                })}
              </>
            )}

            {state.redeSelect !== "Selecione" && state.discipuladoSelect !== "Selecione" && (
              <>
                <Text>Discipulados</Text>
                {usersPerDisciples.map((item: any) => {
                  return <PersonLabelComponent nome={item.lider} />;
                })}
              </>
            )}
          </S.Content>
        </ScrollView>
      )}
    </Fragment>
  );
}
