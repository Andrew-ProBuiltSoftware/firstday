export type AccountListType = {
  AccountName?: string;
  AccountType?: string;
  AccountNo: string;
  DisabledYN?: boolean;
  EntityName?: string;
  EntityID?: number | null;
  TypeGroup?: string;
};

export type EntityListType = {
  IDNo: number;
  EntityName: string;
  DefExpAcct?: string | null;
  DefPayAcct?: string;
  AccountNo?: string;
  PmtMethod?: string;
  TermsCodeID?: number | null;
  Address1?: string;
  Address2?: string;
  City?: string;
  ShipAddress1?: string;
  ShipAddress2?: string;
  ShipCity?: string;
  ShipSt?: string;
  ShipZip?: string;
  Department?: string;
  EmailMain?: string;
  JobTitle?: string;
  LocCode?: string;
  MainPhone?: string;
  MobilePhone?: string;
  Notes?: string;
  PrimaryContact?: string;
  State?: string;
  Zip?: string;
  EntityType?: string | null;
};

export type GenericValueObject = { value: string };

export type ExpenseAccount = {
  AccountNo: string;
  AccountName: string;
  AccountType: string;
  DisabledYN: boolean;
  TypeGroup: string;
};

export type USState = { State: string; StateName: string };

export type EntityType = {
  IDNo: number;
  CreditApprovedBy?: number;
  EntityName?: string;
  FirstName?: string;
  LastName?: string;
  MiddleName?: string;
  EntityType?: string;
  InputDT?: string;
  InputUserName?: string;
  EditDT?: string;
  EditUserName?: string;
  FID?: string;
  PrimaryContact?: string;
  EmailMain?: string;
  Address1?: string;
  MainPhone?: string;
  MobilePhone?: string;
  OtherPhone?: string;
  Address2?: string;
  City?: string;
  State?: string;
  Zip?: string;
  Notes?: string;
  TimeOpen?: string;
  TimeClose?: string;
  Website?: string;
  ShipAddress1?: string;
  ShipAddress2?: string;
  ShipCity?: string;
  ShipSt?: string;
  ShipZip?: string;
  TermsCodeID?: number;
  CreditHoldYN?: boolean;
  CreditLimit?: number;
  CreditReportingAgency?: string;
  CreditRating?: string;
  Department?: string;
  Position?: string;
  JobTitle?: string;
  EmergencyPhone?: string;
  EmergencyName?: string;
  DOB?: string;
  HireDate?: string;
  TermDate?: string;
  DefExpAcct?: string;
  DefPayAcct?: string;
  SSN?: string;
  PayFrequency?: string;
  PayMethod?: string;
  PayRate?: number;
  EmploymentType?: string;
  Type1099?: string;
  OTExemptYN?: boolean;
  OTBaseHours?: number;
  DTBaseHours?: number;
  HolidayRule?: string;
  DBAName?: string;
  FedFilingStatus?: string;
  FedAllowances?: number;
  FedAddWH?: number;
  TaxState?: string;
  StateAllowances?: number;
  StateAddWH?: number;
  PayGroup?: string;
  BusinessYN?: boolean;
  W9YN?: boolean;
  AccountNo?: string;
  CompanyLogoID?: null | number | null;
  Files?: ArrayBuffer;
  SalesTaxYN?: boolean;
  SalesTaxBasis?: string;
  PricingWR?: string;
  DiscountStandard?: number;
  DiscountLotLevel1?: number;
  DiscountLotLevel2?: number;
  DiscountLotLevel3?: number;
  DiscountLotLevel4?: number;
  PmtMethod?: string;
  DisabledDT?: string;
  DisabledUser?: string;
  DisabledYN?: boolean;
};

export type ItemListType = {
  ItemCategory: string;
  ItemCode: string;
  ItemDescription?: string;
  ProductService?: string;
  RPLotQty1?: number;
  RPLotQty2?: number;
  RPLotQty3?: number;
  RPLotQty4?: number;
  RPPerUnit1?: number;
  RPPerUnit2?: number;
  RPPerUnit3?: number;
  RPPerUnit4?: number;
  RevenueAccountNo?: string;
  SvcMinQty?: number;
  SvcMinQty2?: number;
  SvcRateEach?: number;
  SvcRateEach2?: number;
  SvcRateMethod?: string;
  TaxableYN: boolean;
  UnitType?: string;
};

