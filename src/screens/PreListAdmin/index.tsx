import React, { Fragment } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { SelectedMenuComponent } from "../../components/SelectedMenu";

import { IPropsAppStack } from "../../routes/AppStack/types";
import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";
import { useAuth } from "../../hooks/useAuth";

import * as S from "./styles";

export function PreListAdminScreen() {
  const { signOut } = useAuth();
  const navigation = useNavigation<IPropsAppStack>();
  const { dispatch } = useFormReport();


  const clean = (value: string) => {
    navigation.navigate(value)
    dispatch({
      type: FormReportActions.setRedeSelect,
      payload: 'Selecione',
    });
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: 'Selecione',
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: 'Selecione',
    });
  }

  return (
    <Fragment>
      <HeaderComponent>
        <S.HeadingIcons>
          <ComeBackComponent />
          <LogoComponent full />
        </S.HeadingIcons>

        <S.Buttons>
          <TouchableOpacity onPress={signOut}>
            <S.Logout name="logout" />
          </TouchableOpacity>
        </S.Buttons>
      </HeaderComponent>

      <S.Content>
        <S.Names>
          <TitleComponent title="Listagem" medium uppercase primary weight />
        </S.Names>

        <S.ContentOptions>
          <SelectedMenuComponent
            icon={<S.MembersIcon name="user-friends" />}
            title="Membros"
            onPress={() => clean('Members')}
          />

          <SelectedMenuComponent
            icon={<S.Font name="user-o" size={34} />}
            title="Usuário"
            onPress={() => navigation.navigate("ListUsers")}
          />

          <SelectedMenuComponent
            icon={<S.UserGridIcon name="network-wired" />}
            title="Rede"
            onPress={() => clean('Network')}
          />
        </S.ContentOptions>
      </S.Content>
    </Fragment>
  );
}
