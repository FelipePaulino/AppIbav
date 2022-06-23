import React from "react";
import { IContentProps } from "./types";
import * as S from "./styles";

export function SelectedMenuComponent({ icon, title, onPress }: IContentProps) {
  return (
    <S.Content onPress={onPress}>
      <S.BackgroundIcon>{icon}</S.BackgroundIcon>
      <S.Title>{title}</S.Title>
    </S.Content>
  );
}
