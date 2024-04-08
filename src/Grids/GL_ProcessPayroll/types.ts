export type PayRunsListType = {
  IDNo: string | number;
  PayRunID: number;
  PayRunDate: Date;
  PayDate: Date;
  PeriodStart: Date;
  PeriodEnd: Date;
  PayGroupCode: number;
  QuantityPaid: number;
  GrossPay: number;
  NetPay: number;
  EmployerPaid: number;
  CompletedYN: boolean;
};

export interface MainRecord {
  IDNo: number;
  InputUserName: string;
  InputDT: string;
  EditUserName: string | null;
  EditDT: string | null;
  PayRunID: number;
  PayGroupCode: string;
  PayFrequency: string | null;
  PayRunDate: string | null;
  PeriodStart: string | null;
  PeriodEnd: string | null;
  PayDate: string | null;
  QuantityPaid: number | null;
  GrossPay: number | null;
  NetPay: number | null;
  EmployerPaid: number | null;
  CompletedYN: boolean | null;
}

export interface SubRecords {
  EntityType: string;
  Department: string;
  JobTitle: string;
  IDNo: number;
  InputUserName: string;
  InputDT: string;
  EditUserName: string | null;
  EditDT: string | null;
  PayRunID: string;
  PayFrequency: string | null;
  PayGroupCode: string;
  PeriodStart: string | null;
  PeriodEnd: string | null;
  PayDate: string | null;
  EmployeeID: number;
  EntityName: string;
  LastName: string;
  FirstName: string;
  MiddleName: string;
  PayMethod: string | null;
  PayRate: number | null;
  PayUnits: number | null;
  OTExemptYN: boolean;
  OTBaseHours: number | null;
  DTBaseHours: number | null;
  TotalBase: number | null;
  TotalAdds: number | null;
  TotalDeducts: number | null;
  TotalTaxes: number;
  NetPay: number;
  HolidayRule: string | null;
  EmploymentType: string | null;
  FedFilingStatus: string | null;
  FedAllowances: number | null;
  FedAddWH: number | null;
  FIT: number;
  FICA_SS_EMP: number;
  FICA_MED_EMP: number;
  FICA_SS_ER: number;
  FICA_MED_ER: number;
  SIT: number;
  TaxState: string | null;
  StateAllowances: number | null;
  StateAddWH: number | null;
  DDProvider: string | null;
  DDAccountID: string | null;
  CompletedYN: boolean | null;
  TotalWS: number | null;
  selected?: boolean;
}

export interface ComboRecord {
  PayRunYears: PayRunYear[];
  PayRuns: PayRunData[];
}

export interface PayRunYear {
  Year: number | string;
}

export interface PayRunData {
  IDNo: number;
  PayRunID: string;
  PayGroupCode: string;
  PayFrequency: string | null;
  PayRunDate: string | null | undefined;
  PeriodStart: string | null | undefined;
  PeriodEnd: string | null | undefined;
  PayDate: string | null | undefined;
  QuantityPaid: number | null;
  GrossPay: number | null;
  NetPay: number | null;
  EmployerPaid: number | null;
  CompletedYN: boolean | null;
}

export interface PayRunsResponse {
  mainRecord: MainRecord;
  subRecords: SubRecords[];
  combos: ComboRecord;
  chartByPayCode: PayCodeChartTypes[];
}

export interface WorkSheet {
  IDNo: number;
  EmployeeID: number;
  PayRunID: number;
  PayCode: string;
  AccountNo: string;
  PayAD: string;
  PayMethod: null | string;
  PayRate: null | number;
  PayTaxableYN: boolean;
  DeductMethod: string;
  DeductTaxHandling: number;
  DeductRate: number;
  DeductFromGrossOrNet: null | string;
  DeductEntityID: number;
  DeductEntityName: string;
  Total?: number | null;
  Rate: number;
  Qty: number;
}

export interface DropdownMenuTypes {
  text: string;
  icon?: string;
}

export interface PayCodeChartTypes {
  PayCode: string;
  PayDesc: string;
  Rate: number;
}
