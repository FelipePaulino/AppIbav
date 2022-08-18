import React, { useState } from "react";
import { Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { ButtonComponent } from "../../components/Button";
import { InputFieldComponent } from "../../components/InputField";

import { useAuth } from "../../hooks/useAuth";
import ButtonsText from "../../common/constants/buttons";

import * as S from "./styles";

export function SignInScreen() {
  const { signIn, errorLogin, isLogged } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorr, setErrorr] = useState("");
  const [show, setShow] = useState(true);

  function handleSignIn() {
    signIn(email, password);
    setTimeout(() => {
      if (isLogged === false) {
        setErrorr(errorLogin);
      }
    }, 1000);
  }

  return (
    <S.Container source={require("../../assets/background.png")}>
      <ScrollView>
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

              <S.FieldPassword>
                <InputFieldComponent
                  icon={show ? "eye-off" : "eye"}
                  placeholder="Senha"
                  secureTextEntry={show}
                  placeholderTextColor="white"
                  value={password}
                  onChangeText={setPassword}
                  showPass={() => setShow(!show)}
                />
              </S.FieldPassword>
              <S.Buttons>
                <ButtonComponent
                  title={ButtonsText.ENTER}
                  onPress={handleSignIn}
                />
              </S.Buttons>
              <S.ErrorLogin>{errorr}</S.ErrorLogin>
            </S.Content>
          </S.Form>
        </TouchableWithoutFeedback>
      </ScrollView>
    </S.Container>
  );
}
