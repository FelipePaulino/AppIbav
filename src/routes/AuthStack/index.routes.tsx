import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignInScreen } from "../../screens/SignIn";
import { PreloadScreen } from "../../screens/PreLoad";

import { INavigationAuthStackProps } from "./types";

export function AuthRouter() {
  const { Navigator, Screen } =
    createNativeStackNavigator<INavigationAuthStackProps>();

  return (
    <Navigator
      initialRouteName="Preload"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="SignIn" component={SignInScreen} />
      <Screen name="Preload" component={PreloadScreen} />
    </Navigator>
  );
}
