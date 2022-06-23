import React, { Fragment } from "react";

import { TitleComponent } from "../../Title";

import * as S from "./styles";

export default function NotificationContentModalComponent({
  setShowNotification,
  data,
}: any) {
  return (
    <S.Background>
      <S.Heading>
        <S.Close name="close" onPress={() => setShowNotification(false)} />
      </S.Heading>

      <S.ContainerInfo>
        {data ? (
          <Fragment>
            {data.map((item: any) => {
              return (
                <S.ContentInfo>
                  <S.Line />
                  <S.Info>
                    <S.InfoText>
                      O visitante {item.name} já tem{" "}
                      <S.Decoration>4 presenças</S.Decoration>{" "}
                      <S.Call>complete o cadastro</S.Call>
                    </S.InfoText>
                  </S.Info>
                </S.ContentInfo>
              );
            })}
          </Fragment>
        ) : (
          <S.InfoNotResults>
            <TitleComponent title="Não há nenhuma notificação" large weight />
          </S.InfoNotResults>
        )}
      </S.ContainerInfo>
    </S.Background>
  );
}
