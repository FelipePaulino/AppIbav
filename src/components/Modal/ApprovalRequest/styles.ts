import styled from "styled-components/native";
import { AntDesign } from '@expo/vector-icons';

export const Container = styled.View`
    display: flex;
    align-items: center;
`

export const Box = styled.View`
    padding: 30px 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    background: #fff;
    width: 261px;
`

export const ContainerText = styled.View`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

export const TextDelete = styled.Text`
    font-size: 14px;
    text-align: center;
    color: #666666;
`

export const BoldTextBlue = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000A3E;
`

export const BoldDeleteText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #D30000;
`

export const TextRed = styled.Text`
    font-size: 14px;
    text-align: center;
    color: #D30000;
`

export const IconBox = styled.View`
    margin-top: 20px;
`

export const Icon = styled(AntDesign)`
  font-size: ${({ theme }) => theme.fonts.fontSize.large};
`;