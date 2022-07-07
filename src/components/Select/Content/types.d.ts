export interface IContentSelect {
  changeModalVisibility: (state: boolean) => void;
  onChange: (option: string) => void;
  selectedOption: (option: string) => void;
  dataOptions: Array<IOptions>;
  alloption?: any;
}

interface IOptions {
  value: string
}
