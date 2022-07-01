import React, { useEffect } from "react";

import { useFormReport } from "../../../hooks/useFormReport";
import { FormReportActions } from "../../../contexts/FormReport";

import { IModalInfosProps } from "./types";

import * as S from "./styles";

export function DefaultContentModalComponent({
  closeModal,
  type,
  data,
}: IModalInfosProps) {
  const { state, dispatch } = useFormReport();

  return (
    <S.ContentModal>
      {type === "addVisitor" && (
        <S.Description>
          Visitante <S.Name>{state.nameVisitor}</S.Name> adicionado com sucesso!
        </S.Description>
      )}

      {type === "sendReport" && (
        <S.Description>Relatório entregue com sucesso</S.Description>
      )}

      {type === "register" && (
        <S.InfoModal>
          <S.Description>
            Cadastro de <S.Name>{data}</S.Name> efetuado com sucesso.
          </S.Description>
        </S.InfoModal>
      )}

      {type === "edited" && (
        <S.Description>
          Cadastro de <S.Name>{data}</S.Name> editado com sucesso
        </S.Description>
      )}
      <S.Success name="verified" />
    </S.ContentModal>
  );
}
