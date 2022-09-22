import React, { Fragment, useEffect, useState } from "react";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import MenuNavigation from "../../common/constants/navigation";
import { ScrollView, Text } from "react-native";
import RequestService from "../../common/services/RequestService";
import { useFormReport } from "../../hooks/useFormReport";
import { HeadingPresentComponent } from "../../components/HeadingPresent";

import * as S from "../SingleReport/styles";

const loadingGif = require("../../assets/loader-two.gif");

export function SingleReport() {
  const [report, setReport] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const { state } = useFormReport();

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

  const category = (value: string) => {
    switch (value) {
      case "visitante":
        return "V";
      case "membro":
        return "ME";
      case "frequentador assiduo":
        return "FA";
    }
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
          <S.Container>
            <S.Heading>
              <S.Title>Célula</S.Title>
              <S.Celula>{report?.celula}</S.Celula>
            </S.Heading>
            <S.Subtitle>Dados</S.Subtitle>
            <S.BoxText>
              <S.TextBold>Rede: </S.TextBold>
              <S.TextCapitalize>{report?.rede}</S.TextCapitalize>
            </S.BoxText>
            <S.BoxText>
              <S.TextBold>Discipulado: </S.TextBold>
              <S.TextCapitalize>{report?.discipulado}</S.TextCapitalize>
            </S.BoxText>
            <S.BoxText>
              <S.TextBold>Data:</S.TextBold>
              <Text> {report?.data}</Text>
            </S.BoxText>
            <S.BoxText>
              <S.TextBold>Oferta:</S.TextBold>
              <Text> R${report?.oferta}</Text>
            </S.BoxText>
            <S.BoxText>
              <S.TextBold>Observações:</S.TextBold>
              <Text> {report?.observacoes}</Text>
            </S.BoxText>
            <S.SubtitlePresents>Presenças</S.SubtitlePresents>
            <HeadingPresentComponent cat width="50%" />
            {report?.presencas.map((person: any) => {
              return (
                <S.ContentPresent>
                  <S.ContentName>
                    <S.InfoName>{person.nome}</S.InfoName>
                  </S.ContentName>
                  <S.ContainerPresents>
                    <Text>{category(person.status)}</Text>
                    <Text>{person.celula}</Text>
                    <S.Presents>{person.culto}</S.Presents>
                  </S.ContainerPresents>
                </S.ContentPresent>
              );
            })}
          </S.Container>
        )}
      </ScrollView>
    </Fragment>
  );
}
