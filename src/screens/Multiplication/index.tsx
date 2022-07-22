import React, { Fragment } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
// import { NotificationComponent } from "../../components/Notification";
import { SelectedMenuComponent } from "../../components/SelectedMenu";

import { useFormReport } from "../../hooks/useFormReport";
import { handleSignOut } from "../../common/utils/firebase";
import { IPropsAppStack } from "../../routes/AppStack/types";
import { FormReportActions } from "../../contexts/FormReport";

import * as S from "./styles";

export function Multiplication() {
  const { dispatch } = useFormReport();
  const navigation = useNavigation<IPropsAppStack>();

  const clean = () => {
    navigation.navigate("Register");
    dispatch({
      type: FormReportActions.setRedeSelect,
      payload: "*Selecione",
    });
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: "*Selecione",
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: "*Selecione",
    });
  };

  return (
    <Fragment>
      <HeaderComponent>
        <S.HeadingIcons>
          <ComeBackComponent />
          <LogoComponent full />
        </S.HeadingIcons>

        <S.Buttons>
          {/* <NotificationComponent /> */}

          <TouchableOpacity onPress={() => handleSignOut()}>
            <S.Logout name="logout" />
          </TouchableOpacity>
        </S.Buttons>
      </HeaderComponent>

      <S.Content>
        <S.Names>
          <TitleComponent
            title="Multiplicação"
            medium
            uppercase
            primary
            weight
          />
        </S.Names>

        <S.ContentOptions>
          <SelectedMenuComponent
            icon={<S.UserGridIcon name="user-friends" />}
            title="Multiplicação Celula"
            onPress={() => navigation.navigate("MultiplicationCelula")}
          />
          <SelectedMenuComponent
            icon={<S.UserGridIcon name="network-wired" />}
            title="Multiplicação Discipulado"
            onPress={() => navigation.navigate("MultiplicationDiscipulado")}
          />
          <SelectedMenuComponent
            icon={<S.UserGridIcon name="vector-square" />}
            title="Multiplicação Rede"
            onPress={() => navigation.navigate("MultiplicationRede")}
          />
        </S.ContentOptions>
      </S.Content>
    </Fragment>
  );
}
