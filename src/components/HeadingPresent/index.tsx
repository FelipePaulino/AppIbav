import React from "react";

import * as S from "./styles";

export function HeadingPresentComponent({ cat, width }: any) {
  return (
    <S.Heading>
      <S.Titles width={width}>
        {cat && <S.Title>CAT.</S.Title>}
        <S.Title>Célula</S.Title>
        <S.Title>Culto</S.Title>
      </S.Titles>
    </S.Heading>
  );
}
