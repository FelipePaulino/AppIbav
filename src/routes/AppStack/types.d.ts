import { NativeStackScreenProps } from "@react-navigation/native";

export type INavigationAppStackProps = {
  Home: undefined;
  Details: undefined;
  Network: undefined;
  Members: undefined;
  Register: undefined;
  SendReport: undefined;
  UserRegister: undefined;
  PreListAdmin: undefined;
  MembersReport: undefined;
  VisitorsReport: undefined;
  Multiplication: undefined;
  WaitingApprove: undefined;
  PreRegisterAdmin: undefined;
  MemberInformation: undefined;
};

export type IPropsAppStack = NativeStackScreenProps<INavigationAppStackProps>;
