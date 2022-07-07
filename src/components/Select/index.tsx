import React, { useState } from "react";
import Modal from "react-native-modal";
import { ContentSelect } from "./Content";

import { IContentProps } from "./types";

import * as S from "./styles";

export function SelectComponent({
  label,
  onChange,
  selectedOption,
  labelSelect,
  dataOptions,
  disabled,
  width,
  small
}: IContentProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisibility = (prev: boolean) => {
    if (!disabled) {
      setIsModalVisible(prev);
    }
  };

  return (
    <S.Content >
      <S.LabelField>{label}</S.LabelField>
      <S.Container onPress={() => changeModalVisibility(true)} small={small} width={width}>
        <S.Field>
          <S.Label>{labelSelect}</S.Label>
        </S.Field>
        <S.Icons disabled={disabled}>
          {isModalVisible ? (
            <S.Icon name="arrow-drop-up" />
          ) : (
            <S.Icon name="arrow-drop-down" />
          )}
        </S.Icons>
      </S.Container>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => changeModalVisibility(false)}
      >
        <ContentSelect
          changeModalVisibility={changeModalVisibility}
          selectedOption={selectedOption}
          onChange={onChange}
          dataOptions={dataOptions}
        />
      </Modal>
    </S.Content>
  );
}
