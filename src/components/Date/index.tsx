import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import * as S from "./styles";
import { IContentProps } from "./types";

export function DateComponent({
  dataDados,
  showCalender,
  onChange,
  open,
  text,
  label,
}: IContentProps) {
  return (
    <S.Date>
      <S.Label>{label}</S.Label>
      <S.Content onPress={open}>
        <S.TextSelect>{text}</S.TextSelect>
        <S.SelectDate>
          <S.Icon name="calendar" />
        </S.SelectDate>
      </S.Content>

      {showCalender && (
        <DateTimePicker value={dataDados} onChange={onChange} textColor="red" />
      )}
    </S.Date>
  );
}
