import React from 'react';
import {
  ListItemProps,
  MultiColumnComboBoxHandle,
  MultiColumnComboBoxProps,
  MultiColumnComboBoxColumn,
} from '@progress/kendo-react-dropdowns';

import CustomDropdown from './CustomDropdown';
import {
  AccountListType,
  EntityListType,
  ExpenseAccount,
  GenericValueObject,
  TermsCodeType,
  USState,
  PayGroupListType,
  DepartmentListType,
  PositionListType,
  ValueStringListType,
  StatesUSListType,
  EntityType,
  KeyNameListType,
  ComboType,
} from '../../types';
import { SINGLE_COLUMNS, PAYCODES_COLUMNS } from './model';
import { _1099_TYPES } from '../../constants';
import {
  ProductCategoryType,
  ProductUnitType,
} from '../Forms/ITEM_Product/types';
import { AccountType } from '../Forms/GL_Account';
import { PayRunYear } from '../../Grids/GL_ProcessPayroll/types';
import { DepartmentType } from '../Forms/ENT_Employee/types';
import {
  TORequestEmployee,
  TORequestPTOCode,
} from '../Forms/GL_PTOManager/TimeOff/Request/types';
import { EmployeePayCode } from '../Forms/GL_ProcessPayroll/types';

export const STATUS_INVOICE_LIST = [
  { title: 'All', value: 'InvoicesAll' },
  { title: 'Unpaid', value: 'InvoicesUnpaid' },
  { title: 'Paid', value: 'InvoicesPaid' },
];

export const STATUS_INVOICE_PAYMENT_LIST = [
  { title: 'All', value: 'InvoicePaymentsAll' },
  { title: 'Uncleared', value: 'InvoicePaymentsUncleared' },
  { title: 'Cleared', value: 'InvoicePaymentsCleared' },
];

export const STATUS_BILL_LIST = [
  { title: 'All', value: 'BillsAll' },
  { title: 'Unpaid', value: 'BillsUnpaid' },
  { title: 'Paid', value: 'BillsPaid' },
];

export const STATUS_BILL_PAYMENT_LIST = [
  { title: 'All', value: 'BillPaymentsAll' },
  { title: 'Uncleared', value: 'BillPaymentsUnpaid' },
  { title: 'Cleared', value: 'BillPaymentsPaid' },
];
export const ptoResponseData = [
  {
    key: '-1',
    name: 'Pending',
  },
  {
    key: '0',
    name: 'Denied',
  },
  {
    key: '1',
    name: 'Approved',
  },
];
export const PAYMENTS_STATUS = [
  {
    value: 'Payments',
    name: 'All',
  },
  {
    value: 'PaymentsUnCleared',
    name: 'Uncleared',
  },
  {
    value: 'PaymentsCleared',
    name: 'Cleared',
  },
];
export const DEPOSITS_STATUS = [
  {
    value: 'Deposits',
    name: 'All',
  },
  {
    value: 'DepositsUnCleared',
    name: 'Uncleared',
  },
  {
    value: 'DepositsCleared',
    name: 'Cleared',
  },
];

export const ADDS_METHOD = [
  {
    key: 'P',
    name: 'Percent',
  },
  {
    key: 'F',
    name: 'Fixed',
  },
];

export const DEDUCTS_METHOD = [
  {
    key: 'P',
    name: 'Percent',
  },
  {
    key: 'F',
    name: 'Fixed',
  },
  {
    key: 'H',
    name: 'Hourly',
  },
];

export const BUSINESS_INDIVIDUAL = [
  { value: 'B', name: 'Business' },
  { value: 'I', name: 'Individual' },
];

export const SALE_FREQUENCY = [
  { value: 'Once' },
  { value: 'Monthly' },
  { value: 'Annually' },
];

type ComboBoxType = CustomComBoxType | ComboType;
type CustomComBoxType =
  | 'CUSTOM_YesNo'
  | 'CUSTOM_SingleColumn'
  | 'CUSTOM_StatusInvoice'
  | 'CUSTOM_StatusInvoicePayment'
  | 'CUSTOM_StatusBill'
  | 'CUSTOM_StatusBillPayment'
  | 'CUSTOM_PaymentsStatus'
  | 'CUSTOM_DepositsStatus'
  | 'PayCodesAddsMethod'
  | 'PayCodesDeductsMethod'
  | 'Vendors3cols'
  | 'CUSTOM_BI'
  | 'SaleFrequency'
  | 'CUSTOM_GenericKeyName';

