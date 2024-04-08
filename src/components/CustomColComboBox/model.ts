import { MultiColumnComboBoxColumn } from '@progress/kendo-react-dropdowns';
import {
  AccountListType,
  DepartmentListType,
  EntityListType,
  ExpenseAccount,
  PayGroupListType,
  PositionListType,
} from '../../types';
import { EmployeePayCode } from '../Forms/GL_ProcessPayroll/types';

export const ENTITY_COLUMNS = (
  name_width: number,
  dataList: EntityListType[]
): MultiColumnComboBoxColumn[] => {
  const columns = [
    {
      field: 'EntityName',
      width: name_width,
    },
    {
      field: 'City',
      width: 200,
    },
    {
      field: 'State',
      width: 60,
    },
  ];

  if (dataList.filter((item) => item.EntityType)?.length) {
    columns.push({
      field: 'EntityType',
      width: 30,
    });
  }

  return columns;
};

export const ACCOUNT_COLUMNS = (
  name_width: number,
  dataList: AccountListType[]
): MultiColumnComboBoxColumn[] => [
  {
    field: 'AccountNo',
    width: name_width,
  },
  {
    field: 'AccountName',
    width: dataList.length > 10 ? 225 : 210,
  },
  {
    field: 'AccountType',
    width: 130,
  },
];

export const EMPLOYEE_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  {
    field: 'EntityName',
    width: name_width,
  },
];

export const PAYGROUPS_COLUMNS = (
  name_width: number,
  dataList: PayGroupListType[]
): MultiColumnComboBoxColumn[] => [
  {
    field: 'PayGroupCode',
    width: name_width,
  },
  {
    field: 'PayGroupDesc',
    width: dataList.length > 10 ? 225 : 210,
  },
];

export const PAYCODES_COLUMNS = (
  name_width: number,
  dataList: EmployeePayCode[]
): MultiColumnComboBoxColumn[] => [
  {
    field: 'PayCode',
    width: name_width,
  },
  {
    field: 'PayDesc',
    width: dataList.length > 10 ? 225 : 210,
  },
];

export const DEPARTMENT_COLUMNS = (
  name_width: number,
  dataList: DepartmentListType[]
): MultiColumnComboBoxColumn[] => [
  {
    field: 'DepartmentCode',
    width: name_width,
  },
  {
    field: 'DepartmentDesc',
    width: dataList.length > 10 ? 225 : 210,
  },
];

export const POSITION_COLUMNS = (
  name_width: number,
  dataList: PositionListType[]
): MultiColumnComboBoxColumn[] => [
  {
    field: 'PositionCode',
    width: name_width,
  },
  {
    field: 'PositionDesc',
    width: dataList.length > 10 ? 225 : 210,
  },
];

export const EXPENSEACCT_COLUMNS = (
  name_width: number,
  dataList: AccountListType[]
): MultiColumnComboBoxColumn[] => [
  {
    field: 'AccountNo',
    width: name_width,
  },
  {
    field: 'AccountName',
    width: dataList.length > 10 ? 225 : 210,
  },
  {
    field: 'AccountType',
    width: dataList.length > 10 ? 225 : 210,
  },
];

export const BANKACCT_COLUMNS = (
  name_width: number,
  dataList: AccountListType[]
): MultiColumnComboBoxColumn[] => [
  {
    field: 'AccountNo',
    width: name_width,
  },
  {
    field: 'AccountName',
    width: dataList.length > 10 ? 225 : 210,
  },
];

export const CC_ACCOUNTS_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  {
    field: 'AccountNo',
    width: name_width,
  },
  {
    field: 'AccountName',
    width: 225,
  },
];

export const PAYMETHOD_COLUMNS = (): MultiColumnComboBoxColumn[] => [
  {
    field: 'value',
    width: 100,
  },
];

export const SINGLE_COLUMNS = (
  name_width: number,
  field: string,
  dataList: any[]
): MultiColumnComboBoxColumn[] => [
  {
    field: field,
    width: dataList.length > 10 ? name_width - 15 : name_width,
  },
];

export const VENDOR_EXPENSE_ACCOUNTS_COLUMNS = (
  name_width: number,
  dataList: ExpenseAccount[]
): MultiColumnComboBoxColumn[] => [
  {
    field: 'AccountNo',
    width: name_width,
  },
  {
    field: 'AccountName',
    width: dataList.length > 10 ? 225 : 210,
  },
  {
    field: 'AccountType',
    width: dataList.length > 10 ? 168 : 155,
  },
];

