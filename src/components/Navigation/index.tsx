import React, { Fragment } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MenuNavigation from "../../common/constants/navigation";

import { IDataProps } from "./types";
import { IPropsAppStack } from "../../routes/AppStack/types";
import { useFormReport } from "../../hooks/useFormReport";
import { Navigation } from "./styles";

export function NavigationComponent({ setData, setMembers, setVisitors }: IDataProps) {
  const navigation = useNavigation<IPropsAppStack>();

  const { state } = useFormReport();
  const disableNavegation = state.celulaSelect === null
  return (
    <Fragment>
      <Fragment>
        <TouchableOpacity
          onPress={() => { setMembers(false), setData(true) }}>
          <Navigation
            style={{ borderBottomColor: "white", borderBottomWidth: 2 }}          >
            {MenuNavigation.DATA}
          </Navigation>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { setMembers(true), setData(false) }}
          disabled={disableNavegation}>
          <Navigation disabled={disableNavegation}>{MenuNavigation.MEMBERS}</Navigation>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { setMembers(false), setData(true) }}
          disabled={disableNavegation}>
          <Navigation disabled={disableNavegation}>{MenuNavigation.VISITORS}</Navigation>
        </TouchableOpacity>
      </Fragment>


    </Fragment>
  );
}
