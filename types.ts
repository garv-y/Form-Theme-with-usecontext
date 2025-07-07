export type FieldType =
  | "header"
  | "label"
  | "paragraph"
  | "linebreak"
  | "dropdown"
  | "tags"
  | "checkboxes"
  | "multipleChoice"
  | "text"
  | "number";

export interface FieldOption {
  text: string;
  value?: string;
}

export interface FieldConfig {
  id: string;
  type: FieldType;
  label?: string; // used as label or text for header/paragraph/label
  required?: boolean;
  displayOnShortForm?: boolean;
  options?: FieldOption[]; // only for applicable types
}
