export type PayGroupType = {
  PayGroupCode: string;
  PayGroupDesc?: string;
  PayFrequency?: string | null;
};

export type DepartmentType = {
  DepartmentCode: string;
  DepartmentDesc?: string;
};

export type PositionType = {
  PositionCode: string;
  PositionDesc?: string;
};

export type CustomFieldTemplate = {
  FieldLabel: string;
  FieldName: string;
  FieldType: FieldType;
  FormName: string;
  IDNo: number;
  MaxCharacters: number;
  maxdecimals: number;
  mindecimals: number;
  RequiredYN: boolean;
};

export type CustomFieldData = {
  IDNo: number;
  FieldLabel?: string;
  FieldName: string;
  FieldType: FieldType;
  FormName: string;
  MaxCharacters?: number;
  maxdecimals?: number;
  mindecimals?: number;
  RequiredYN?: boolean;
  FieldData: number | string | boolean | null;
};

export interface Entity {
  IDNo: number;
  EntityName: string;
  EntityType: string;
  Address1: string;
  City: string;
  State: string;
  Zip: string;
  MainPhone: string;
  EmailMain: string;
  PrimaryContact: string;
  LocCode: string;
  JobTitle: string | null;
  Department: string | null;
  MobilePhone: string | null;
  TermsCodeID: number;
  Notes: string;
}

export type FieldType =
  | 'Checkbox'
  | 'Dropdown'
  | 'Date Only'
  | 'Date Time'
  | 'Time Only'
  | 'Number'
  | 'Text'
  | 'Year';

export type InputValue = string | number | boolean | null;
