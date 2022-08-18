import React from 'react';
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
      <S.ContainerPerson>
        <S.TextName>{nome}</S.TextName>
        <S.BoxStatus status={status}>
          <S.TextStatus>{status}</S.TextStatus>
        </S.BoxStatus>
      </S.ContainerPerson>
      <S.IconContent>
        <S.SpacingIcon>
          <S.IconEdit name="pencil" onPress={onPress} />
        </S.SpacingIcon>
        <S.SpacingIcon>
          <S.Icon name="trash" onPress={delMember} />
        </S.SpacingIcon>
      </S.IconContent>
    </S.Box>
  );
}
