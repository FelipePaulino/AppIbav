import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import useUserFiltered from "../../hooks/useUserFiltered";
import RequestService from "../../common/services/RequestService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetStorage } from "../../common/constants/storage";

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
  const [state, setState] = useState(route.params?.estado || "");
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

  const [date, setDate] = useState(new Date());
  const [celulas, setCelulas] = useState<any>();
  const [members, setMembers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUserFiltered();
  const { trigger, setTrigger, celulaId } = useFormReport();

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

  useEffect(() => {
    const filterMembers =
      celulas &&
      celulas.filter((item: any) => {
        return item[1].numero_celula == identifyCelula;
      });

    if (filterMembers) {
      setMembers(filterMembers);
      AsyncStorage.setItem(
        GetStorage.MEMBERS_FILTERED,
        JSON.stringify(filterMembers)
      );
    }
  }, [identifyCelula, celulas]);

  const EditPastor = celulas.filter((item: any) => {
    return item[1].cargo === "pastor";
  });

  console.log(
    EditPastor.map((item: any) => item[1].nome),
    "EditPastor"
  );
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
        {/* <NotificationComponent /> */}
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
              <TitleComponent title="Pastor" small primary />
              <S.ContentC>
                <S.IconC name="vector-square" />
                <SelectComponent
                  width="300px"
                  onChange={() => console.log("ok")}
                  labelSelect={"Selecione"}
                  dataOptions={[]}
                  selectedOption={() => console.log("ok")}
                />
              </S.ContentC>
            </S.Grid>

            <S.Grid>
              <TitleComponent title="Discipulado" small primary />
              <S.ContentC>
                <S.IconC name="network-wired" />
                <SelectComponent
                  width="300px"
                  onChange={() => console.log("ok")}
                  labelSelect={"Selecione"}
                  dataOptions={[]}
                  selectedOption={() => console.log("ok")}
                />
              </S.ContentC>
            </S.Grid>

            <S.GridItemFull>
              <InputFieldComponent
                primary
                value={rede === "undefined" ? FormFields.FULL_NAME : rede}
                placeholder={`* ${FormFields.FULL_NAME}`}
                onChangeText={(value) => setName(value)}
                label="Celula"
              />
            </S.GridItemFull>

            <S.Grid>
              <TitleComponent title="Lider" small primary />
              <S.ContentC>
                <S.IconC name="user" />
                <SelectComponent
                  width="300px"
                  onChange={() => console.log("ok")}
                  labelSelect={"Selecione"}
                  dataOptions={[]}
                  selectedOption={() => console.log("ok")}
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
