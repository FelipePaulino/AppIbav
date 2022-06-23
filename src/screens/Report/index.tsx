import React, { useEffect, useState, Fragment } from "react";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { NavigationComponent } from "../../components/Navigation";


import * as S from "./styles";

export function ReportScreen() {


  return (
    <Fragment>
      <HeaderComponent>
        <ComeBackComponent />
        <NavigationComponent data />
      </HeaderComponent>

    </Fragment>
  );
}
