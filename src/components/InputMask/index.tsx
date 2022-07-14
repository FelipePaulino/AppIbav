import React from "react";

import { maskCep, maskPhone, maskCurrency } from "../../common/utils/masks";

import { InputProps } from "./types";

import * as S from "./styles";

export const InputMaskComponent: React.FC<InputProps> = ({
  mask,
  inputMaskChange,
  primary,
  height,
  padding,
  ...rest
}) => {
  function handleChange(text: string) {
    if (mask === "cep") {
      const value = maskCep(text);
      inputMaskChange(value);
    }

    if (mask === "phone") {
      const value = maskPhone(text);
      inputMaskChange(value);
    }

    if (mask === "currency") {
      const value = maskCurrency(text);
      inputMaskChange(value);
    }
  }

  return (
    <S.Field height={height}>
      <S.Input
        onChangeText={(text) => handleChange(text)}
        primary={primary}
        {...rest}
        padding={padding}
      />
    </S.Field>
  );
};
