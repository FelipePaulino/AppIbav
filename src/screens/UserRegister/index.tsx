import React, { Fragment, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

import { DateComponent } from "../../components/Date";
import { ModalComponent } from "../../components/Modal";
import { SelectComponent } from "../../components/Select";
import { ButtonComponent } from "../../components/Button";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputMaskComponent } from "../../components/InputMask";
import { InputFieldComponent } from "../../components/InputField";
// import { NotificationComponent } from "../../components/Notification";
import { DefaultContentModalComponent } from "../../components/Modal/Default";

import FormFields from "../../common/constants/form";
import { firebaseConfig } from "../../config/firebase";
import { useFormReport } from "../../hooks/useFormReport";
import { connectApi } from "../../common/services/ConnectApi";
import { FormReportActions } from "../../contexts/FormReport";
import MenuNavigation from "../../common/constants/navigation";
import {
  initialValuesRequestCep,
  initialValueRegisterUser,
} from "../../common/utils/initialValues";

import {
  selectState,
  officeMembers,
  selectCivilStatus,
} from "../../common/utils/selects";

import { IDataUser } from "./types";
import IAddress from "../../types/initialValues";

import * as S from "./styles";

export function UserRegisterScreen() {
  const [users, setUsers] = useState([]);
  const [office, setOffice] = useState("Selecionar");
  const [showCalender, setShowCalender] = useState(false);
  const [address, setAddress] = useState(initialValuesRequestCep);
  const [selectNetwork, setSelectNetwork] = useState("Selecionar");
  const [selectDisciples, setSelectDisciples] = useState("Selecionar");
  const [formValues, setFormValues] = useState(initialValueRegisterUser);
  const [confirmRegisterModal, setConfirmRegisterModal] = useState(false);

  const { state: stateReducer, dispatch } = useFormReport();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    const getCelulas = async () => {
      const response = await connectApi.get("/users.json");

      setUsers(Object.values(response.data));
    };
    getCelulas();
  }, []);

  const getNetwork = selectNetwork.split(" -")[0];

  const usersMinister =
    users && users.filter((minister: IDataUser) => minister.cargo === "pastor");

  const usersDisciples =
    users &&
    users.filter((discipler: IDataUser) => discipler.cargo === "discipulador");

  const disciplesFiltered =
    usersDisciples &&
    usersDisciples.filter((user: IDataUser) => user.rede === getNetwork);

  const optionsDisciples =
    disciplesFiltered &&
    disciplesFiltered.map((disc: IDataUser) => {
      return {
        value: disc.nome,
      };
    });

  const optionsNetwork =
    usersMinister &&
    usersMinister.map((pastor: IDataUser) => {
      return {
        value: `${pastor?.rede}`,
      };
    });

  const handleSelectOffice = (value: string) => {
    setOffice(value);

    setSelectNetwork("Selecionar");
    setSelectDisciples("Selecionar");
  };

  const handleNetworkChange = (value: string) => {
    setSelectNetwork(value);

    setSelectDisciples("Selecionar");
  };

  const handleDisciplesChange = (value: string) => {
    setSelectDisciples(value);
  };

  const getAddressFromApi = useCallback(() => {
    axios
      .get(`https://viacep.com.br/ws/${address.cep}/json/`)
      .then((response) => response.data)
      .then((data: IAddress) => {
        setAddress({
          uf: data.uf,
          ddd: data.ddd,
          gia: data.gia,
          ibge: data.ibge,
          siafi: data.siafi,
          bairro: data.bairro,
          logradouro: data.logradouro,
          localidade: data.localidade,
          complemento: data.complemento,
        });
      })
      .catch((err) => console.log("Erro:", err));
  }, [address.cep]);

  const showMode = () => {
    setShowCalender(true);
  };

  const handleDateChange = (event: Event, selectedDate: any) => {
    const currentDate = selectedDate || stateReducer.dateRegister;

    setShowCalender(false);

    const tempDate = new Date(currentDate);
    const newDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    dispatch({
      type: FormReportActions.setDateRegister,
      payload: currentDate,
    });

    dispatch({
      type: FormReportActions.setTextRegister,
      payload: newDate,
    });
  };

  const registerUser = () => {
    const { email, password } = formValues;

    createUserWithEmailAndPassword(auth, email, password);
    credentialsPost();
  };

  const credentialsPost = () => {
    try {
      if (office === "pastor de rede") {
        connectApi
          .post("/users.json", {
            cargo: "pastor",
            cep: address.cep,
            nome: formValues.name,
            bairro: address.bairro,
            email: formValues.email,
            estado: address.uf ? address.uf : formValues.state,
            rede: formValues.network,
            cidade: address.localidade,
            senha: formValues.password,
            telefone: formValues.phone,
            endereco: address.logradouro,
            numero_casa: formValues.numberHouse,
            estado_civil: formValues.stateCivil,
            data_de_nascimento: stateReducer.textRegister,
          })
          .then(() => setConfirmRegisterModal(true));
      } else if (office === "discipulador") {
        connectApi
          .post("/users.json", {
            cargo: "discipulador",
            rede: selectNetwork,
            cep: address.cep,
            nome: formValues.name,
            bairro: address.bairro,
            email: formValues.email,
            estado: address.uf ? address.uf : formValues.state,
            cidade: address.localidade,
            senha: formValues.password,
            telefone: formValues.phone,
            endereco: address.logradouro,
            estado_civil: formValues.stateCivil,
            numero_casa: formValues.numberHouse,
            data_de_nascimento: stateReducer.textRegister,
          })
          .then(() => setConfirmRegisterModal(true));
      } else {
        connectApi
          .post("/users.json", {
            cargo: "lider",
            rede: selectNetwork,
            discipulado: selectDisciples,
            cep: address.cep,
            nome: formValues.name,
            bairro: address.bairro,
            email: formValues.email,
            estado: address.uf ? address.uf : formValues.state,
            cidade: address.localidade,
            senha: formValues.password,
            telefone: formValues.phone,
            endereco: address.logradouro,
            estado_civil: formValues.stateCivil,
            numero_casa: formValues.numberHouse,
            numero_celula: formValues.numberCelula,
            data_de_nascimento: stateReducer.textRegister,
          })
          .then(() => setConfirmRegisterModal(true));
      }
    } catch (err) {
      throw new Error("Ops, algo deu errado!");
    }
  };

  const renderSelectsOptions = () => {
    switch (office) {
      case "discipulador":
        return (
          <S.GridSelect>
            <SelectComponent
              label="Rede"
              onChange={handleNetworkChange}
              selectedOption={handleNetworkChange}
              labelSelect={selectNetwork}
              dataOptions={optionsNetwork && optionsNetwork}
            />
          </S.GridSelect>
        );

      case "lider de celula":
        return (
          <Fragment>
            <S.GridSelect>
              <SelectComponent
                label="Rede"
                onChange={handleNetworkChange}
                selectedOption={handleNetworkChange}
                labelSelect={selectNetwork}
                dataOptions={optionsNetwork && optionsNetwork}
              />
            </S.GridSelect>

            <S.GridSelect>
              <SelectComponent
                label="Discipulado"
                onChange={handleDisciplesChange}
                selectedOption={handleDisciplesChange}
                labelSelect={selectDisciples}
                dataOptions={optionsDisciples && optionsDisciples}
              />
            </S.GridSelect>
          </Fragment>
        );

      default:
        return;
    }
  };

  const renderMoreInput = () => {
    switch (office) {
      case "pastor de rede":
        return (
          <InputFieldComponent
            primary
            value={formValues.network}
            placeholder={`* ${FormFields.NETWORK}`}
            onChangeText={(value) =>
              setFormValues({ ...formValues, network: value })
            }
          />
        );
      case "lider de celula":
        return (
          <InputFieldComponent
            primary
            value={formValues.numberCelula}
            placeholder={`* ${FormFields.NUMBER_CELULA}`}
            onChangeText={(value) =>
              setFormValues({ ...formValues, numberCelula: value })
            }
          />
        );

      default:
        return;
    }
  };

  return (
    <Fragment>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.REGISTER_USERS}</S.TitlePage>
        </S.ComeBack>
        {/* <NotificationComponent /> */}
      </HeaderComponent>

      <S.Main>
        <S.GridSelect>
          <SelectComponent
            label="Cargo"
            onChange={handleSelectOffice}
            selectedOption={handleSelectOffice}
            labelSelect={office}
            dataOptions={officeMembers}
          />
        </S.GridSelect>

        {renderSelectsOptions()}

        {office !== "Selecionar" && (
          <Fragment>
            {renderMoreInput()}

            <InputFieldComponent
              primary
              value={formValues.email}
              placeholder={`* ${FormFields.EMAIL}`}
              onChangeText={(value) =>
                setFormValues({ ...formValues, email: value })
              }
            />

            <InputFieldComponent
              primary
              value={formValues.password}
              placeholder={`* ${FormFields.PASSWORD}`}
              onChangeText={(value) =>
                setFormValues({ ...formValues, password: value })
              }
            />

            <InputFieldComponent
              primary
              value={formValues.name}
              placeholder={`* ${FormFields.FULL_NAME}`}
              onChangeText={(value) =>
                setFormValues({ ...formValues, name: value })
              }
            />

            <InputMaskComponent
              value={formValues.phone}
              mask="phone"
              maxLength={14}
              placeholder={`* ${FormFields.PHONE}`}
              inputMaskChange={(value: string) =>
                setFormValues({ ...formValues, phone: value })
              }
              primary
            />

            <InputFieldComponent
              primary
              value={address.cep}
              placeholder={FormFields.CEP}
              onEndEditing={() => getAddressFromApi()}
              onChangeText={(value) =>
                setAddress((old) => ({
                  ...old,
                  cep: value,
                }))
              }
            />

            <S.GridForm>
              <S.GridItemLarge>
                <InputFieldComponent
                  primary
                  value={address.logradouro}
                  placeholder={
                    address.logradouro !== ""
                      ? address.logradouro
                      : FormFields.ADDRESS
                  }
                  onChangeText={(value) =>
                    setAddress((old) => ({
                      ...old,
                      logradouro: value,
                    }))
                  }
                  editable={address.logradouro === ""}
                />
              </S.GridItemLarge>

              <S.GridItemSmall>
                <InputFieldComponent
                  primary
                  value={formValues.numberHouse}
                  placeholder={FormFields.NUMBER}
                  onChangeText={(value) =>
                    setFormValues({ ...formValues, numberHouse: value })
                  }
                />
              </S.GridItemSmall>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={address.bairro}
                  placeholder={
                    address.bairro !== "" ? address.bairro : FormFields.DISTRICT
                  }
                  onChangeText={(value) =>
                    setAddress((old) => ({
                      ...old,
                      bairro: value,
                    }))
                  }
                  editable={address.bairro === ""}
                />
              </S.GridItem>

              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={address.localidade}
                  placeholder={
                    address.localidade !== ""
                      ? address.localidade
                      : FormFields.CITY
                  }
                  onChangeText={(value) =>
                    setAddress((old) => ({
                      ...old,
                      localidade: value,
                    }))
                  }
                  editable={address.localidade === ""}
                />
              </S.GridItem>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <SelectComponent
                  label="Estado"
                  onChange={(value) =>
                    setFormValues({ ...formValues, state: value })
                  }
                  selectedOption={(value) =>
                    setFormValues({ ...formValues, state: value })
                  }
                  labelSelect={address.uf ? address.uf : formValues.state}
                  dataOptions={selectState}
                  disabled={address.uf !== ""}
                />
              </S.GridItem>

              <S.GridItem>
                <SelectComponent
                  label="Estado Civil"
                  onChange={(value) =>
                    setFormValues({ ...formValues, stateCivil: value })
                  }
                  selectedOption={(value) =>
                    setFormValues({ ...formValues, stateCivil: value })
                  }
                  labelSelect={formValues.stateCivil}
                  dataOptions={selectCivilStatus}
                />
              </S.GridItem>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <DateComponent
                  text={stateReducer.textRegister}
                  open={showMode}
                  showCalender={showCalender}
                  dataDados={stateReducer.dateRegister}
                  onChange={handleDateChange}
                  label="Data de Nascimento"
                />
              </S.GridItem>
            </S.GridForm>

            <S.FooterFields>
              <S.Required>* Campos obrigatórios</S.Required>
              <ButtonComponent
                title="Cadastrar"
                onPress={registerUser}
                width="170px"
              />
            </S.FooterFields>
          </Fragment>
        )}
      </S.Main>

      <ModalComponent
        isVisible={confirmRegisterModal}
        onBackdropPress={() => setConfirmRegisterModal(false)}
      >
        <DefaultContentModalComponent
          closeModal={setConfirmRegisterModal}
          type="register"
          data={formValues.name}
        />
      </ModalComponent>
    </Fragment>
  );
}
