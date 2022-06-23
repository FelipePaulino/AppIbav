import { ReactNode } from "react";
import { User } from "firebase/auth";

export interface IAuthContextData {
  signIn: (email: string, password: string) => Promise<void>;
  isLogged: boolean;
  signOut: () => Promise<void>;
  user: User | null;
}

export interface IAuthProviderProps {
  children: ReactNode;
}
