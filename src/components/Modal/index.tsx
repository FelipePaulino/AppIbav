import React from "react";
import Modal from "react-native-modal";

import { IContentProps } from "./types";

export function ModalComponent({
  isVisible,
  onBackdropPress,
  children,
}: IContentProps) {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      {children}
    </Modal>
  );
}
