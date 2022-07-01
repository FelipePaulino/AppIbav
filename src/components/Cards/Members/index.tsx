import React, { useState } from "react";
import { SelectComponent } from '../../Select'
import { useFormReport } from "../../../hooks/useFormReport";
import { FormReportActions } from "../../../contexts/FormReport";

import { IDataPros } from "./types";

import * as S from "./styles";

export function CardMembersComponent({ data, setSelectPerson }: IDataPros) {
  console.log(data, 'data')
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

  const [presencaCelula, setPresencaCelula] = useState("-");
  const [presencaCulto, setPresencaCulto] = useState("-");

  const { state, dispatch } = useFormReport();
  console.log(state, 'state')
  const handlePresentCelula = (value: string) => {
    setSelectPerson({ ...data, celula: value })
    dispatch({
      type: FormReportActions.setPresencaCelula,
      payload: [...state.presencaCelula, { ...data, celula: value }],
    });
  };

  const handlePresentCulto = (value: string) => {
    setSelectPerson({ ...data, culto: value })
    setPresencaCulto(value)
  };

  const filterPresenca = state?.presencaCelula?.filter(item =>{
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
            labelSelect={filterPresenca[0] ? filterPresenca[0]?.celula : "-"}
            dataOptions={presenca}
            small
            width="55"
          />
        </S.BoxSelect>
        <S.BoxSelect>
          <SelectComponent
            onChange={handlePresentCulto}
            selectedOption={handlePresentCulto}
            labelSelect={presencaCulto}
            dataOptions={presenca}
            small
            width="55"
          />
        </S.BoxSelect>
      </S.ContainerSelect>
    </S.Content>
  );
}
