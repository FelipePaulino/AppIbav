import React from "react";

import * as S from "./styles";

export function FooterInfoComponent() {
  const infos = [
    { lettring: "F", text: ": Faltou" },
    { lettring: "P", text: ": Presença" },
    { lettring: "D", text: ": Doença" },
    { lettring: "T", text: ": Trabalho" },
    { lettring: "V", text: ": Viagem" },
  ];

  return (
    <S.Footer>
      {infos.map((info) => (
        <S.Info key={info.lettring}>
          <S.Decoration>{info.lettring}</S.Decoration>
          {info.text}
        </S.Info>
      ))}
    </S.Footer>
  );
}
