import React, { Fragment, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MenuNavigation from "../../common/constants/navigation";

import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
// import { NotificationComponent } from "../../components/Notification";

const loadingGif = require("../../assets/loader-two.gif");

import { IPropsAppStack } from "../../routes/AppStack/types";

import * as S from "./styles";

export function WaitingApproveScreen() {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<IPropsAppStack>();

  const mock = [
    {
      nome: "feliperibeiro",
      rede: "radicais livres",
      discipulador: "elaine jeremias",
      celula: "08",
      nome_completo: "felipe paulino ribeiro",
      telefone: "12443345543",
      email: "felipe@teste.com",
      endereco: "rua copacabana - 202",
      bairro: "santa luzia",
      cep: "094222332",
      cidade: "ribeirao pires",
      estado: "sao paulo",
      data_de_nascimento: "25/04/1988",
      estado_civil: "solteira",
      categoria: "membro",
    },
    {
      nome: "polyribeiro",
      rede: "kids",
      discipulador: "bruno macedo",
      celula: "32",
      nome_completo: "polyane paulino ribeiro",
      telefone: "1244334534433",
      email: "poly@teste.com",
      endereco: "rua regente feijo - 187",
      bairro: "ronon",
      cep: "09411-240",
      cidade: "ribeirao pires",
      estado: "sao paulo",
      data_de_nascimento: "25/04/1993",
      estado_civil: "casada",
      categoria: "visitante",
    },
    {
      nome: "viniciusitalo",
      rede: "radicais livres",
      discipulador: "elaine jeremias",
      celula: "33",
      nome_completo: "vinicius italo da cruz",
      telefone: "124434445543",
      email: "vinicius@teste.com",
      endereco: "rua antonio pereira de figueiredo - 222",
      bairro: "vila suissa",
      cep: "094222332",
      cidade: "ribeirao pires",
      estado: "sao paulo",
      data_de_nascimento: "25/04/1988",
      estado_civil: "casado",
      categoria: "membro",
    },
  ];

  return (
    <Fragment>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.PENDING}</S.TitlePage>
        </S.ComeBack>

        {/* <NotificationComponent /> */}
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <S.Container>
          {mock.map((user) => (
            <S.Row>
              <S.RowText>
                Usário <S.Decoration>{user.nome}</S.Decoration> adicinou membro
              </S.RowText>

              <TouchableOpacity onPress={() => navigation.navigate("Details")}>
                <S.RowDetails>Ver detalhes</S.RowDetails>
              </TouchableOpacity>
            </S.Row>
          ))}
        </S.Container>
      )}
    </Fragment>
  );
}
