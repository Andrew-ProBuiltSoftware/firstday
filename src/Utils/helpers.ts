import type {
  FormChangesType,
  IFieldProperties,
  WindowFormType,
} from '../types';
import moment from 'moment';

export function isChanges(changes: FormChangesType) {
  return changes.gridItems.length > 1 || changes.changed;
}

export function number2String(num: number) {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function isExistingListing(type: string, listings: string[][]) {
  for (let i = 0; i < listings.length; i++) {
    if (listings[i].includes(type)) return i;
  }
  return -1;
}

export const formatDate = (date: Date | string | undefined): string | null => {
  if (!date) {
    return null;
  }

  const formattedDate = moment(date).format('M/D/YYYY');

  return formattedDate;
};

export const formatClientDateTime = (date?: Date | string): string | null => {
  if (!date) {
    return null;
  }
  // converts date into MSSQL format string
  const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss.SSS');

  return formattedDate;
};

export const detectSpecialCharacters = (text: string) => {
  const regex = /^[a-zA-Z0-9]*$/; // Regex to match only alphanumeric characters
  if (regex.test(text?.toString() || '')) {
    return false;
  } else {
    console.error('Invalid input: Special characters not allowed.');
    return true;
  }
};

export const detectSpecialAndAlphaCharacters = (text: string) => {
  const regex = /^[0-9]*$/; // Regex to match only numeric characters
  if (regex.test(text?.toString() || '')) {
    return false;
  } else {
    console.error('Invalid input: Only numeric values allowed.');
    return true;
  }
};

export const convertFieldPropertiesArrIntoObject = (
  fieldPropertiesArr: any[]
): IFieldProperties => {
  const fieldPropertiesObj: IFieldProperties = {};

  if (fieldPropertiesArr?.length) {
    fieldPropertiesArr.forEach((item) => {
      const { columnName, dataType, maxLength, decimalPlaces, required } = item;
      fieldPropertiesObj[columnName] = {
        dataType,
        maxLength,
        decimalPlaces,
        required,
      };
    });
  }

  return fieldPropertiesObj;
};

export const openFormByTransType = (
  dataItem: any,
  onOpenForm: (
    id: string | number,
    parentGrid: string,
    type: WindowFormType,
    title?: string | undefined
  ) => void,
  isCredit?: boolean
) => {
  const { TransType, TransEntityName, TransNo, TransAccount } = dataItem;

  switch (TransType) {
    case 'B0':
    case 'B1':
      onOpenForm(TransNo, 'GL_RegistersEquity', 'GL_Bill');
      return;
    case 'AP0':
    case 'APP':
    case 'APD':
      onOpenForm(TransNo, 'GL_RegistersCash', 'GL_BillPayment');
      return;
    case 'AR0':
    case 'ARD':
    case 'ARP':
      onOpenForm(TransNo, 'GL_RegistersCash', 'GL_InvoicePayment');
      return;
    case 'P0':
    case 'P1':
      if (isCredit) {
        onOpenForm(
          TransNo,
          'GL_RegistersCash',
          'GL_CreditCharge',
          `Credit Card Charge - ${TransEntityName}`
        );
      } else {
        onOpenForm(
          TransNo,
          'GL_RegistersCash',
          'GL_Payment',
          `Bank Account Payment - ${TransEntityName}`
        );
      }
      return;
    case 'D0':
    case 'D1':
      if (isCredit) {
        onOpenForm(
          TransNo,
          'GL_RegistersCredit',
          'GL_CreditPayment',
          `Credit Card Payment - ${TransAccount}`
        );
      } else {
        onOpenForm(
          TransNo,
          'GL_RegistersCash',
          'GL_Deposit',
          `Bank Account Deposit - ${TransAccount}`
        );
      }
      return;
    case 'J0':
    case 'J1':
      onOpenForm(
        TransNo,
        'GL_RegistersCash',
        'GL_JournalEntry',
        'Journal Entry'
      );
      return;
    case 'I0':
    case 'I1':
      onOpenForm(TransNo, 'GL_RegistersCash', 'GL_Invoice');
      return;
    case 'R0':
      onOpenForm(TransNo, 'GL_RegistersCash', 'GL_InvoicePayment');
      return;
    default:
      return;
  }
};


