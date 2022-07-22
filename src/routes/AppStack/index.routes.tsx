import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../../screens/Home";
import { DetailsScreen } from "../../screens/Details";
import { MembersScreen } from "../../screens/Members";
import { RegisterScreen } from "../../screens/Register";
import { ListUsersScreen } from "../../screens/ListUsers";
import { SendReportScreen } from "../../screens/SendReport";
import { Multiplication } from "../../screens/Multiplication";
import { MultiplicationCelula } from "../../screens/MutiplicationCelula";
import { MultiplicationDiscipulado } from "../../screens/MutiplicationDiscipulado";
import { MultiplicationRede } from "../../screens/MutiplicationRede";
import { UserRegisterScreen } from "../../screens/UserRegister";
import { PreListAdminScreen } from "../../screens/PreListAdmin";
import { MembersReportScreen } from "../../screens/MembersReport";
import { WaitingApproveScreen } from "../../screens/WaitingApprove";
import { VisitorsReportScreen } from "../../screens/VisitorsReport";
import { UsersInformationScreen } from "../../screens/ListInformation";
import { PreRegisterAdminScreen } from "../../screens/PreRegisterAdmin";
import { MembersInformationScreen } from "../../screens/MemberInformation";

import { INavigationAppStackProps } from "./types";
import NetworkScreenList from "../../screens/Network";

export function AppRoutes() {
  const { Navigator, Screen } =
    createNativeStackNavigator<INavigationAppStackProps>();

  return (
    <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Details" component={DetailsScreen} />
      <Screen name="Members" component={MembersScreen} />
      <Screen name="Register" component={RegisterScreen} />
      <Screen name="Network" component={NetworkScreenList} />
      <Screen name="ListUsers" component={ListUsersScreen} />
      <Screen name="SendReport" component={SendReportScreen} />
      <Screen name="Multiplication" component={Multiplication} />
      <Screen name="MultiplicationCelula" component={MultiplicationCelula} />
      <Screen name="MultiplicationDiscipulado" component={MultiplicationDiscipulado} />
      <Screen name="MultiplicationRede" component={MultiplicationRede} />
      <Screen name="PreListAdmin" component={PreListAdminScreen} />
      <Screen name="UserRegister" component={UserRegisterScreen} />
      <Screen name="MembersReport" component={MembersReportScreen} />
      <Screen name="WaitingApprove" component={WaitingApproveScreen} />
      <Screen name="VisitorsReport" component={VisitorsReportScreen} />
      <Screen name="PreRegisterAdmin" component={PreRegisterAdminScreen} />
      <Screen name="UsersInformation" component={UsersInformationScreen} />
      <Screen name="MemberInformation" component={MembersInformationScreen} />
    </Navigator>
  );
}
