export interface IDataPros {
  data: {
    dados: {
      bairro?: string;
      cep?: string;
      cidade?: string;
      email?: string;
      endereco?: string;
      estado?: string;
      telefone?: number;
    };
    celula?: string;
    culto?: string;
    nome: string;
    status: string;
  };
  setSelectPerson?: any;
}
