export interface IPersonProps {
  nome: string;
  status?: string;
  delMember: () => void;
  onPress: () => void;
}
