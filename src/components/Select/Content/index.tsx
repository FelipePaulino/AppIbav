import React from "react";
import { ScrollView } from "react-native";

import { IContentSelect } from "./types";

import * as S from "./styles";

export function ContentSelect({
  changeModalVisibility,
  onChange,
  selectedOption,
  dataOptions,
}: IContentSelect) {
  const selectOption = (option: any) => {
    changeModalVisibility(false);
    onChange(option);
    selectedOption(option);
  };

  const option = dataOptions.map((item, index) => {
    return (
      <S.Options key={index} onPress={() => selectOption(item.value)}>
        <S.OptionSelect>{item.value}</S.OptionSelect>
      </S.Options>
    );
  });

  return (
    <S.Content onPress={() => changeModalVisibility(false)}>
      <S.Container>
        <S.ContentOptions>
          <ScrollView>{option}</ScrollView>
        </S.ContentOptions>
      </S.Container>
    </S.Content>
  );
}
