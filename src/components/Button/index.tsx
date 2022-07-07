import React from "react";
import { Feather } from "@expo/vector-icons";

import { IContentProps } from "./types";

import * as S from "./styles";

export function ButtonComponent({
  title,
  icon,
  width,
  heigth,
  size,
  color = "#000A3E",
  disabled,
  ...rest
}: IContentProps) {

  return (
    <S.Content width={width} heigth={heigth} {...rest} disabled={disabled} >
      <S.Background >
        {icon && (
          <S.BoxIcon>
            <Feather name={icon} size={20} color={color} />
          </S.BoxIcon>
        )}
        <S.Title size={size}>{title}</S.Title>
      </S.Background>
    </S.Content>
  );
}
