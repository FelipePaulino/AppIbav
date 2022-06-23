import React, { Fragment, useEffect, useState } from "react";

import MenuNavigation from "../../common/constants/navigation";

import { ButtonComponent } from "../../components/Button";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
// import { NotificationComponent } from "../../components/Notification";

const loadingGif = require("../../assets/loader-two.gif");

import * as S from "./styles";

export function DetailsScreen() {
  const [loading, setLoading] = useState(false);

  return (
    <Fragment>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.DETAILS}</S.TitlePage>
        </S.ComeBack>

        {/* <NotificationComponent /> */}
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <S.Container>
          <S.HeaderButtons>
            <ButtonComponent title="Rejeitar" width='150' icon="thumbs-up" color="#FFFFFF" />
            <ButtonComponent title="Aprovar" width='150' icon="thumbs-down" color="#FFFFFF" />
          </S.HeaderButtons>

          <S.HeaderInfo>
            <S.GroupName>
              <S.TitleInfo>Usuário:</S.TitleInfo>
              <S.NameInfo> felipepaulino</S.NameInfo>
            </S.GroupName>

            <S.NameInfoFull>Felipe Pauilino Ribeiro / Lider de Célula</S.NameInfoFull>
          </S.HeaderInfo>

          <S.DescriptionInfo>
            <S.TitleDescricao>Descrição</S.TitleDescricao>
            <S.GroupInfoAction>
              <S.TitleAction>Ação:</S.TitleAction>
            </S.GroupInfoAction>
          </S.DescriptionInfo>
        </S.Container>
      )}
    </Fragment>
  );
}
