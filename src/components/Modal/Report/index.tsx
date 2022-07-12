import { Alert } from "react-native";
import React, { Fragment } from "react";

import { TitleComponent } from "../../Title";
import { ButtonComponent } from "../../Button";

import useUserFiltered from "../../../hooks/useUserFiltered";
import { useFormReport } from "../../../hooks/useFormReport";
import { connectApi } from "../../../common/services/ConnectApi";

import { IContentModal } from "./types";

import * as S from "./styles";

export function ReportContentModalComponent({
  handleCloseModal,
  setSendModal,
}: IContentModal) {
  const { state } = useFormReport();
  const { user } = useUserFiltered();

  const presentCLMembers = state.members.filter((item) => item.celula === "P");
  const presentCTMembers = state.members.filter((item) => item.culto === "P");
  const presentCLVisitors = state.visitors.filter(
    (item) => item.celula === "P"
  );
  const presentCTVisitors = state.visitors.filter((item) => item.culto === "P");


  const handleSubmitForm = () => {
    try {
      const numero_celula = user && user[0][1].numero_celula;
      const oferta = state.offer;
      const data = state.textDate;

      let presencas = [...state.members, ...state.visitors];

      const observacoes = state.observations;

      connectApi
        .post("/relatorios.json", {
          data,
          numero_celula,
          observacoes,
          oferta,
          presencas,
        })
        .then(() => {
          setSendModal(true);
          handleCloseModal(false);
        })
    } catch (err) {
      if (err) {
        Alert.alert("Ops algo deu errado ao enviar o seu formulário!");
        handleCloseModal(false);
      }
    }
  };
  const tituloCelula = () => {
    switch (user && user[0][1].cargo) {
      case 'lider':
        return (
          <S.BoxTitle>
            <TitleComponent
              title={`Célula: `}
              decoration
              primary
              weight
            />
            <TitleComponent
              title={`${user && user[0][1].numero_celula} - ${user && user[0][1].rede
                }`}
              decoration
              primary
              uppercase
              weight
            />
          </S.BoxTitle>
        )
      case 'discipulador':
        return (
          <S.BoxTitle>
            <TitleComponent
              title={`Célula: `}
              decoration
              primary
              weight
            />
            <TitleComponent
              title={`${state.celulaSelect}`}
              decoration
              primary
              uppercase
              weight
            />
          </S.BoxTitle>
        )

      case 'pastor':
        return (
          <S.BoxTitle>
            <TitleComponent
              title={`Célula: `}
              decoration
              primary
              weight
            />
            <TitleComponent
              title={state.celulaSelect}
              decoration
              primary
              uppercase
              weight
            />
          </S.BoxTitle>

        )

      case 'administrador':
        return (
          <S.BoxTitle>
            <TitleComponent
              title={`Célula: `}
              decoration
              primary
              weight
            />
            <TitleComponent
              title={`${state.celulaSelect} - ${state.redeSelect}`}
              decoration
              primary
              uppercase
              weight
            />
          </S.BoxTitle>

        )
    }
  }

  return (
    <Fragment>
      <S.ContentModal>
        <S.TitleModal>Resumo do relatório</S.TitleModal>

        <S.ListModal>
          {tituloCelula()}
          <TitleComponent
            title={`Oferta: ${state.offer ? state.offer : "Nenhuma oferta!"}`}
            decoration
            primary
          />
          <TitleComponent
            title={`Data: ${state.textDate}`}
            decoration
            primary
          />
          <TitleComponent title="Presença:" decoration primary />
          <TitleComponent
            title={`- ${presentCLMembers ? presentCLMembers.length : 0
              } membros (célula)`}
            decoration
            primary
          />
          <TitleComponent
            title={`- ${presentCTMembers ? presentCTMembers.length : 0
              } membros (culto)`}
            decoration
            primary
          />
          <TitleComponent
            title={`- ${presentCLVisitors ? presentCLVisitors.length : 0
              } Visitantes (célula)`}
            decoration
            primary
          />
          <TitleComponent
            title={`- ${presentCTVisitors ? presentCTVisitors.length : 0
              } Visitantes (culto)`}
            decoration
            primary
          />
        </S.ListModal>

        <S.ObservationModal>
          <TitleComponent
            title={`Observações: ${state.observations ? state.observations : "Nenhuma observação!"
              }`}
            decoration
            primary
          />
        </S.ObservationModal>
        <S.BoxButton>
          <ButtonComponent
            title="Cancelar"
            onPress={() => handleCloseModal(false)}
            width='150px'
            size='16px'
          />

          <ButtonComponent
            title="Confirmar"
            onPress={handleSubmitForm}
            width='150px'
            size='16px'

          />
        </S.BoxButton>
      </S.ContentModal>
    </Fragment>
  );
}
