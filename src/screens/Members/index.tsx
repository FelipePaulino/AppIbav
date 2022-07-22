import React, { useState, useEffect, Fragment } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HeaderComponent } from "../../components/Header";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { PersonLabelComponent } from "../../components/PersonLabel";
import { SelectComponent } from "../../components/Select";
import { TitleComponent } from "../../components/Title";

const loadingGif = require("../../assets/loader-two.gif");

import FormFields from "../../common/constants/form";
import useUserFiltered from "../../hooks/useUserFiltered";
import { GetStorage } from "../../common/constants/storage";
import MenuNavigation from "../../common/constants/navigation";

import { IPropsAppStack } from "../../routes/AppStack/types";

import * as S from "./styles";
import { ModalComponent } from "../../components/Modal";
import { RequestContentModalComponent } from "../../components/Modal/Request";
import { connectApi } from "../../common/services/ConnectApi";
import { FormReportActions } from "../../contexts/FormReport";
import { ApprovalRequest } from "../../components/Modal/ApprovalRequest";
import RequestService from "../../common/services/RequestService";
import { useFormReport } from "../../hooks/useFormReport";
import { IContentProps } from "../SendReport/types";

export function MembersScreen(this: any) {
  const [members, setMembers] = useState<any>([]);
  const [sendModal, setSendModal] = useState(false);
  const [modalConcluded, setModalConcluded] = useState(false);
  const [name, setName] = useState<string>();
  const [id, setId] = useState<any>();
  const [idCelulaMembers, setIdCelulaMembers] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [celulas, setCelulas] = useState<any>()
  const [celulaFiltered, setCelulaFiltered] = useState<any>([]);
  const [teste, setTeste] = useState<any>()
  const [teste2, setTeste2] = useState<any>()

  const { user } = useUserFiltered();
  const { state, trigger, setTrigger, dispatch } = useFormReport()
  const navigation = useNavigation<IPropsAppStack>();

  const identifyCelula = user && user[0][1].numero_celula;

  const serviceGet = new RequestService()

  const idCelula = members && members.length > 0 && Object?.entries(members[0])[0][1];

  const userInfo = user && user[0][1];
  const whatOffice = userInfo && userInfo.cargo;

  const selectedOptionCelula = (value: string) => {
    dispatch({
      type: FormReportActions.setTextSelectCelula,
      payload: value,
    });
  };

  const handleCelulaChange = (value: string) => {
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: value,
    });
  };

  useEffect(() => {
    const getCelulas = async () => {
      await serviceGet.getCelulas().then((response) => {
        setCelulas(Object.entries(response))
      })
    }

    getCelulas()
  }, [trigger]);

  if (whatOffice === 'lider') {
    useEffect(() => {
      const filterMembers =
        celulas &&
        celulas.length > 0 &&
        celulas[1]?.filter((item: any) => {
          return item.numero_celula == identifyCelula;
        });

      if (filterMembers) {
        setMembers(filterMembers);
        AsyncStorage.setItem(
          GetStorage.MEMBERS_FILTERED,
          JSON.stringify(filterMembers)
        );
      }
    }, [identifyCelula, celulas]);
  }

  const timeModal = () => {
    setModalConcluded(true);
  };

  const deleteMember = () => {
    try {
      connectApi.delete(`/celulas/${idCelula}/membros/${id}.json`).then(() => {
        setSendModal(false);
        setTimeout(timeModal, 300);
        setTrigger(!trigger)
      });
    } catch (err) {
      alert(err);
    }
  };

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

  useEffect(() => {
    const filterCelulas =
      celulas &&
      celulas.length > 0 &&
      celulas[1]?.filter((celula: any) => {
        return celula.discipulador === userInfo.nome;
      });

    setCelulaFiltered(filterCelulas);
  }, [celulas]);

  // Tratativas para o usuário administrador
  const redes = celulas && celulas?.map((item: any) => (item[1].rede))

  const redesUnicas = redes && redes.filter(function (este: any, i: any) {
    return redes.indexOf(este) === i;
  });

  const mapRedesUnicas = redesUnicas && redesUnicas.map((item: any) => {
    return {
      value: item
    }
  })

  const filtrandoRedes = celulas && celulas.filter((item: any) => {
    return item[1].rede === state.redeSelect
  })

  const discipulado = filtrandoRedes && filtrandoRedes.map((item: any) =>
    (item[1].discipulador))

  const discipuladossUnicos = discipulado && discipulado.filter(function (este: any, i: any) {
    return discipulado.indexOf(este) === i;
  });

  const mapDiscipuladosUnicos = discipuladossUnicos && discipuladossUnicos.map((item: any) => {
    return {
      value: item
    }
  })

  const filtrandoDiscipulado = celulas && celulas.length > 0 && celulas?.filter((item: any) => {
    return item[1].discipulador === state.discipuladoSelect && item[1].rede === state.redeSelect
  })

  const celulaAdm = filtrandoDiscipulado && filtrandoDiscipulado.map((item: any) => {
    return {
      value: `${item[1].numero_celula} - ${item[1].lider}`
    }
  })

  if (whatOffice === 'administrador') {
    useEffect(() => {
      const idCelulaSelect = state.celulaSelect && state.celulaSelect.split(" -")[0];

      const filterMembers =
        celulas &&
        celulas.filter((item: any) => {
          return (
            item[1].numero_celula == idCelulaSelect
          )
        });

      if (filterMembers) {
        setMembers(filterMembers);
      }
    }, [celulas, state.celulaSelect, trigger])
  }

  const newMembersList =
    members &&
    members.length > 0 &&
    Object.entries(members[0][1].membros).filter(
      (member: any) =>
        member.status !== "visitante"
    );

  // Tratativas para o usuário pastor

  const filtrandoDiscipuladoPastor = celulas && celulas.length > 0 && celulas[1]?.filter((item: any) => {
    return item.rede === user[0][1].rede
  })

  const mapDiscipuladoPastor = filtrandoDiscipuladoPastor && filtrandoDiscipuladoPastor.map((item: any) => {
    return item.discipulador
  })

  const discipuladossUnicosPastor = mapDiscipuladoPastor && mapDiscipuladoPastor.filter(function (este: any, i: any) {
    return mapDiscipuladoPastor.indexOf(este) === i;
  });

  const mapDiscipuladossUnicosPastor = discipuladossUnicosPastor && discipuladossUnicosPastor.map((item: any) => {
    return {
      value: item
    }
  })

  const filtrandoDiscipuladoPastorSelect = celulas && celulas.length > 0 && celulas[1]?.filter((item: any) => {
    return item.discipulador === state.discipuladoSelect
  })

  const celulaPastor = filtrandoDiscipuladoPastorSelect && filtrandoDiscipuladoPastorSelect.map((item: any) => {
    return {
      value: `${item.numero_celula} - ${item.lider}`
    }
  })

  const optionsCelula =
    celulaFiltered &&
    celulaFiltered.map((celulaIdentify: IContentProps) => {
      return {
        value: `${celulaIdentify?.numero_celula} - ${celulaIdentify.lider}`,
      };
    });

  const office = () => {
    switch (whatOffice) {
      case "lider":
        return (
          <S.Grid>
            <TitleComponent title={`${FormFields.CELULA}:`} small primary />
            <S.ContentC>
              <S.IconC name="user-friends" />
              <S.DescriptionC>{`${userInfo && userInfo.numero_celula} - ${userInfo && userInfo.rede
                }`}</S.DescriptionC>
            </S.ContentC>
          </S.Grid>
        );

      case "discipulador":
        return (
          <S.Grid>
            <TitleComponent title={`${FormFields.CELULA}:`} small primary />
            <S.ContentC>
              <S.IconC name="user-friends" />
              <SelectComponent
                onChange={handleCelulaChange}
                labelSelect={state.textSelectCelula}
                dataOptions={optionsCelula && optionsCelula}
                selectedOption={selectedOptionCelula}
              />
            </S.ContentC>
          </S.Grid>
        );
      case "pastor":
        return (
          <>
            <S.Grid>
              <TitleComponent title={`${FormFields.DISCIPLESHIP}:`} small primary />
              <S.ContentC>
                <S.IconC name="network-wired" />
                <SelectComponent
                  onChange={handleDiscipuladoChange}
                  labelSelect={state.discipuladoSelect}
                  dataOptions={mapDiscipuladossUnicosPastor}
                  selectedOption={handleDiscipuladoChange}
                />
              </S.ContentC>
            </S.Grid>
            <S.Grid>
              <TitleComponent title={`${FormFields.CELULA}:`} small primary />
              <S.ContentC>
                <S.IconC name="user-friends" />
                <SelectComponent
                  onChange={handleCelulaChange}
                  labelSelect={state.celulaSelect}
                  dataOptions={celulaPastor}
                  selectedOption={selectedOptionCelula}
                />

              </S.ContentC>
            </S.Grid>
          </>
        );

      case "administrador":
        return (
          <>
            <S.Grid>
              <TitleComponent title={`${FormFields.NETWORK}:`} small primary />
              <S.ContentC>
                <S.IconC name="vector-square" />
                <SelectComponent
                  onChange={handleRedeChange}
                  labelSelect={state.redeSelect}
                  dataOptions={mapRedesUnicas}
                  selectedOption={handleRedeChange}
                  width='300'
                />
              </S.ContentC>
            </S.Grid>
            <S.Grid>
              <TitleComponent title={`${FormFields.DISCIPLESHIP}:`} small primary />
              <S.ContentC>
                <S.IconC name="network-wired" />
                <SelectComponent
                  onChange={(handleDiscipuladoChange)}
                  labelSelect={state.discipuladoSelect}
                  dataOptions={mapDiscipuladosUnicos}
                  selectedOption={handleDiscipuladoChange}
                  width='300'
                  disabled={state.redeSelect === "Selecione" ? true : false}
                />
              </S.ContentC>
            </S.Grid>
            <S.Grid>
              <TitleComponent title={`${FormFields.CELULA}:`} small primary />
              <S.ContentC>
                <S.IconC name="user-friends" />
                <SelectComponent
                  onChange={handleCelulaChange}
                  labelSelect={state.celulaSelect}
                  dataOptions={celulaAdm}
                  selectedOption={selectedOptionCelula}
                  width='300'
                  disabled={state.discipuladoSelect === "Selecione" ? true : false}
                />
              </S.ContentC>
            </S.Grid>
          </>
        );
    }
  };

  return (
    <Fragment>
      <HeaderComponent>
        <S.ContentHeader>
          <S.Division>
            <ComeBackComponent />
            <S.Navigation>{MenuNavigation.MEMBERS}</S.Navigation>
          </S.Division>
          <ButtonComponent
            title="Cadastrar"
            onPress={() => { }}
            width="136px"
            heigth="33px"
            size="12px"
            icon="user-plus"
            color="white"
          />
        </S.ContentHeader>
      </HeaderComponent>
      <ScrollView>
        <S.Container>
          {loading ? (
            <S.Loading source={loadingGif} />
          ) : (
            <Fragment>
              {office()}
              {newMembersList ? (
                newMembersList?.map((item: any) => {
                  return (
                    <Fragment>
                      <PersonLabelComponent
                        nome={item[1].nome}
                        status={item[1].status}
                        onPress={() =>
                          navigation.navigate("MemberInformation", {
                            nome: `${item[1].nome}`,
                            telefone: `${item[1].telefone}`,
                            email: `${item[1].email}`,
                            endereco: `${item[1].endereco}`,
                            bairro: `${item[1].bairro}`,
                            cep: `${item[1].cep}`,
                            cidade: `${item[1].cidade}`,
                            estado: `${item[1].estado}`,
                            estado_civil: `${item[1].estado_civil}`,
                            data_de_nascimento: `${item[1].data_de_nascimento}`,
                            status: `${item[1].status}`,
                            numero_casa: `${item[1].numero_casa}`,
                            id: `${item[0]}`,
                            active: setTrigger
                          })
                        }
                        delMember={() => {
                          setSendModal(true),
                            setName(item[1].nome),
                            setId(item[0]);
                        }}
                      />
                    </Fragment>
                  );
                })) : (
                <>
                </>
              )}
            </Fragment>
          )}
        </S.Container>
      </ScrollView>
      <ModalComponent
        isVisible={sendModal}
        onBackdropPress={() => setSendModal(false)}
      >
        <RequestContentModalComponent
          name={name}
          cancel={() => setSendModal(false)}
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