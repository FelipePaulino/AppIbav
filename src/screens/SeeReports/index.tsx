import React, { Fragment, useEffect, useState } from "react";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { ButtonComponent } from '../../components/Button'
import MenuNavigation from "../../common/constants/navigation";
import { Text } from 'react-native'
import { FontAwesome5 } from "@expo/vector-icons";
import RequestService from "../../common/services/RequestService";

import * as S from "./styles";

export function SeeReports() {
  const [reports, setReports] = useState<any>()

  const serviceGet = new RequestService()

  useEffect(() => {
    const getReports = async () => {
      await serviceGet.getReports().then((response) => {
        setReports(Object.values(response))
      })
    }

    getReports()
  }, []);

  return (
    <Fragment>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>
            {MenuNavigation.SEE_REPORTS}
          </S.TitlePage>
        </S.ComeBack>
      </HeaderComponent>

      <S.Container>
        <ButtonComponent title='FILTRAR' width='150px' icon="filter" color="white" />

        <S.ListContainer>
          {reports.map((item: any) => {
            return (
              <S.List>
                <Text>{item.numero_celula}-{item.lider} - {item.data}</Text>
                <FontAwesome5 name='eye' color='#000A3E' />
              </S.List>
            )
          })}
        </S.ListContainer>
      </S.Container>

    </Fragment>
  );
}
