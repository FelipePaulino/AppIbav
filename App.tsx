import React from "react";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { Routes } from "./src/routes";
import { FormProvider } from "./src/contexts/FormReport";
import { FilteredProvider } from "./src/contexts/Filtered";

import theme from "./src/styles/theme";
import { AuthenticatedProvider } from "./src/contexts/Auth";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthenticatedProvider>
        <FilteredProvider>
          <FormProvider>
            <Routes />
          </FormProvider>
        </FilteredProvider>
      </AuthenticatedProvider>
      <StatusBar style="light" backgroundColor="#000A3E" translucent />
    </ThemeProvider>
  );
}
