import React, { useState } from 'react';
import * as S from './styles';
import { IPersonProps } from './types';

export function PersonLabelComponent({
  nome,
  status,
  onPress,
  delMember,
}: IPersonProps) {

  return (
    <S.Box>
        <S.ContainerPerson onPress={onPress}>
                <S.TextName>{nome}</S.TextName>
                <S.BoxStatus status={status}>
                  <S.TextStatus >{status}</S.TextStatus>
                </S.BoxStatus>
        </S.ContainerPerson>
        <S.Icon name="trash" onPress={delMember}/>
    </S.Box>
  );
}
