import React, { Fragment } from "react";

import { IContentProps } from "./types";

import * as S from "./styles";

export function TitleComponent({
  small,
  medium,
  large,
  primary,
  title,
  weight,
  uppercase,
  decoration,
  red,
  blue,
}: IContentProps) {
  return (
    <Fragment>
      {small && (
        <S.Small
          red={red}
          blue={blue}
          primary={primary}
          weight={weight}
          uppercase={uppercase}
        >
          {title}
        </S.Small>
      )}

      {medium && (
        <S.Medium
          red={red}
          blue={blue}
          primary={primary}
          weight={weight}
          uppercase={uppercase}
        >
          {title}
        </S.Medium>
      )}

      {large && (
        <S.Large
          red={red}
          blue={blue}
          primary={primary}
          weight={weight}
          uppercase={uppercase}
        >
          {title}
        </S.Large>
      )}

      {decoration && (
        <S.Decoration
          red={red}
          blue={blue}
          weight={weight}
          uppercase={uppercase}
        >
          {title}
        </S.Decoration>
      )}
    </Fragment>
  );
}