type HardCodedComboBoxType = Extract<
  ComboBoxType,
  | 'Type1099'
  | 'FilingStatus'
  | 'PayMethod'
  | 'StateUS'
  | 'TransPayMethod'
  | 'HolidayRule'
  | 'CUSTOM_YesNo'
  | 'Status'
  | 'PayFrequency'
  | 'DateRange'
  | 'CUSTOM_StatusInvoice'
  | 'CUSTOM_StatusInvoicePayment'
  | 'CUSTOM_StatusBill'
  | 'CUSTOM_StatusBillPayment'
  | 'CUSTOM_PaymentsStatus'
  | 'CUSTOM_DepositsStatus'
  | 'PayCodesAddsMethod'
  | 'PayCodesDeductsMethod'
  | 'CUSTOM_BI'
  | 'SaleFrequency'
>;
interface CustomColComboBoxProps
  extends Omit<MultiColumnComboBoxProps, 'ref' | 'columns'> {
  width: number;
  /**
   * Whether to allow a blank value in the combobox.
   * If set to true, user clear the value with backspace.
   */
  allowBlank?: boolean;
  /**
   * Pass columns to override default columns in component
   */
  customColumns?: MultiColumnComboBoxColumn[];
  readOnly?: boolean;
}

type ExcludedColComboBoxProps = CustomColComboBoxProps &
  (
    | {
        comboBoxType: Exclude<
          ComboBoxType,
          Exclude<ComboBoxType, HardCodedComboBoxType>
        >;
      }
    | {
        comboBoxType: Exclude<ComboBoxType, HardCodedComboBoxType>;
        dataList:
          | EntityListType[]
          | AccountListType[]
          | TermsCodeType[]
          | GenericValueObject[]
          | string[]
          | ExpenseAccount[]
          | USState[]
          | PayGroupListType[]
          | DepartmentListType[]
          | PositionListType[]
          | ValueStringListType[]
          | StatesUSListType[]
          | KeyNameListType[]
          | ProductCategoryType[]
          | AccountListType[]
          | ProductUnitType[]
          | EntityType[]
          | AccountType[]
          | PayRunYear[]
          | DepartmentType[]
          | TORequestEmployee[]
          | TORequestPTOCode[];
      }
  );

function getCommonLeftAlignedItem(dataList: MultiColumnComboBoxColumn[]) {
  return (li: React.ReactElement<HTMLLIElement>, itemProps: ListItemProps) => {
    const children = dataList.map((col, i) => {
      return (
        <span
          className="k-table-td"
          style={{ width: col.width, textAlign: 'left' }}
          key={(col.field ?? '') + i}
        >
          {itemProps.dataItem[col.field || '']}
        </span>
      );
    });
    return React.cloneElement(li, { ...li.props }, children);
  };
}

const CustomColComboBox = React.forwardRef<
  MultiColumnComboBoxHandle,
  ExcludedColComboBoxProps
>((props, ref) => {
  const { comboBoxType, width, allowBlank, customColumns } = props;

  switch (comboBoxType) {
    // Custom boxes
    case 'PayCodes':
      const payCodesColumn = customColumns?.length
        ? [...customColumns]
        : PAYCODES_COLUMNS(width, (props.dataList as EmployeePayCode[]) || []);

      return (
        <CustomDropdown
          {...props}
          ref={ref}
          data={props.dataList}
          restrictBlank={allowBlank ? false : true}
          textField="PayCode"
          dataItemKey="PayCode"
          columns={payCodesColumn}
          itemRender={getCommonLeftAlignedItem(payCodesColumn)}
          style={{ width }}
        />
      );

    case 'PayCodesTO':
      const payCodesTOColumns = customColumns?.length
        ? [...customColumns]
        : SINGLE_COLUMNS(width, 'PayCode', props.dataList);
      return (
        <CustomDropdown
          {...props}
          ref={ref}
          data={props.dataList}
          restrictBlank={allowBlank ? false : true}
          textField="PayCode"
          dataItemKey="PayCode"
          columns={payCodesTOColumns}
          itemRender={getCommonLeftAlignedItem(payCodesTOColumns)}
          style={{ width }}
        />
      );

    case 'PTOResponse':
      const ptoResponseColumns = customColumns?.length
        ? [...customColumns]
        : SINGLE_COLUMNS(width, 'name', ptoResponseData);
      return (
        <CustomDropdown
          {...props}
          ref={ref}
          data={ptoResponseData}
          restrictBlank={allowBlank ? false : true}
          textField="name"
          dataItemKey="key"
          columns={ptoResponseColumns}
          style={{ width }}
        />
      );

    default:
      return null;
  }
});

export default CustomColComboBox;
