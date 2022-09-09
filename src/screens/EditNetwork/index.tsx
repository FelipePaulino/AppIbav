import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import useUserFiltered from "../../hooks/useUserFiltered";
import RequestService from "../../common/services/RequestService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetStorage } from "../../common/constants/storage";
import { FormReportActions } from "../../contexts/FormReport";

import { TitleComponent } from "../../components/Title";
import { ModalComponent } from "../../components/Modal";
import { HeaderComponent } from "../../components/Header";
import { SelectComponent } from "../../components/Select";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputFieldComponent } from "../../components/InputField";
import { DefaultContentModalComponent } from "../../components/Modal/Default";

import MenuNavigation from "../../common/constants/navigation";
import FormFields from "../../common/constants/form";

import * as S from "./style";
import { connectApi } from "../../common/services/ConnectApi";
import { useFormReport } from "../../hooks/useFormReport";

export function EditNetwork(this: any, { route }: any) {
  const [successModal, setSuccessModal] = useState(false);
  const [showCalender, setShowCalender] = useState(false);

  const [cep, setCep] = useState(route.params?.cep || "");
  const [name, setName] = useState(route.params?.nome || "");
  const [rede, setRede] = useState(route.params?.rede || "");
  const [city, setCity] = useState(route.params?.cidade || "");
  const [email, setEmail] = useState(route.params?.email || "");
  // const [state, setState] = useState(route.params?.estado || "");
  const [status, setStatus] = useState(route.params?.status || "");
  const [phone, setPhone] = useState(route.params?.telefone || "");
  const [address, setAddress] = useState(route.params?.endereco || "");
  const [district, setDistrict] = useState(route.params?.bairro || "");
  const [birthday, setBirthday] = useState(
    route.params?.data_de_nascimento || ""
  );
  const [civilStatus, setCivilStatus] = useState(
    route.params?.estado_civil || ""
  );
  const [id, setId] = useState(route.params?.id);
  const [newNumberCelula, setNewNumberCelula] = useState<string>(
    route.params?.numero_celula || ""
  );
  const [date, setDate] = useState(new Date());
  const [celulas, setCelulas] = useState<any>();
  const [members, setMembers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUserFiltered();
  const { trigger, setTrigger, celulaId, state, dispatch } = useFormReport();

  const identifyCelula = user && user[0][1].numero_celula;

  const serviceGet = new RequestService();

  useEffect(() => {
    const getUsers = async () => {
      await serviceGet
        .getUsers()
        .then((response) => {
          setCelulas(Object.entries(response));
        })
        .finally(() => setLoading(false));
    };

    getUsers();
  }, [trigger]);

  // console.log(celulas, "celulas");
  // useEffect(() => {
  //   const filterMembers =
  //     celulas &&
  //     celulas?.filter((item: any) => {
  //       return item[1]?.numero_celula == identifyCelula;
  //     });

  //   if (filterMembers) {
  //     setMembers(filterMembers);
  //     AsyncStorage.setItem(
  //       GetStorage.MEMBERS_FILTERED,
  //       JSON.stringify(filterMembers)
  //     );
  //   }
  // }, [identifyCelula, celulas]);

  const EditPastor = celulas?.filter((item: any) => {
    return item[1]?.cargo === "pastor";
  });

  const mapEditarPastor = EditPastor?.map((item: any) => {
    return {
      value: item[1].nome,
    };
  });

  const editDiscipulador = celulas?.filter((item: any) => {
    return item[1]?.cargo === "discipulador";
  });

  const mapEditarDiscipulador = editDiscipulador?.map((item: any) => {
    return {
      value: item[1].nome,
    };
  });

  const editLider = celulas?.filter((item: any) => {
    return item[1]?.cargo === "lider";
  });

  const mapEditarLider = editLider?.map((item: any) => {
    return {
      value: item[1].nome,
    };
  });

  const handleRedeChange = (value: string) => {
    dispatch({
      type: FormReportActions.setRedeSelect,
      payload: value,
    });
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: null,
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: null,
    });
  };

  const handleLiderChange = (value: string) => {
    dispatch({
      type: FormReportActions.setLiderSelect,
      payload: value,
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: null,
    });
  };

  const handleDiscipuladoChange = (value: string) => {
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: value,
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: null,
    });
  };

  const showMode = () => {
    setShowCalender(true);
  };
  const handleDateChange = (event: Event, selectedDate: any) => {
    const currentDate = selectedDate || state.dateRegister;

    setShowCalender(false);

    const tempDate = new Date(currentDate);
    const newDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    setDate(currentDate);
    setBirthday(newDate);
  };

  const timeModal = () => {
    setSuccessModal(true);
  };

  const submitRegister = () => {
    try {
      connectApi.put(`/celulas/${celulaId}/membros/${id}.json`, {
        nome: name,
        status: status,
        telefone: phone,
        email: email,
        endereco: address,
        cep: cep,
        bairro: district,
        cidade: city,
        estado: state,
        data_de_nascimento: birthday,
        estado_civil: civilStatus,
      });
      setTrigger(!trigger);
      setTimeout(timeModal, 300);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <HeaderComponent>
        <S.Division>
          <ComeBackComponent />
          <S.Navigation>{MenuNavigation.MEMBERS}</S.Navigation>
        </S.Division>
      </HeaderComponent>

      <ScrollView>
        <S.Container>
          <S.Form>
            <S.GridItemFull>
              <InputFieldComponent
                primary
                value={rede === "undefined" ? FormFields.FULL_NAME : rede}
                placeholder={`* ${FormFields.FULL_NAME}`}
                onChangeText={(value) => setName(value)}
                label="Rede"
              />
            </S.GridItemFull>

            <S.Grid>
              <S.TitleInput>Pastor</S.TitleInput>
              <S.ContentC>
                <S.IconC name="vector-square" />
                <SelectComponent
                  width="300px"
                  onChange={handleRedeChange}
                  labelSelect={state.redeSelect ?? "Selecione"}
                  dataOptions={mapEditarPastor}
                  selectedOption={handleRedeChange}
                />
              </S.ContentC>
            </S.Grid>

            <S.Grid>
              <S.TitleInput>Discipulado</S.TitleInput>
              <S.ContentC>
                <S.IconC name="network-wired" />
                <SelectComponent
                  width="300px"
                  onChange={handleDiscipuladoChange}
                  labelSelect={state.discipuladoSelect ?? "Selecione"}
                  dataOptions={mapEditarDiscipulador}
                  selectedOption={handleDiscipuladoChange}
                />
              </S.ContentC>
            </S.Grid>

            <S.GridItemFull>
              <InputFieldComponent
                primary
                value={
                  newNumberCelula === "undefined"
                    ? FormFields.FULL_NAME
                    : newNumberCelula
                }
                placeholder="número da célula"
                onChangeText={(value) => setNewNumberCelula(value)}
                label="Celula"
              />
            </S.GridItemFull>

            <S.Grid>
              <S.TitleInput>Lider</S.TitleInput>
              <S.ContentC>
                <S.IconC name="user-alt" />
                <SelectComponent
                  width="300px"
                  onChange={handleLiderChange}
                  labelSelect={state.liderSelect ?? "Selecione"}
                  dataOptions={mapEditarLider}
                  selectedOption={handleLiderChange}
                />
              </S.ContentC>
            </S.Grid>
          </S.Form>

          <S.FooterFields>
            <ButtonComponent
              title="SALVAR INFORMAÇÕES"
              onPress={submitRegister}
              width="213px"
              heigth="39px"
              size="14px"
            />
          </S.FooterFields>
        </S.Container>
      </ScrollView>

      <ModalComponent
        isVisible={successModal}
        onBackdropPress={() => setSuccessModal(false)}
      >
        <DefaultContentModalComponent data={name} type="edited" />
      </ModalComponent>
    </>
  );
}
