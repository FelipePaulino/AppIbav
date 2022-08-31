import { Alert, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { RequestModalProps } from "./types";

import * as S from "./styles";
import { ButtonComponent } from "../../Button";

export function RequestContentModalComponent({
  name,
  cancel,
  confirm,
}: RequestModalProps) {
  return (
    <S.Container>
      <S.Box>
        <S.ContainerText>
          <S.TextDelete>Você realmente deseja<S.BoldDeleteText> EXCLUIR</S.BoldDeleteText></S.TextDelete>
          <S.TextDelete>o cadastro de</S.TextDelete>
          <S.BoldTextBlue>{name}?</S.BoldTextBlue>
          <S.TextDelete>essa ação não tem volta.</S.TextDelete>
        </S.ContainerText>
        <S.ContainerButton>
            
          <ButtonComponent title="CANCELAR" onPress={cancel} width='105px' heigth='33px' size='12px'/>
          <ButtonComponent title="CONFIRMAR" onPress={confirm} width='105px' heigth='33px' size='12px'/>
        </S.ContainerButton>
      </S.Box>
    </S.Container>
  );
}