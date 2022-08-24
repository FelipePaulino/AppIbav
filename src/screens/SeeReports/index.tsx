import React, { Fragment, useEffect, useState } from "react";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { ButtonComponent } from "../../components/Button";
import MenuNavigation from "../../common/constants/navigation";
import { ScrollView, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import RequestService from "../../common/services/RequestService";
import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";
import { useNavigation } from "@react-navigation/native";
import { IPropsAppStack } from "../../routes/AppStack/types";

import * as S from "./styles";

const loadingGif = require("../../assets/loader-two.gif");

export function SeeReports() {
  const [reports, setReports] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const { dispatch } = useFormReport();
  const navigation = useNavigation<IPropsAppStack>();
  const serviceGet = new RequestService();

  useEffect(() => {
    setLoading(true);
    const getReports = async () => {
      await serviceGet.getReports().then((response) => {
        setLoading(false);
        setReports(Object.entries(response));
      });
    };

    getReports();
  }, []);

  const actionReportId = (id: string) => {
    dispatch({
      type: FormReportActions.setReportsId,
      payload: id,
    });
    navigation.navigate("SingleReport");
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
        <S.Container>
          <ButtonComponent
            title="FILTRAR"
            width="150px"
            icon="filter"
            color="white"
          />
          {loading ? (
            <S.Loading source={loadingGif}></S.Loading>
          ) : (
            <S.ListContainer>
              {reports?.map((item: any) => {
                return (
                  <S.List>
                    <Text onPress={() => actionReportId(item[0])}>
                      {item[1].celula} - {item[1].data}
                    </Text>
                    <FontAwesome5 name="eye" color="#000A3E" />
                  </S.List>
                );
              })}
            </S.ListContainer>
          )}
        </S.Container>
      </ScrollView>
    </Fragment>
  );
}
