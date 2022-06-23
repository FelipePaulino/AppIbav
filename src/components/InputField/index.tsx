import React, { Fragment } from "react";
import { Feather } from "@expo/vector-icons";

import { IContentInputProps } from "./types";

import * as S from "./styles";

export function InputFieldComponent({
  icon,
  value,
  primary,
  label,
  ...rest
}: IContentInputProps) {
  return (
    <Fragment>
      {label && <S.Label>{label}</S.Label>}
      <S.Field primary={primary}>
        <S.Input primary={primary} value={value} {...rest} />

        {icon && <Feather name={icon} size={24} color="#000A3E" />}
      </S.Field>
    </Fragment>
  );
}
