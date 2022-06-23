export interface IContentModal {
  handleCloseModal: any;
  data?: any;
  onPressIn?: any;
  membersPresent?: IMemberOrVisitor[] | undefined;
  visitorsPresent?: IMemberOrVisitor[] | undefined;
  handleCancelForm?: any;
  titCelulaAdm?: any;
  titRedeAdm?: any;
}

export type IMemberOrVisitor = {
  celula: string;
  culto: string;
  nome: string;
  status: string;
};
