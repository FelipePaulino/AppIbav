// o código comentando é para cadastrar visitante (aplicado apenas numa segunda entrega)

import React, { Fragment, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFetch } from "../../hooks/useFetch";
import { ModalComponent } from "../../components/Modal";
import { ButtonComponent } from "../../components/Button";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
// import { InputMaskComponent } from "../../components/InputMask";
import { FooterInfoComponent } from "../../components/FooterInfo";
import { NavigationComponent } from "../../components/Navigation";
// import { InputFieldComponent } from "../../components/InputField";
// import { NotificationComponent } from "../../components/Notification";
import { CardMembersComponent } from "../../components/Cards/Members";
import { HeadingPresentComponent } from "../../components/HeadingPresent";
import { ReportContentModalComponent } from "../../components/Modal/Report";
import { DefaultContentModalComponent } from "../../components/Modal/Default";

const loadingGif = require("../../assets/loader-two.gif");

import ButtonsText from "../../common/constants/buttons";
import { useFormReport } from "../../hooks/useFormReport";
import { connectApi } from "../../common/services/ConnectApi";
import { FormReportActions } from "../../contexts/FormReport";

import { IDataUserProps, ISelectedUserProps } from "../MembersReport/types";

import * as S from "./styles";
import { GetStorage } from "../../common/constants/storage";

export function VisitorsReportScreen() {
  // const [error, setError] = useState("");
  const [user, setUser] = useState<any>();
  // const [isAddVisible, setIsAddVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [memberStorage, setMemberStorage] = useState<any>();
  const [visitorsIdentify, setVisitorsIdentify] = useState<any>();
  const [selectPerson, setSelectPerson] = useState<
    ISelectedUserProps | undefined
  >(undefined);

  const { state, dispatch } = useFormReport();
  const { data: celulas, isFetching: loading } = useFetch("celulas.json");
  const [sendModal, setSendModal] = useState(false);

  // const ID_CELULA =
  //   memberStorage && memberStorage.length > 0 && memberStorage[0][0];

  // useEffect(() => {
  //   setLoading(true);
  //   connectApi.get(`/celulas/${ID_CELULA}/visitantes.json`)
  //     .then((response) => {
  //       setVisitantes(Object.values(response.data));
  //       setLoading(false)
  //     })

  //     .catch(() => setLoading(false))
  // }, [ID_CELULA])

  const handleOpenModalReport = () => {
    setModalVisible(true);
  };

  // const handleOpenModalAdd = () => {
  //   const nome = state.nameVisitor;
  //   const telefone = state.phoneVisitor;

  //   if (state.phoneVisitor !== "") {
  //     connectApi
  //       .post(`/celulas/${ID_CELULA}/visitantes.json`, {
  //         nome,
  //         telefone,
  //       })
  //       .then(() => {
  //         setIsAddVisible(true);
  //         setError("");

  //         dispatch({
  //           type: FormReportActions.setPhoneVisitor,
  //           payload: "",
  //         });

  //         dispatch({
  //           type: FormReportActions.setNameVisitor,
  //           payload: "",
  //         });

  //       });
  //   } else {
  //     setError("Campo obrigatório!");
  //   }
  // };


  useEffect(() => {
    const checkMembers = async () => {
      const members = await AsyncStorage.getItem(GetStorage.MEMBERS_FILTERED);
      if (members) {
        setMemberStorage(JSON.parse(members));
      }
    };
    checkMembers();
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem(GetStorage.USER_FILTERED);
      if (user) {
        setUser(JSON.parse(user));
      }
    };
    checkUser();
  }, []);

  const dataUser = user && user[0] && user[0][1];
  const whatIsOffice = dataUser && dataUser.cargo;
  const idCelulaSelect =
    state.celulaSelect && state.celulaSelect.split(" -")[0];

  const filterMembers = celulas && celulas.filter((item: any) => {
    return (
      item[1].numero_celula == idCelulaSelect
    );
  });

  const visitantes = filterMembers && Object.values(filterMembers[0][1].membros).filter((visitors: any) => {
    return visitors.status === 'visitante'
  })

  const newArrayVisitors = visitorsIdentify
    ? visitorsIdentify
    : visitantes;

  useEffect(() => {
    const visitorsFilter =
      newArrayVisitors &&
      newArrayVisitors.filter((item: IDataUserProps) => {
        if (item.nome !== selectPerson?.nome) {
          return item;
        }
      });

    if (selectPerson) {
      const tratarFalta = visitorsFilter.map((item: any) => {
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
        type: FormReportActions.setVisitors,
        payload: [...tratarFalta, selectPersonFalta],
      });

      setVisitorsIdentify([...visitorsFilter, selectPerson]);
    }
  }, [selectPerson]);

  // const handleNameVisitorChange = (value: string) => {
  //   dispatch({
  //     type: FormReportActions.setNameVisitor,
  //     payload: value,
  //   });
  // };

  // const handlePhoneVisitorChange = (value: string) => {
  //   dispatch({
  //     type: FormReportActions.setPhoneVisitor,
  //     payload: value,
  //   });
  // };

  function compared(a: IDataUserProps, b: IDataUserProps) {
    if (a.nome < b.nome) return -1;
    if (a.nome > b.nome) return 1;
    return 0;
  }

  newArrayVisitors && newArrayVisitors.sort(compared);

  return (
    <Fragment>
      <HeaderComponent>
        <ComeBackComponent />
        <NavigationComponent visitors />
        {/* <NotificationComponent /> */}
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <ScrollView>
          <S.Content>
            {whatIsOffice && whatIsOffice !== "lider" && (
              <S.Heading>
                <S.Title>Célula</S.Title>
                <S.Subtitle>{state.celulaSelect}</S.Subtitle>
              </S.Heading>
            )}

            {/* <InputFieldComponent
              primary
              value={state.nameVisitor}
              placeholder="*Nome"
              onChangeText={handleNameVisitorChange}
            />

            <InputMaskComponent
              value={state.phoneVisitor}
              mask="phone"
              maxLength={14}
              placeholder="*Digite o Telefone"
              inputMaskChange={handlePhoneVisitorChange}
              primary
            />

            <S.FinishForm>
              <S.Info>{error !== "" && error}</S.Info>

              <ButtonComponent
                title={ButtonsText.ADD_VISITOR}
                onPress={handleOpenModalAdd}
              />
            </S.FinishForm> */}

            <HeadingPresentComponent />
            {newArrayVisitors &&
              newArrayVisitors.map((data: any) => {
                return (
                  <CardMembersComponent
                    key={data}
                    data={data}
                    setSelectPerson={setSelectPerson}
                  />
                );
              })}
            <FooterInfoComponent />

            <S.Button>
              <ButtonComponent
                title={ButtonsText.REPORT}
                onPress={handleOpenModalReport}
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
        onBackdropPress={() => setSendModal(false)}
      >
        <DefaultContentModalComponent
          closeModal={setSendModal}
          type="sendReport"
        />
      </ModalComponent>

      {/* <ModalComponent
        isVisible={isAddVisible}
        onBackdropPress={() => setIsAddVisible(false)}
      >
        <DefaultContentModalComponent
          closeModal={setIsAddVisible}
          type="addVisitor"
        />
      </ModalComponent> */}
    </Fragment>
  );
}