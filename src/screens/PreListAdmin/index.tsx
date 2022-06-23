import React, { Fragment } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
// import { NotificationComponent } from "../../components/Notification";
import { SelectedMenuComponent } from "../../components/SelectedMenu";

import { IPropsAppStack } from "../../routes/AppStack/types";

import * as S from "./styles";
import { handleSignOut } from "../../common/utils/firebase";

export function PreListAdminScreen() {
  const navigation = useNavigation<IPropsAppStack>();

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
            onPress={() => navigation.navigate("UserGrid")}
          />

          <SelectedMenuComponent
            icon={<S.UserGridIcon name="network-wired" />}
            title="Rede"
            onPress={() => navigation.navigate("UserGrid")}
          />
        </S.ContentOptions>
      </S.Content>
    </Fragment>
  );
}
