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
import { connectApi } from "../../common/services/ConnectApi";
import axios from "axios";

const loadingGif = require("../../assets/loader-two.gif");

export default function NetworkScreenList() {
  const [celulas, setCelulas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showShearch, setShowShearch] = useState(false);
  const [everyOne, setEveryOne] = useState("Todos");
  const { state, dispatch } = useFormReport();

  const services = new RequestService();

  useEffect(() => {
    axios
      .get("https://app-ibav-f06f4-default-rtdb.firebaseio.com/users.json")
      .then((response) => {
        setCelulas(response?.data);
      });
  }, []);

  // const deleteMembers = (id: any) => {
  //   try {
  //     connectApi
  //       .delete(`/celulas/-N2xedBHXuOIZCzJEMw2/lider.json`)
  //       .then(() => {});
  //   } catch (err) {
  //     alert(err);
  //   }
  //   console.log(id, "id");
  // };
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

  const redes = celulas && Object.values(celulas).map((item: any) => item.rede);

  const redesUnicas = redes.filter((este: any, i: any) => {
    return redes.indexOf(este) === i;
  });

  const discipulado =
    celulas &&
    Object.values(celulas).filter((items: any) => {
      return items?.cargo === "discipulador";
    });

  const lider =
    celulas &&
    Object.values(celulas).filter((items: any) => {
      return items?.cargo === "lider";
    });

  const discipuladossUnicos = discipulado.map((items: any) => items?.nome);

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

  return (
    <Fragment>
      <HeaderComponent>
        <ComeBackComponent />
        <S.Navigation>{MenuNavigation.NETWORK}</S.Navigation>
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
                    labelSelect={state.redeSelect}
                    dataOptions={mapRedesUnicas}
                    selectedOption={handleRedeChange}
                    width="300px"
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
                    labelSelect={
                      state.discipuladoSelect
                        ? state.discipuladoSelect
                        : "Selecione"
                    }
                    dataOptions={state.redeSelect && mapDiscipuladosUnicos}
                    selectedOption={handleDiscipuladoChange}
                    width="300px"
                    disabled={
                      state.redeSelect === "Todos" ||
                      state.redeSelect === "Selecione"
                        ? true
                        : false
                    }
                  />
                </S.ContentC>
              </S.Grid>
              {state.redeSelect === "Todos" && (
                <>
                  <Text>Rede</Text>
                  <PersonLabelComponent nome={mapRedesUnicas[0].value} />
                </>
              )}
              {!state.discipuladoSelect && (
                <>
                  <Text>Discipulador</Text>
                  {discipulado.map((item: any) => {
                    return <PersonLabelComponent nome={item.nome} />;
                  })}
                </>
              )}
              {state.redeSelect &&
                state.discipuladoSelect && (
                  <>
                    <Text>Célula</Text>
                    {lider.map((item: any) => {
                      return <PersonLabelComponent nome={item.nome} />;
                    })}
                  </>
                )}
            </S.Form>
          </S.Content>
        </ScrollView>
      )}
    </Fragment>
  );
}
