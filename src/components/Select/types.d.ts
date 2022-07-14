export interface IContentProps {
  label?: string;
  onChange: (option: string) => void;
  selectedOption: (option: string) => void;
  labelSelect: string;
  dataOptions: Array<IOptions> | string;
  disabled?: boolean;
  small?: boolean;
  width?: string;
  allOptions?: any;
}

export interface IStyledDisabled {
  disabled?: boolean;
}

export interface ISizeProps {
  small?: boolean;
  width?: string;
}

interface IOptions {
  value: string
}
