import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../../screens/Home";
import { DetailsScreen } from "../../screens/Details";
import { MembersScreen } from "../../screens/Members";
import { RegisterScreen } from "../../screens/Register";
import { SendReportScreen } from "../../screens/SendReport";
import { Multiplication } from "../../screens/Multiplication";
import { UserRegisterScreen } from "../../screens/UserRegister";
import { PreListAdminScreen } from "../../screens/PreListAdmin";
import { MembersReportScreen } from "../../screens/MembersReport";
import { WaitingApproveScreen } from "../../screens/WaitingApprove";
import { VisitorsReportScreen } from "../../screens/VisitorsReport";
import { PreRegisterAdminScreen } from "../../screens/PreRegisterAdmin";
import { MembersInformation } from "../../screens/MemberInformation";

import { INavigationAppStackProps } from "./types";

export function AppRoutes() {
  const { Navigator, Screen } =
    createNativeStackNavigator<INavigationAppStackProps>();

  return (
    <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Details" component={DetailsScreen} />
      <Screen name="Members" component={MembersScreen} />
      <Screen name="Register" component={RegisterScreen} />
      <Screen name="SendReport" component={SendReportScreen} />
      <Screen name="Multiplication" component={Multiplication} />
      <Screen name="PreListAdmin" component={PreListAdminScreen} />
      <Screen name="UserRegister" component={UserRegisterScreen} />
      <Screen name="MembersReport" component={MembersReportScreen} />
      <Screen name="WaitingApprove" component={WaitingApproveScreen} />
      <Screen name="VisitorsReport" component={VisitorsReportScreen} />
      <Screen name="PreRegisterAdmin" component={PreRegisterAdminScreen} />
      <Screen name="MemberInformation" component={MembersInformation} />
    </Navigator>
  );
}
