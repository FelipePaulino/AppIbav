import { FormReportActions } from "../../contexts";

export interface IState {
  offer: string;
  date: any;
  textDate: string;
  dateRegister: any;
  stateSelect: string;
  nameVisitor: string;
  celulaSelect: string;
  textRegister: string;
  observations: string;
  phoneVisitor: string;
  categorySelect: string;
  textSelectState: string;
  textSelectCelula: string;
  civilStatusSelect: string;
  textSelectCategory: string;
  members: IContentMembers[];
  visitors: IContentMembers[];
  textSelectCivilStatus: string;
  redeSelect: string;
  discipuladoSelect: string;
  nomeLider: string
}

interface IContentMembers {
  nome: string;
  status: string;
  culto?: string;
  celula?: string;
}
export interface IActions {
  type: FormReportActions;
  payload: any;
}

export interface IContextType {
  state: IState;
  dispatch: (action: IActions) => void;
  trigger: boolean,
  setTrigger: (action: boolean) => void;
}

export interface IProvider {
  children: any;
}