export type ItemType = {
  ItemCode: string;
  ItemCategory: string;
  ItemPS: string;
  InventoryYN: boolean;
  TaxableYN: boolean;
  VirtualYN: boolean;
  ItemDescription?: string;
  ItemDescription2?: string;
  ItemDescription3?: string;
  ItemDescription4?: string;
  ItemDescription5?: string;
  ProductSKU?: string;
  ProductUPC?: string;
  InventoryAccountNo?: string | null;
  RevenueAccountNo?: string;
  UnitType?: string;
  WeightMeasure?: string;
  ProductActualWeight?: number;
  ProductShipWeight?: number;
  SizeMeasure?: string;
  ActualLength?: number;
  ActualWidth?: number;
  ActualHeight?: number;
  ActualDepth?: number;
  ShipLength?: number;
  ShipWidth?: number;
  ShipHeight?: number;
  ShipDepth?: number;
  WPLotQty1?: number;
  WPLotQty2?: number;
  WPLotQty3?: number;
  WPLotQty4?: number;
  WPPerUnit1?: number;
  WPPerUnit2?: number;
  WPPerUnit3?: number;
  WPPerUnit4?: number;
  RPLotQty1?: number;
  RPLotQty2?: number;
  RPLotQty3?: number;
  RPLotQty4?: number;
  RPPerUnit1?: number;
  RPPerUnit2?: number;
  RPPerUnit3?: number;
  RPPerUnit4?: number;
  VendorID1?: number;
  V1LotQty1?: number;
  V1LotQty2?: number;
  V1LotQty3?: number;
  V1LotQty4?: number;
  V1CostPerUnit1?: number;
  V1CostPerUnit2?: number;
  V1CostPerUnit3?: number;
  V1CostPerUnit4?: number;
  VendorID2?: number;
  V2LotQty1?: number;
  V2LotQty2?: number;
  V2LotQty3?: number;
  V2LotQty4?: number;
  V2CostPerUnit1?: number;
  V2CostPerUnit2?: number;
  V2CostPerUnit3?: number;
  V2CostPerUnit4?: number;
  VendorID3?: number;
  V3LotQty1?: number;
  V3LotQty2?: number;
  V3LotQty3?: number;
  V3LotQty4?: number;
  V3CostPerUnit1?: number;
  V3CostPerUnit2?: number;
  V3CostPerUnit3?: number;
  V3CostPerUnit4?: number;
  SvcRateMethod?: string;
  SvcRateEach?: number;
  SvcMinQty?: number;
  SvcRateEach2?: number;
  SvcMinQty2?: number;
  InputDT?: string;
  InputUserName?: string;
  EditDT?: string;
  EditUserName?: string;
  DiscontinuedDT?: string | null;
  DiscontinuedUserName?: string | null;
};

export type TermsCodeType = {
  IDNo: number;
  TermsCode: string;
  DiscPct: number;
  DiscDays: number;
  DueDays: number;
};

export type MainRecordType = {
  TransNo?: number;
  TransAccount?: string;
  TransAccountName?: string;
  TransEntityID?: number | null;
  TransEntityName?: string;
  ShipEntityID?: number | null;
  ShipEntityName?: string;
  TransPmtMethod?: string;
  TransPmtAccount?: string;
  TransType?: string;
  TransDate?: string;
  TransDocDate?: string;
  TransDocRef?: string;
  RefInternal1?: string;
  RefExternal1?: string;
  TransLocCode?: string;
  TermsCodeID?: number | null;
  TransDiscElig?: number;
  TransDiscDate?: string;
  TransDueDate?: string;
  TransBalDue?: number | null;
  Notes?: string;
  EditDT?: string;
  EditUserName?: string;
  InputDT?: string;
  InputUserName?: string;
  JournalEntryType?: string;
  TransCheckAmount?: string;
  PmtsSourceAccount?: string;
  PmtsTotalPaid?: string;
  PmtsTotalDisc?: string;
  TransCreditAmount?: number | null;
  TransPmtAmount?: number;
  TransDebitAmount?: number;
  TransDiscAmount?: number;
  TotalPmtsApplied?: number;
  TotalPmtsRemaining?: number;
  TotalDiscApplied?: number;
  TotalDiscRemaining?: number;
  bReadOnly?: boolean;
};

