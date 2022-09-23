import React, { useState, useEffect, createContext } from "react";
import { Alert } from "react-native";
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";

import { firebaseConfig } from "../../config/firebase";

import { IAuthContextData, IAuthProviderProps } from "./types";
import { GetStorage } from "../../common/constants/storage";

export const AuthenticatedContext = createContext({} as IAuthContextData);

export function AuthenticatedProvider({ children }: IAuthProviderProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [errorLogin, setErrorLogin] = useState<string>(
    "Senha ou login incorreto"
  );

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert("Login", "Informe o e-mail e a senha");
    }

    setIsLogged(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (account) => {
        if (account.user) {
          await AsyncStorage.setItem(
            GetStorage.USER_AUTHENTICATED,
            JSON.stringify(account.user)
          );
          setUser(account.user);
        }
      })
      .catch((error) => {
        const { code } = error;

        if (code === "auth/user-not-found" || code === "auth/wrong-password") {
          return setErrorLogin(errorLogin);
        } else {
          return Alert.alert("Login", "Não foi possível realizar o login");
        }
      })
      .finally(() => setIsLogged(false));
  }

  async function loadUserStorageData() {
    setIsLogged(true);

    const storedUser = await AsyncStorage.getItem(
      GetStorage.USER_AUTHENTICATED
    );

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;

      setUser(userData);
    }

    setIsLogged(false);
  }

  async function signOut() {
    await auth.signOut();
    await AsyncStorage.removeItem(GetStorage.USER_AUTHENTICATED);
    await AsyncStorage.removeItem(GetStorage.USER_FILTERED);
    await AsyncStorage.removeItem(GetStorage.MEMBERS_FILTERED);

    setUser(null);
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthenticatedContext.Provider
      value={{ signIn, isLogged, user, signOut, errorLogin }}
    >
      {children}
    </AuthenticatedContext.Provider>
  );
}
