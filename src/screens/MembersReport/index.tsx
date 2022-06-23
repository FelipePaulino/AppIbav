import React, { Fragment, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ModalComponent } from "../../components/Modal";
import { ButtonComponent } from "../../components/Button";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { NavigationComponent } from "../../components/Navigation";
import { FooterInfoComponent } from "../../components/FooterInfo";
// import { NotificationComponent } from "../../components/Notification";
import { CardMembersComponent } from "../../components/Cards/Members";
import { HeadingPresentComponent } from "../../components/HeadingPresent";
import { ReportContentModalComponent } from "../../components/Modal/Report";

const loadingGif = require("../../assets/loader-two.gif");

import { useFetch } from "../../hooks/useFetch";
import ButtonsText from "../../common/constants/buttons";
import { useFormReport } from "../../hooks/useFormReport";
import useUserFiltered from "../../hooks/useUserFiltered";
import { GetStorage } from "../../common/constants/storage";
import { FormReportActions } from "../../contexts/FormReport";

import { IDataUserProps, ISelectedUserProps } from "./types";

import * as S from "./styles";

export function MembersReportScreen() {
  const [members, setMembers] = useState<any>([]);
  const [membersIdentify, setMembersIdentify] = useState<any>();
  const [selectPerson, setSelectPerson] = useState<
    ISelectedUserProps | undefined
  >(undefined);
  const [isModalVisible, setModalVisible] = useState(false);

  const { data: celulas, isFetching: loading } = useFetch("celulas.json");
  const { user } = useUserFiltered();
  const { state, dispatch } = useFormReport();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  { console.log(state.textDate, 'state.textDate') }
  { console.log(state.celulaSelect, 'state.celulaSelect') }
  { console.log(state.offer, 'state.offer') }

  const dataUser = user && user[0] && user[0][1];
  const identifyCelula = user && user[0][1].numero_celula;
  const idCelulaSelect =
    state.celulaSelect && state.celulaSelect.split(" -")[0];
  const whatIsOffice = dataUser && dataUser.cargo;

  useEffect(() => {
    const filterMembers =
      celulas &&
      celulas.filter((item: any) => {
        return (
          item[1].numero_celula == identifyCelula ||
          item[1].numero_celula == idCelulaSelect
        );
      });

    if (filterMembers) {
      setMembers(filterMembers);
      AsyncStorage.setItem(
        GetStorage.MEMBERS_FILTERED,
        JSON.stringify(filterMembers)
      );
    }
  }, [identifyCelula, celulas]);

  const newMembersList =
    members &&
    members.length > 0 &&
    Object.values(members[0][1].membros).filter(
      (member: any) =>
        member.status !== "visitante" && member.status !== "Visitante"
    );

  const newArrayMembers = membersIdentify ? membersIdentify : newMembersList;

  useEffect(() => {
    const memberFilter =
      newArrayMembers &&
      newArrayMembers.filter((item: IDataUserProps) => {
        if (item.nome !== selectPerson?.nome) {
          return item;
        }
      });

    if (selectPerson) {
      const tratarFalta = memberFilter.map((item: any) => {
        return {
          nome: item.nome,
          status: item.status,
          celula: item.celula ? item.celula : "F",
          culto: item.culto ? item.culto : "F",
        };
      });

      const selectPersonFalta = {
        nome: selectPerson.nome,
        status: selectPerson.status,
        celula: selectPerson.celula ? selectPerson.celula : "F",
        culto: selectPerson.culto ? selectPerson.culto : "F",
      };

      dispatch({
        type: FormReportActions.setMembers,
        payload: [...tratarFalta, selectPersonFalta],
      });

      setMembersIdentify([...memberFilter, selectPerson]);
    }
  }, [selectPerson]);

  console.log(selectPerson)

  function compared(a: IDataUserProps, b: IDataUserProps) {
    if (a.nome < b.nome) return -1;
    if (a.nome > b.nome) return 1;
    return 0;
  }

  newArrayMembers && newArrayMembers.sort(compared);

  return (
    <Fragment>
      <HeaderComponent>
        <ComeBackComponent />
        <NavigationComponent members />
        {/* <NotificationComponent /> */}
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <ScrollView>
          <S.Content>
            {whatIsOffice !== "lider" && (
              <S.Heading>
                <S.Title>Célula</S.Title>
                <S.Subtitle>{state.celulaSelect}</S.Subtitle>
              </S.Heading>
            )}

            <HeadingPresentComponent />

            <ScrollView>
              {newArrayMembers &&
                newArrayMembers.map((data: any) => (
                  <CardMembersComponent
                    key={data}
                    data={data}
                    setSelectPerson={setSelectPerson}
                  />
                ))}
            </ScrollView>
            <FooterInfoComponent />

            <S.Button>
              <ButtonComponent
                title={ButtonsText.REPORT}
                onPress={handleOpenModal}
              />
            </S.Button>
          </S.Content>
        </ScrollView>
      )}

      <ModalComponent
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <ReportContentModalComponent
          handleCloseModal={setModalVisible}
          data={user && user[1]}
          membersPresent={newArrayMembers}
        />
      </ModalComponent>
    </Fragment>
  );
}
