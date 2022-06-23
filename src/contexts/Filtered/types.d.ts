import { ReactNode } from "react";

export interface IContextProps {
  loading: boolean;
  user: Array;
}

export interface IProviderProps {
  children: ReactNode;
}
