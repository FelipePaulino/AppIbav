import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./AppStack/index.routes";
import { AuthRouter } from "./AuthStack/index.routes";

import { useAuth } from "../hooks/useAuth";

export const Routes = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRouter />}
    </NavigationContainer>
  );
};