export type StmtCheckItemType = {
  IDNo: number | undefined;
  InputUserName?: string;
  InputDT?: string;
  EditUserName?: string;
  EditDT?: string;
  LocCode?: string;
  TransType?: string;
  TransNo?: number;
  TransEntityID: number | null;
  TransEntityName?: string | null;
  TransPmtMethod?: string | null;
  TransDate?: string | null;
  TransDocDate?: string | null;
  TransDocRef?: string | null;
  TransAccount: string | null;
  JournalEntryType?: string;
  TransAccountName?: string;
  TransDueDate?: string;
  TransDiscDate?: string;
  TransDiscElig?: string;
  TermsCodeID?: string;
  RefInternal1?: string;
  Notes?: string;
  TransDebitAmount?: number | null;
  TransCreditAmount?: number | null;
  IsNew?: boolean;
  IsUpdated?: boolean;
  SelectedId?: number | null;
};

export type StmtMainRecordType = {
  IDNo?: number | null;
  InputUserName?: string;
  InputDT?: string;
  EditUserName?: string;
  EditDT?: string;
  RecNo?: number;
  AccountNo?: string;
  StartDate?: string;
  EndDate?: string;
  StartingBalance?: number;
  EndingBalance?: number;
  DebitsClearedQty?: number;
  DebitsClearedAmt?: number;
  CreditsClearedQty?: number;
  CreditsClearedAmt?: number;
  OutOfBalAmt?: number;
  FinishedYN?: boolean;
};

export type StmtCheckDataType = {
  checkList?: StmtCheckItemType[];
  recNo?: number;
  bankAcct?: string;
  paymentStartDate?: Date;
  paymentEndDate?: Date;
  startingBal?: number;
  endingBal?: number;
  depositsClearedQty?: number;
  depositsClearedAmt?: number;
  paymentsClearedQty?: number;
  paymentsClearedAmt?: number;
  outOfBalAmt?: number;
  finishedYN?: boolean;
  inputAt?: string;
  inputBy?: string;
  editedAt?: string;
  editedBy?: string;
};

export type StmtChangesType = {
  checkList: StmtCheckItemType[];
  mainRecord?: StmtMainRecordType;
};

export type CheckItemType = {
  IDNo: number | undefined;
  TransEntityID: number | null;
  TransAccount: string | null;
  TransDebitAmount: number | null;
  Notes: string;
  TransType: string;
  TransDate?: string | null;
  IsNew?: boolean;
  IsUpdated?: boolean;
};

export type SelectionType = { field?: string; dataItem: any };

export type GridItemType = Record<string, any>;

export type FormChangesType = {
  gridItems: GridItemType[];
  mainRecord?: MainRecordType;
  changed: boolean;
};

export type IFieldProperties = {
  [key: string]: {
    dataType: string;
    maxLength: number;
    decimalPlaces: number;
    required: boolean;
  };
};

export type PricingCombosType = {
  SalesTaxBasis: { key: string; name: string }[];
  PricingWR: { key: string; name: string }[];
};

export type WindowFormType =
  | 'ENT_Customer'
  | 'ENT_Employee'
  | 'ENT_Vendor'
  | 'GL_Bill'
  | 'GL_BillPayment'
  | 'GL_Deposit'
  | 'GL_CreditPayment'
  | 'GL_Payment'
  | 'GL_CreditCharge'
  | 'GL_JournalEntry'
  | 'GL_Invoice'
  | 'GL_InvoicePayment'
  | 'GL_BulkInvoicePayment'
  | 'GL_BulkBillPayment'
  | 'GL_PayRuns'
  | 'GL_CashRec'
  | 'GL_CreditRec'
  | 'GL_NoteReceivable'
  | 'GL_NotePayable'
  | 'ITEM_Product'
  | 'ITEM_Service'
  | 'ITEM_AllItems'
  | 'GL_PTOManager_TimeOffRequest'
  | 'GL_PTOManager_TimeOffTaken'
  | 'GL_Leads';

