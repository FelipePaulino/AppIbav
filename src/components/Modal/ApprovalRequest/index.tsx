import React from "react";
import * as S from "./styles";


export function ApprovalRequest({ name }: any) {
    return (
        <S.Container>
            <S.Box>
                <S.ContainerText>
                    <S.TextDelete>A<S.BoldDeleteText> EXCLUSÃO </S.BoldDeleteText>do cadastro de</S.TextDelete>
                    <S.BoldTextBlue>{name}</S.BoldTextBlue>
                    <S.TextRed>foi enviado para aprovação</S.TextRed>
                    <S.IconBox>
                        <S.Icon name="checkcircle" size={24} color="black" />
                    </S.IconBox>
                </S.ContainerText>
            </S.Box>
        </S.Container>
    )
}