export const ALL_ACCOUNTS_NO_ARAP_COLUMNS = (
  name_width: number,
  dataList: ExpenseAccount[]
): MultiColumnComboBoxColumn[] => [
  {
    field: 'AccountNo',
    width: name_width,
  },
  {
    field: 'AccountName',
    width: dataList.length > 10 ? 225 : 210,
  },
  {
    field: 'AccountType',
    width: dataList.length > 10 ? 168 : 155,
  },
];

export const INCOME_EXPENSE_ACCOUNTS_COLUMNS = (
  name_width: number,
  dataList: ExpenseAccount[]
): MultiColumnComboBoxColumn[] => [
  {
    field: 'AccountNo',
    width: name_width,
  },
  {
    field: 'AccountName',
    width: dataList.length > 10 ? 225 : 210,
  },
  {
    field: 'AccountType',
    width: dataList.length > 10 ? 168 : 155,
  },
];

export const BANK_CC_ACCOUNTS_COLUMNS = (
  name_width: number,
  dataList: ExpenseAccount[]
): MultiColumnComboBoxColumn[] => [
  {
    field: 'AccountNo',
    width: name_width,
  },
  {
    field: 'AccountName',
    width: dataList.length > 10 ? 225 : 210,
  },
  {
    field: 'AccountType',
    width: dataList.length > 10 ? 168 : 155,
  },
];

export const US_STATE_COLUMNS = (name_width: number) => [
  {
    field: 'State',
    width: name_width,
  },
  {
    field: 'StateName',
    width: 130,
  },
];

export const FILING_STATUS_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  {
    field: 'Status',
    width: name_width,
  },
  {
    field: 'StatusName',
    width: 180,
  },
];

export const INVENTORY_ACCOUNTS_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  {
    field: 'AccountNo',
    width: name_width,
  },
  {
    field: 'AccountName',
    width: 225,
  },
  {
    field: 'AccountType',
    width: 168,
  },
];

export const INCOME_ACCOUNTS_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  {
    field: 'AccountNo',
    width: name_width,
  },
  {
    field: 'AccountName',
    width: 225,
  },
  {
    field: 'AccountType',
    width: 168,
  },
];

export const PRODUCT_UNITS_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  {
    field: 'UnitCode',
    width: name_width,
  },
  {
    field: 'UnitDescription',
    width: 173,
  },
];

export const PRODUCT_WEIGHT_UNITS_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  {
    field: 'UnitCode',
    width: name_width,
  },
  {
    field: 'UnitDescription',
    width: 173,
  },
];

export const PRODUCT_SIZE_UNITS_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  {
    field: 'UnitCode',
    width: name_width,
  },
  {
    field: 'UnitDescription',
    width: 173,
  },
];

export const PAY_FREQUENCY_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  {
    field: 'value',
    width: name_width,
  },
  {
    field: 'label',
    width: 173,
  },
];
export const PRICINGWR_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  {
    field: 'name',
    width: name_width,
  },
];

export const SALES_TAX_BASIS_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  {
    field: 'name',
    width: name_width,
  },
];

export const PAY_DEPARTMENTS_ALL_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  { field: 'DepartmentDesc', width: name_width },
  { field: 'DepartmentCode', width: 50 },
];

export const PAY_RUNS_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  {
    field: 'PayRunID',
    width: name_width,
    header: 'ID',
  },
  {
    field: 'PayGroupCode',
    width: 80,
    header: 'Group',
  },
  {
    field: 'PayRunDate',
    width: 120,
    header: 'Pay Run Date',
  },
  {
    field: 'PayDate',
    width: 120,
    header: 'Pay Date',
  },
  {
    field: 'PeriodStart',
    width: 120,
    header: 'Period Start',
  },
  {
    field: 'PeriodEnd',
    header: 'Period End',
    width: 120,
  },
];

export const REGISTER_ACCOUNT_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  {
    field: 'AccountNo',
    width: name_width,
  },
  { field: 'AccountName', width: 182 },
  { field: 'AccountType', width: 120 },
];

export const AR_ACCOUNT_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  { field: 'AccountNo', width: name_width },
  {
    field: 'AccountName',
    width: 170,
  },
  { field: 'AccountType', width: 140 },
];

export const AP_ACCOUNT_COLUMNS = (
  name_width: number
): MultiColumnComboBoxColumn[] => [
  { field: 'AccountNo', width: name_width },
  {
    field: 'AccountName',
    width: 170,
  },
  { field: 'AccountType', width: 140 },
];

export const DEPOSITS_ACCOUNT_COLUMNS = (): MultiColumnComboBoxColumn[] => [
  { field: 'AccountNo', width: 109 },
  {
    field: 'AccountName',
    width: 140,
  },
  {
    field: 'AccountType',
    width: 100,
  },
];
