import React, { Fragment, useEffect, useState } from "react";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { ButtonComponent } from "../../components/Button";
import MenuNavigation from "../../common/constants/navigation";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import RequestService from "../../common/services/RequestService";
import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";

import * as S from "../SingleReport/styles";

const loadingGif = require("../../assets/loader-two.gif");

export function SingleReport() {
  const [report, setReport] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const { state, dispatch } = useFormReport();

  const serviceGet = new RequestService();

  useEffect(() => {
    setLoading(true);
    const getSingleReports = async () => {
      await serviceGet
        .getSingleReport(state.reportsId)
        .then((response: any) => {
          setLoading(false);
          setReport(response);
        });
    };

    getSingleReports();
  }, []);

  console.log(report, "report");

  const actionReportId = (id: string) => {
    dispatch({
      type: FormReportActions.setReportsId,
      payload: id,
    });
  };

  return (
    <Fragment>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.SEE_REPORTS}</S.TitlePage>
        </S.ComeBack>
      </HeaderComponent>
      <ScrollView>
        {loading ? (
          <S.Loading source={loadingGif}></S.Loading>
        ) : (
          <>
            <S.Heading>
              <S.Title>Célula</S.Title>
              <S.Subtitle>{report?.celula}</S.Subtitle>
            </S.Heading>
            <S.Title>Dados</S.Title>
            <Text>Rede: {report?.rede}</Text>
            <Text>Discipulado: {report?.discipulado}</Text>
            <Text>Data: {report?.data}</Text>
            <Text>Oferta: R${report?.oferta}</Text>
            <Text>Observações: {report?.observacoes}</Text>
            <S.Title>Presenças</S.Title>
          </>
        )}
      </ScrollView>
    </Fragment>
  );
}
