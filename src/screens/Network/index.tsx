import React, { Fragment, useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

import FormFields from "../../common/constants/form";
import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";
import MenuNavigation from "../../common/constants/navigation";
import RequestService from "../../common/services/RequestService";

import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { SelectComponent } from "../../components/Select";
import { ModalComponent } from "../../components/Modal";
import { ApprovalRequest } from "../../components/Modal/ApprovalRequest";
import { RequestContentModalComponent } from "../../components/Modal/Request";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { PersonLabelComponent } from "../../components/PersonLabel";

import * as S from "./styles";
import { connectApi } from "../../common/services/ConnectApi";
import axios from "axios";

const loadingGif = require("../../assets/loader-two.gif");

export default function NetworkScreenList() {
  const [id, setId] = useState("");
  const [celulas, setCelulas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>();
  const [confirmModal, setConfirmModal] = useState(false);
  const [showShearch, setShowShearch] = useState(false);
  const [modalConcluded, setModalConcluded] = useState(false);
  const [everyOne, setEveryOne] = useState("Todos");
  const { state, dispatch, setTrigger, trigger } = useFormReport();

  const service = new RequestService();

  useEffect(() => {
    const getUsers = async () => {
      await service
        .getUsers()
        .then((response) => {
          setCelulas(response);
        })
        .finally(() => setLoading(false));
    };

    getUsers();
  }, [trigger]);

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

  const rede =
    celulas &&
    Object.entries(celulas).filter((items: any) => {
      return items[1]?.cargo === "pastor";
    });

  const discipulado =
    celulas &&
    Object.entries(celulas).filter((items: any) => {
      return (
        items[1]?.cargo === "discipulador" &&
        items[1]?.rede === state.redeSelect
      );
    });

  const lider =
    celulas &&
    Object.entries(celulas).filter((items: any) => {
      return (
        items[1]?.cargo === "lider de celula" &&
        items[1]?.discipulado === state.discipuladoSelect
      );
    });

  const discipuladossUnicos = discipulado.map((items: any) => items[1]?.nome);

  const mapDiscipuladosUnicos = discipuladossUnicos.map((item: any) => {
    return {
      value: item,
    };
  });

  const redesUnicas = rede.map((items: any) => items[1]?.rede);

  const mapRedesUnicas = redesUnicas.map((item: any) => {
    return {
      value: item,
    };
  });

  const timeModal = () => {
    setModalConcluded(true);
  };

  const deleteMember = async () => {
    try {
      await axios.delete(
        `https://app-ibav-f06f4-default-rtdb.firebaseio.com/users/${id}.json`,
        {}
      );
      setConfirmModal(false);
      setTimeout(timeModal, 300);
      setTrigger(!trigger);
    } catch (err) {
      alert("Houve algum problema ao excluir esse usuário");
    }
  };

  return (
    <Fragment>
      <HeaderComponent>
        <ComeBackComponent />
        <S.Navigation>{MenuNavigation.NETWORK}</S.Navigation>
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <ScrollView>
          <S.Content>
            <S.Form behavior="position" enabled>
              <S.Grid>
                <TitleComponent
                  title={`${FormFields.NETWORK}:`}
                  small
                  primary
                />
                <S.ContentC>
                  <S.IconC name="vector-square" />
                  <SelectComponent
                    allOptions
                    onChange={handleRedeChange}
                    labelSelect={state.redeSelect}
                    dataOptions={mapRedesUnicas}
                    selectedOption={handleRedeChange}
                    width="300px"
                  />
                </S.ContentC>
              </S.Grid>

              <S.Grid>
                <TitleComponent
                  title={`${FormFields.DISCIPLESHIP}:`}
                  small
                  primary
                />
                <S.ContentC>
                  <S.IconC name="network-wired" />
                  <SelectComponent
                    onChange={handleDiscipuladoChange}
                    labelSelect={
                      state.discipuladoSelect
                        ? state.discipuladoSelect
                        : "Selecione"
                    }
                    dataOptions={state.redeSelect && mapDiscipuladosUnicos}
                    selectedOption={handleDiscipuladoChange}
                    width="300px"
                    disabled={
                      state.redeSelect === "TODOS" && "Selecione" ? true : false
                    }
                  />
                </S.ContentC>
              </S.Grid>
              {state.redeSelect !== "Selecione" && (
                <>
                  {state.redeSelect === "TODOS" && (
                    <>
                      <Text>Rede</Text>
                      {rede.map((items: any) => {
                        return (
                          <PersonLabelComponent
                            nome={items[1].rede}
                            delMember={() => {
                              setConfirmModal(true),
                                setName(items[1].rede),
                                setId(items[0]);
                            }}
                          />
                        );
                      })}
                    </>
                  )}
                  {!state.discipuladoSelect && state.redeSelect !== "TODOS" && (
                    <>
                      {discipulado.length > 0 ? (
                        <>
                          <Text>Discipulador</Text>
                          {discipulado.map((item: any) => {
                            return (
                              <PersonLabelComponent
                                nome={item[1].nome}
                                delMember={() => {
                                  setConfirmModal(true),
                                    setName(item[1].nome),
                                    setId(item[0]);
                                }}
                              />
                            );
                          })}
                        </>
                      ) : (
                        <Text>Não há Discipuladores</Text>
                      )}
                    </>
                  )}
                  {state.redeSelect && state.discipuladoSelect && (
                    <>
                      {lider.length > 0 ? (
                        <>
                          <Text>Célula</Text>
                          {lider.map((item: any) => {
                            return (
                              <PersonLabelComponent
                                nome={item[1].nome}
                                delMember={() => {
                                  setConfirmModal(true),
                                    setName(item[1].nome),
                                    setId(item[0]);
                                }}
                              />
                            );
                          })}
                        </>
                      ) : (
                        <Text>Não há lideres</Text>
                      )}
                    </>
                  )}
                </>
              )}
            </S.Form>
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
          </S.Content>
        </ScrollView>
      )}
    </Fragment>
  );
}
