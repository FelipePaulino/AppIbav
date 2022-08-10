import React, { Fragment, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

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
import { DefaultContentModalComponent } from "../../components/Modal/Default";
import { FormReportActions } from "../../contexts/FormReport";
import { IPropsAppStack } from "../../routes/AppStack/types";

const loadingGif = require("../../assets/loader-two.gif");

import { useFetch } from "../../hooks/useFetch";
import ButtonsText from "../../common/constants/buttons";
import { useFormReport } from "../../hooks/useFormReport";
import useUserFiltered from "../../hooks/useUserFiltered";
import { GetStorage } from "../../common/constants/storage";

import { IDataUserProps, ISelectedUserProps } from "./types";

import * as S from "./styles";

export function MembersReportScreen() {
  const [members, setMembers] = useState<any>([]);
  const [membersIdentify, setMembersIdentify] = useState<any>();
  const [selectPerson, setSelectPerson] = useState<
    ISelectedUserProps | undefined
  >(undefined);
  const [isModalVisible, setModalVisible] = useState(false);
  const [sendModal, setSendModal] = useState(false);

  const { data: celulas, isFetching: loading } = useFetch("celulas.json");
  const { user } = useUserFiltered();
  const { state, dispatch } = useFormReport();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const dataUser = user && user[0] && user[0][1];
  const identifyCelula = user && user[0][1].numero_celula;
  const idCelulaSelect =
    state.celulaSelect && state.celulaSelect.split(" -")[0];
  const whatIsOffice = dataUser && dataUser.cargo;

  const navigation = useNavigation<IPropsAppStack>();

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
                disabled={(
                  state.celulaSelect === 'Selecione' ||
                  state.textDate === 'Selecione uma data' ||
                  state.offer === '' ||
                  state.presencaCelula.length === 0 ||
                  state.presencaCulto.length === 0
                ) ? true : false
                }
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
          data={user}
          setSendModal={setSendModal}
        />
      </ModalComponent>

      <ModalComponent
        isVisible={sendModal}
        onBackdropPress={() => {
          setSendModal(false)
          navigation.navigate("Home")
        }}
      >
        <DefaultContentModalComponent
          type="sendReport"
        />
      </ModalComponent>
    </Fragment>
  );
}