export type CompanyDefaultsType = {
  Company_ID: number;
  CompanyName: string;
  CompAddress1: string;
  CompAddress2: string;
  CompCity: string;
  CompSt: string;
  CompPhone1: string;
  CompZip: string;
};

export type AccountDefaultsType = {
  DefAPAcct: string;
  DefAPDiscAcct: string;
  DefAPTerms: string;
  DefAPWOAcct: string;
  DefARAcct: string;
  DefARDiscAcct: string;
  DefARTerms: string;
  DefARWOAcct: string;
  DefBankAcct: string;
  DefCreditCardAcct: string;
  DefUnappliedCreditAcct: string;
  DefUnclassified: string;
  DefUndepFundsAcct: string;
  FiscalYrStartDate: string;
};

export type PayGroupListType = {
  PayGroupCode: string;
  PayGroupDesc?: string;
  PayFrequency?: string | null;
};

export type DepartmentListType = {
  DepartmentCode: string;
  DepartmentDesc?: string;
};

export type PositionListType = {
  PositionCode: string;
  PositionDesc?: string;
};

export type ValueStringListType = {
  value: string;
};

export type StatesUSListType = {
  State: string;
  StateName: string;
};

export type KeyNameListType = {
  key: string;
  name: string;
};

export type ComboType =
  | 'Status'
  | 'Disabled'
  | 'StatesUS'
  | 'DateRange'
  | 'SalesTaxBasis'
  | 'PricingWR'
  | 'TransPayMethod'
  | 'JournalType'
  | 'CPS'
  | 'FilingStatus'
  | 'PayMethod'
  | 'PayFrequency'
  | 'Type1099'
  | 'EmploymentType'
  | 'HolidayRule'
  | 'PTOResponse'
  | 'ShiftInterval'
  | 'DayOfWeek'
  | 'ShiftWeekEO'
  | 'BreakDuration'
  | 'LunchDuration'
  | 'OrdinalDayOfEveryMonth'
  | 'PayCodeAddMethod'
  | 'PayCodeDedMethod'
  | 'PayCodeTaxable'
  | 'PayCodeDeductibility'
  | 'PersonnelAddsDeducts'
  | 'PersonnelGroups'
  | 'PersonnelByGroup'
  | 'PersonnelByDepartment'
  | 'AllEntities'
  | 'Customers'
  | 'Vendors'
  | 'CustomersWithTerms'
  | 'VendorsWithTerms'
  | 'CustomersVendors'
  | 'Employees'
  | 'Salesmen'
  | 'ReportCustomers'
  | 'ReportVendors'
  | 'AllAccounts'
  | 'AllAccountsNoARAP'
  | 'ARAccounts'
  | 'APAccounts'
  | 'BankAccounts'
  | 'DepositAccounts'
  | 'BankCCAccounts'
  | 'CreditCardAccounts'
  | 'IncomeAccounts'
  | 'ExpenseAccounts'
  | 'VendorExpenseAccounts'
  | 'IncomeExpenseAccounts'
  | 'InventoryAccounts'
  | 'AssetsNotFixedAccounts'
  | 'ExpensesNoCoGSAccounts'
  | 'ExpensesWithLiabilities'
  | 'ExpensesWithLiabilitiesAndAssets'
  | 'AssetRegisters'
  | 'LiabilityRegisters'
  | 'EquityRegisters'
  | 'IncomeTransactions'
  | 'ExpenseTransactions'
  | 'PayGroups'
  | 'PayDepartments'
  | 'PayDepartmentsALL'
  | 'PayPositions'
  | 'PayCodes'
  | 'PayCodesTO'
  | 'PayCodesHolidays'
  | 'PayCodesAdds'
  | 'PayCodesDeducts'
  | 'PayRunYears'
  | 'PayRuns'
  | 'PTOCodes'
  | 'ProductCategories'
  | 'ServiceCategories'
  | 'ProductUnits'
  | 'ProductWeightUnits'
  | 'ProductSizeUnits'
  | 'ServiceUnits'
  | 'ItemCodes'
  | 'TermsCodes'
  | 'CustomFieldTypes'
  | 'GLAccountTypesAll'
  | 'Leads';
