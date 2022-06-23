import React, { Fragment, useState } from "react";
import { Text } from "react-native";
import { ModalComponent } from "../Modal";
import NotificationContentModalComponent from "../Modal/Notifications";

import * as S from "./styles";

export function NotificationComponent() {
  const [showNotification, setShowNotification] = useState(false);

  const handleOpenNotification = () => {
    setShowNotification(!showNotification);
  };

  const mock = [
    { name: "Polyane Paulino Ribeiro" },
    { name: "Felipe Paulino Ribeiro" },
  ];

  const counter = mock.length;

  return (
    <Fragment>
      <S.Notification onPress={handleOpenNotification}>
        <S.Icon name="notifications" />
        <S.Count>
          <S.Number>{counter}</S.Number>
        </S.Count>
      </S.Notification>

      <ModalComponent
        onBackdropPress={() => setShowNotification(false)}
        isVisible={showNotification}
      >
        <NotificationContentModalComponent
          setShowNotification={setShowNotification}
          data={mock}
        />
      </ModalComponent>
    </Fragment>
  );
}
