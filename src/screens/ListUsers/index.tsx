import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useEffect, useState } from "react";

import { useFormReport } from "../../hooks/useFormReport";
import MenuNavigation from "../../common/constants/navigation";
import RequestService from "../../common/services/RequestService";

import { ModalComponent } from "../../components/Modal";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { PersonLabelComponent } from "../../components/PersonLabel";
import { ApprovalRequest } from "../../components/Modal/ApprovalRequest";
import { RequestContentModalComponent } from "../../components/Modal/Request";

const loadingGif = require("../../assets/loader-two.gif");
import { IPropsAppStack } from "../../routes/AppStack/types";

import * as S from "./styles";

export function ListUsersScreen() {
  const [id, setId] = useState("");
  const [users, setUsers] = useState({});
  const [name, setName] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState(false);
  const [modalConcluded, setModalConcluded] = useState(false);

  const service = new RequestService();
  const navigation = useNavigation<IPropsAppStack>();
  const { trigger, setTrigger } = useFormReport();

  useEffect(() => {
    const getUsers = async () => {
      await service
        .getUsers()
        .then((response) => {
          setUsers(response);
        })
        .finally(() => setLoading(false));
    };

    getUsers();

  }, [trigger]);

  const timeModal = () => {
    setModalConcluded(true);

  };

  const deleteMember = async () => {
    try {
      await service.deleteUser(id);
      setConfirmModal(false);
      setTimeout(timeModal, 300);
      setTrigger(!trigger);
    } catch (err) {
      alert("Houve algum problema ao excluir esse usuário");
    }
  };

 const names = users && Object.entries(users)?.sort(function (a: any, b: any) {
    if (a[1].nome < b[1].nome) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <Fragment>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.USERS}</S.TitlePage>
        </S.ComeBack>
        {/* <NotificationComponent /> */}
      </HeaderComponent>

      <ScrollView>
        <S.Container>
          {loading ? (
            <S.Loading source={loadingGif} />
          ) : (
            <Fragment>
              {names.map((user: any) => {
                  return (
                    <PersonLabelComponent
                      nome={user[1]?.nome}
                      onPress={() =>
                        navigation.navigate("UsersInformation", {
                          nome: `${user[1].nome}`,
                          telefone: `${user[1].telefone}`,
                          email: `${user[1].email}`,
                          endereco: `${user[1].endereco}`,
                          bairro: `${user[1].bairro}`,
                          cep: `${user[1].cep}`,
                          cidade: `${user[1].cidade}`,
                          estado: `${user[1].estado}`,
                          estado_civil: `${user[1].estado_civil}`,
                          data_de_nascimento: `${user[1].data_de_nascimento}`,
                          status: `${user[1].status}`,
                          numero_casa: `${user[1].numero_casa}`,
                          id: `${user[0]}`,
                          active: setTrigger,
                        })
                      }
                      delMember={() => {
                        setConfirmModal(true),
                          setName(user[1].nome),
                          setId(user[0]);
                      }}
                    />
                  );
                })}
            </Fragment>
          )}
        </S.Container>
      </ScrollView>

      <ModalComponent
        isVisible={confirmModal}
        onBackdropPress={() => setConfirmModal(false)}
      >
        <RequestContentModalComponent
          name={name}
          cancel={() => setConfirmModal(false)}
          confirm={() => {
            deleteMember();
          }}
        />
      </ModalComponent>

      <ModalComponent
        isVisible={modalConcluded}
        onBackdropPress={() => setModalConcluded(false)}
      >
        <ApprovalRequest name={name} />
      </ModalComponent>
    </Fragment>
  );
}
