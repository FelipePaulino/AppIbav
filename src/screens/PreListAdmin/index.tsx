import React, { Fragment } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { SelectedMenuComponent } from "../../components/SelectedMenu";

import { IPropsAppStack } from "../../routes/AppStack/types";
import { useAuth } from "../../hooks/useAuth";
import * as S from "./styles";

export function PreListAdminScreen() {
  const { signOut } = useAuth();
  const navigation = useNavigation<IPropsAppStack>();

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
            onPress={() => navigation.navigate("Members")}
          />

          <SelectedMenuComponent
            icon={<S.Font name="user-o" size={34} />}
            title="Usuário"
            onPress={() => navigation.navigate("ListUsers")}
          />

          <SelectedMenuComponent
            icon={<S.UserGridIcon name="network-wired" />}
            title="Rede"
            onPress={() => navigation.navigate("Network")}
          />
        </S.ContentOptions>
      </S.Content>
    </Fragment>
  );
}
