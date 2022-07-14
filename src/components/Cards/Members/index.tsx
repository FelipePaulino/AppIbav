import React, { useState } from "react";
import { SelectComponent } from '../../Select'
import { useFormReport } from "../../../hooks/useFormReport";
import { FormReportActions } from "../../../contexts/FormReport";

import { IDataPros } from "./types";

import * as S from "./styles";

export function CardMembersComponent({ data, setSelectPerson }: IDataPros) {
  const presenca = [
    {
      label: "F",
      value: "F"
    },
    {
      label: "P",
      value: "P"
    },
    {
      label: "D",
      value: "D"
    },
    {
      label: "T",
      value: "T"
    },
    {
      label: "V",
      value: "V"
    }
  ]

  const { state, dispatch } = useFormReport();
  const handlePresentCelula = (value: string) => {
    const removeDuplicate = state.presencaCelula.filter((item: any) => {
      return item.nome !== data.nome
    })
    setSelectPerson({ ...data, celula: value })
    dispatch({
      type: FormReportActions.setPresencaCelula,
      payload: [...removeDuplicate, { ...data, celula: value }],
    });
  };

  const handlePresentCulto = (value: string) => {
    const removeDuplicate = state.presencaCulto.filter((item: any) => {
      return item.nome !== data.nome
    })
    setSelectPerson({ ...data, culto: value })
    dispatch({
      type: FormReportActions.setPresencaCulto,
      payload: [...removeDuplicate, { ...data, culto: value }],
    });
  };

  const filterPresencaCelula = state?.presencaCelula?.filter((item: any) => {
    return item.nome === data.nome
  })

  const filterPresencaCulto = state?.presencaCulto?.filter((item: any) => {
    return item.nome === data.nome
  })

  return (
    <S.Content>
      <S.ContentName>
        <S.InfoName>{data.nome}</S.InfoName>
      </S.ContentName>

      <S.ContainerSelect>
        <S.BoxSelect >
          <SelectComponent
            onChange={handlePresentCelula}

            selectedOption={handlePresentCelula}
            labelSelect={filterPresencaCelula[0] ? filterPresencaCelula[0]?.celula : "-"}
            dataOptions={presenca}
            small
            width="55"
          />
        </S.BoxSelect>
        <S.BoxSelect>
          <SelectComponent
            onChange={handlePresentCulto}
            selectedOption={handlePresentCulto}
            labelSelect={filterPresencaCulto[0] ? filterPresencaCulto[0]?.culto : "-"}
            dataOptions={presenca}
            small
            width="55"
          />
        </S.BoxSelect>
      </S.ContainerSelect>
    </S.Content>
  );
}
