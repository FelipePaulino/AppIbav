import styled from "styled-components/native";

export const Container = styled.View`
    display: flex;
    align-items: center;
`

export const Box = styled.View`
    padding: 27px 10px 20px;
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
    text-transform: uppercase;
    color: #000A3E;
`

export const BoldDeleteText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #D30000;
`

export const ContainerButton = styled.View`
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
`