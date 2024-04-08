export interface PayRunSubRecords {
  IDNo: number;
  EntityType?: string;
  EntityName?: string;
  LastName?: string;
  FirstName?: string;
  MiddleName?: string;
  Department?: string | null;
  JobTitle?: string | null;
  selected?: boolean;
  Rate?: number;
  Hours?: number;
  Base?: number;
  NetPay?: number;
}

export interface PayRunMainRecord {
  IDNo?: number;
  PayRunID?: number;
  PayGroupCode?: string;
  PayFrequency?: string;
  PayRunDate?: string;
  PeriodStart?: string;
  PeriodEnd?: string;
  PayDate?: string;
  QuantityPaid?: number;
  GrossPay?: number;
  NetPay?: number;
  EmployerPaid?: number;
  CompletedYN?: boolean;
  PersInSelGroup?: number;
  PersAddedToPayRun?: number;
  NextPayDT?: string;
  NextPayStartDT?: string;
  NextPayEndDT?: string;
  LastPayDT?: string;
  LastPayStartDT?: string;
  LastPayEndDT?: string;
  PersOnLastPayRun?: number;
  InputUserName?: string;
  InputDT?: string;
  EditUserName?: string | null;
  EditDT?: string | null;
  NewPayDate?: string;
  NewPeriodStart?: string;
  NewPeriodEnd?: string;
}

export interface PayGroupType {
  PayGroupCode: string;
  PayGroupDesc?: string;
}

export interface NewPayrollInfo {
  PayFrequency: string | null;
  LastPayRunDate: string;
  LastPeriodStart: string;
  LastPeriodEnd: string;
  LastPayDate: string;
  NewPeriodStart: string;
  NewPeriodEnd: string;
  NewPayDate: string;
  PayRunDate: string | null;
  PersonnelPaid: number | null;
  PayInterval: string | null;
}

export interface EmployeePayCode {
  IDNo: number;
  EmployeeID: number;
  PayCode: string;
  PayDesc: string;
  AccountNo: string;
  PayAD: string;
  PayMethod: string | null;
  PayRate: number | null;
  PayTaxableYN: boolean;
  DeductMethod: string;
  DeductTaxHandling: number;
  DeductRate: number;
  DeductFromGrossOrNet: string | null;
  DeductEntityID: number;
  DeductEntityName: string;
}

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

export interface AccountLiabilities {
  AccountNo: string;
  AccountName: string;
  AccountType: string;
  DisabledYN: boolean;
  TypeGroup: string;
}

export interface PayCodeMethod {
  key: string;
  name: string;
}

export interface PayCodeDeductibility {
  key: string;
  name: string;
}

export interface DeductAddTypeRecord {
  IDNo: number;
  PayCode: string;
  PayAD: string;
  PayDesc: string | null;
  AccountNo: string;
  DeductMethod: string | null;
  DeductRate: number | null;
  DeductTaxHandling: string;
  DeductEntityID: number | null;
  DeductEntityName: string | null;
  PayRate: number | null;
  PayMethod: string | null;
  PayTaxableYN?: boolean;
}

export interface EmployeeModalItems {
  IDNo: number;
  EntityName: string;
  PayUnits: number | null;
}
