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
  ...rest
}: IContentProps) {
  return (
    <S.Content width={width} heigth={heigth} {...rest}>
      <S.Background>
        {icon && (
          <Feather name={icon} size={24} color={color} />
        )}

        <S.Title size={size}>{title}</S.Title>
      </S.Background>
    </S.Content>
  );
}
