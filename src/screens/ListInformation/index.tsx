import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import FormFields from "../../common/constants/form";
import useUserFiltered from "../../hooks/useUserFiltered";
import { useFormReport } from "../../hooks/useFormReport";
import { GetStorage } from "../../common/constants/storage";
import { connectApi } from "../../common/services/ConnectApi";
import MenuNavigation from "../../common/constants/navigation";
import RequestService from "../../common/services/RequestService";
import {
  officeMembers,
  selectCivilStatus,
  selectState,
} from "../../common/utils/selects";

import { DateComponent } from "../../components/Date";
import { ModalComponent } from "../../components/Modal";
import { HeaderComponent } from "../../components/Header";
import { SelectComponent } from "../../components/Select";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputFieldComponent } from "../../components/InputField";
// import { NotificationComponent } from "../../components/Notification";
import { DefaultContentModalComponent } from "../../components/Modal/Default";

import { IPropsAppStack } from "../../routes/AppStack/types";
import * as S from "./styles";

export function UsersInformationScreen(this: any, { route }: any) {
  const [date, setDate] = useState(new Date());
  const [celulas, setCelulas] = useState<any>();
  const [members, setMembers] = useState<any>([]);
  const [successModal, setSuccessModal] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [id, setId] = useState(route.params?.id || "");
  const [cep, setCep] = useState(route.params?.cep || "");
  const [name, setName] = useState(route.params?.nome || "");
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

  const { user } = useUserFiltered();
  const { trigger, setTrigger } = useFormReport();

  const identifyCelula = user && user[0][1].numero_celula;
  const serviceGet = new RequestService();
  const navigation = useNavigation<IPropsAppStack>();

  useEffect(() => {
    const getCelulas = async () => {
      await serviceGet.getCelulas().then((response) => {
        setCelulas(Object.entries(response));
      });
    };

    getCelulas();
  }, []);

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
      connectApi.put(`/users/${id}.json`, {
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
        <ComeBackComponent />
        <S.Navigation>{MenuNavigation.USERS}</S.Navigation>
        {/* <NotificationComponent /> */}
      </HeaderComponent>

      <ScrollView>
        <S.Container>
          <S.Form>
            <S.GridItemFull>
              <InputFieldComponent
                primary
                value={name === "undefined" ? FormFields.FULL_NAME : name}
                placeholder={`* ${FormFields.FULL_NAME}`}
                onChangeText={(value) => setName(value)}
                label="*Nome Completo"
              />
            </S.GridItemFull>

            <S.GridItemFull>
              <InputFieldComponent
                primary
                value={phone === "undefined" ? FormFields.PHONE : phone}
                placeholder={`* ${FormFields.PHONE}`}
                onChangeText={(value) => setPhone(value)}
                label="*Telefone"
              />
            </S.GridItemFull>

            <S.GridItemFull>
              <InputFieldComponent
                primary
                value={email === "undefined" ? FormFields.EMAIL : email}
                placeholder={FormFields.EMAIL}
                onChangeText={(value) => setEmail(value)}
                label="*Email"
              />
            </S.GridItemFull>

            <S.GridForm>
              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={address && address}
                  placeholder={FormFields.ADDRESS}
                  onChangeText={(value) => setAddress(value)}
                  label="Endereço"
                />
              </S.GridItem>

              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={cep === "undefined" ? FormFields.CEP : cep}
                  placeholder={FormFields.CEP}
                  onChangeText={(value) => setCep(value)}
                  label="Cep"
                />
              </S.GridItem>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={
                    district === "undefined" ? FormFields.DISTRICT : district
                  }
                  placeholder={FormFields.DISTRICT}
                  onChangeText={(value) => setDistrict(value)}
                  label="Bairro"
                />
              </S.GridItem>

              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={city === "undefined" ? FormFields.CITY : city}
                  placeholder={FormFields.CITY}
                  onChangeText={(value) => setCity(value)}
                  label="Cidade"
                />
              </S.GridItem>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <SelectComponent
                  label="Estado"
                  onChange={(labelSelect) => setState(labelSelect)}
                  selectedOption={(labelSelect) => setState(labelSelect)}
                  labelSelect={state === "undefined" ? FormFields.STATE : state}
                  dataOptions={selectState}
                />
              </S.GridItem>

              <S.GridItem>
                <SelectComponent
                  label="Estado Civil"
                  onChange={(labelSelect) => setCivilStatus(labelSelect)}
                  selectedOption={(labelSelect) => setCivilStatus(labelSelect)}
                  labelSelect={
                    civilStatus === "undefined"
                      ? FormFields.CIVIL_STATUS
                      : civilStatus
                  }
                  dataOptions={selectCivilStatus}
                />
              </S.GridItem>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <DateComponent
                  text={birthday}
                  open={showMode}
                  showCalender={showCalender}
                  dataDados={date}
                  onChange={handleDateChange}
                  label="Data de Nascimento"
                />
              </S.GridItem>

              <S.GridItem>
                <SelectComponent
                  label="Categoria"
                  onChange={(labelSelect) => setStatus(labelSelect)}
                  selectedOption={(labelSelect) => setStatus(labelSelect)}
                  labelSelect={
                    status === "undefined" ? FormFields.CATEGORY : status
                  }
                  dataOptions={officeMembers}
                />
              </S.GridItem>
            </S.GridForm>
          </S.Form>

          <S.FooterFields>
            <S.Required>* Campos obrigatórios</S.Required>
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
        onBackdropPress={() => {
          setSuccessModal(false)
          navigation.navigate("ListUsers")
        }}
      >
        <DefaultContentModalComponent
          data={name}
          type="edited"
        />
      </ModalComponent>
    </>
  );
}
