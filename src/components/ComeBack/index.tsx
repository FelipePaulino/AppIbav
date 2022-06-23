import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ArrowLeft } from "./styles";

export function ComeBackComponent() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <ArrowLeft name="arrow-back-ios" />
    </TouchableOpacity>
  );
}
