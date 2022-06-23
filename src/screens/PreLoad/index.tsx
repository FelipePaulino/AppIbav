import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loadingGif = require("../../assets/loading.gif");

import { GetStorage } from "../../common/constants/storage";

import { IPropsAuthStack } from "../../routes/AuthStack/types";

import * as S from "./styles";

export function PreloadScreen() {
  const navigation = useNavigation<IPropsAuthStack>();

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem(GetStorage.USER_INFO);

      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("SignIn");
      }
    };

    checkUser();
  }, []);

  return (
    <S.Container>
      <S.Loading source={loadingGif} />
    </S.Container>
  );
}
