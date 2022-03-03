
export interface SelectOption {
  label: string;
  value?: string;
  group?: SelectOption[];
  disabled?: boolean;
  _order: number;
  classes?: any;
  [key: string]: any;
}
