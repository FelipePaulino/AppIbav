import React from "react";
import { ScrollView } from "react-native";

import { IContentSelect } from "./types";

import * as S from "./styles";

export function ContentSelect({
  changeModalVisibility,
  onChange,
  selectedOption,
  dataOptions,
  alloption,
}: IContentSelect) {
  const selectOption = (option: any) => {
    changeModalVisibility(false);
    onChange(option);
    selectedOption(option);
  };

  const option = dataOptions.map((item: any, index: any) => {
    return (
      <>
        <S.Options key={index} onPress={() => selectOption(item.value)}>
          <S.OptionSelect>{item.value}</S.OptionSelect>
        </S.Options>
      </>
    );
  });

  return (
    <S.Content onPress={() => changeModalVisibility(false)}>
      <S.Container>
        <S.ContentOptions>
          {alloption && (
            <S.Options onPress={() => selectOption("TODOS")}>
              <S.OptionSelect>TODOS</S.OptionSelect>
            </S.Options>
          )}
          <ScrollView>{option}</ScrollView>
        </S.ContentOptions>
      </S.Container>
    </S.Content>
  );
}
