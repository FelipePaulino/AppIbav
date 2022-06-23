import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { ButtonComponent } from "../../components/Button";
import { InputFieldComponent } from "../../components/InputField";

import { useAuth } from "../../hooks/useAuth";
import ButtonsText from "../../common/constants/buttons";

import * as S from "./styles";

export function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  function handleSignIn() {
    signIn(email, password);
  }

  return (
    <S.Container source={require("../../assets/background.png")}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Form behavior="position" enabled>
          <S.Heading>
            <LogoComponent />
          </S.Heading>

          <S.Content>
            <S.Heading>
              <TitleComponent title="Entrar" uppercase large weight />
            </S.Heading>

            <S.Field>
              <InputFieldComponent
                placeholder="Usuário"
                placeholderTextColor="white"
                onChangeText={setEmail}
                value={email}
              />
            </S.Field>

            <S.Field>
              <InputFieldComponent
                placeholder="Senha"
                secureTextEntry
                placeholderTextColor="white"
                value={password}
                onChangeText={setPassword}
              />
            </S.Field>
            <S.Buttons>
              <ButtonComponent
                title={ButtonsText.ENTER}
                onPress={handleSignIn}
              />
            </S.Buttons>
          </S.Content>
        </S.Form>
      </TouchableWithoutFeedback>
    </S.Container>
  );
}
