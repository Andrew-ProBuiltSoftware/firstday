export const LISTING_TITLE_MAP: { [key: string]: string } = {
  ENT_Customers: 'Customers',
  ENT_Employees: 'Employees',
  ENT_Vendors: 'Vendors',
  GL_Accounts: 'Chart of Accounts',
  GL_RegistersAsset: 'Asset Register',
  GL_RegistersLiability: 'Liability Register',
  GL_RegistersEquity: 'Equity Register',
  GL_Income: 'Income Transactions',
  GL_Expense: 'Expense Transactions',
  GL_RegistersCash: 'Bank Account Register',
  GL_Payments: 'Bank Account Payments',
  GL_Deposits: 'Bank Account Deposits',
  GL_CashRecs: 'Reconciliations',
  GL_RegistersCredit: 'Credit Account Register',
  GL_CreditRecs: 'Reconciliations',
  GL_Invoices: 'Invoice Listing',
  GL_InvoicePayments: 'Invoice Payments',
  GL_JournalEntries: 'Journal Entries',
  GL_NotesPayable: 'Notes Payable',
  GL_NotesReceivable: 'Notes Receivable',
  GL_RegistersAR: 'A/R Register',
  GL_Bills: 'Bill Listing',
  GL_BillPayments: 'Bill Payments',
  GL_RegistersAP: 'A/P Register',
  ITEM_Products: 'Products',
  ITEM_Services: 'Services',
  ITEM_AllItems: 'Products and Services',
  GL_ProcessPayroll: 'Process Payroll',
  GL_PTOManager: 'Time-Off Manager',
  GL_Leads: 'Leads & Prospects',
};

export const TRANSACTION_GRIDS = [
  'GL_Payments',
  'GL_Deposits',
  'GL_JournalEntries',
  'GL_Invoices',
  'GL_Bills',
  'GL_BillPayments',
  'GL_InvoicePayments',
];

export const STATES = [
  {
    State: 'AK',
    StateName: 'Alaska',
  },
  {
    State: 'AL',
    StateName: 'Alabama',
  },
  {
    State: 'AR',
    StateName: 'Arkansas',
  },
  {
    State: 'AZ',
    StateName: 'Arizona',
  },
  {
    State: 'CA',
    StateName: 'California',
  },
  {
    State: 'CO',
    StateName: 'Colorado',
  },
  {
    State: 'CT',
    StateName: 'Connecticut',
  },
  {
    State: 'DE',
    StateName: 'Delaware',
  },
  {
    State: 'FL',
    StateName: 'Florida',
  },
  {
    State: 'GA',
    StateName: 'Georgia',
  },
  {
    State: 'HI',
    StateName: 'Hawaii',
  },
  {
    State: 'IA',
    StateName: 'Iowa',
  },
  {
    State: 'ID',
    StateName: 'Idaho',
  },
  {
    State: 'IL',
    StateName: 'Illinois',
  },
  {
    State: 'IN',
    StateName: 'Indiana',
  },
  {
    State: 'KS',
    StateName: 'Kansas',
  },
  {
    State: 'KY',
    StateName: 'Kentucky',
  },
  {
    State: 'LA',
    StateName: 'Louisiana',
  },
  {
    State: 'MA',
    StateName: 'Massachusetts',
  },
  {
    State: 'MD',
    StateName: 'Maryland',
  },
  {
    State: 'ME',
    StateName: 'Maine',
  },
  {
    State: 'MI',
    StateName: 'Michigan',
  },
  {
    State: 'MN',
    StateName: 'Minnesota',
  },
  {
    State: 'MO',
    StateName: 'Missouri',
  },
  {
    State: 'MS',
    StateName: 'Mississippi',
  },
  {
    State: 'MT',
    StateName: 'Montana',
  },
  {
    State: 'NC',
    StateName: 'North Carolina',
  },
  {
    State: 'ND',
    StateName: 'North Dakota',
  },
  {
    State: 'NE',
    StateName: 'Nebraska',
  },
  {
    State: 'NH',
    StateName: 'New Hampshire',
  },
  {
    State: 'NJ',
    StateName: 'New Jersey',
  },
  {
    State: 'NM',
    StateName: 'New Mexico',
  },
  {
    State: 'NV',
    StateName: 'Nevada',
  },
  {
    State: 'NY',
    StateName: 'New York',
  },
  {
    State: 'OH',
    StateName: 'Ohio',
  },
  {
    State: 'OK',
    StateName: 'Oklahoma',
  },
  {
    State: 'OR',
    StateName: 'Oregon',
  },
  {
    State: 'PA',
    StateName: 'Pennsylvania',
  },
  {
    State: 'RI',
    StateName: 'Rhode Island',
  },
  {
    State: 'SC',
    StateName: 'South Carolina',
  },
  {
    State: 'SD',
    StateName: 'South Dakota',
  },
  {
    State: 'TN',
    StateName: 'Tennessee',
  },
  {
    State: 'TX',
    StateName: 'Texas',
  },
  {
    State: 'UT',
    StateName: 'Utah',
  },
  {
    State: 'VA',
    StateName: 'Virginia',
  },
  {
    State: 'VT',
    StateName: 'Vermont',
  },
  {
    State: 'WA',
    StateName: 'Washington',
  },
  {
    State: 'WI',
    StateName: 'Wisconsin',
  },
  {
    State: 'WV',
    StateName: 'West Virginia',
  },
  {
    State: 'WY',
    StateName: 'Wyoming',
  },
];

export const PAYMENT_METHODS = [
  { value: 'ACH' },
  { value: 'Check' },
  { value: 'Draft' },
  { value: 'Wire' },
];

export const PAY_FREQUENCIES = [
  { value: 'B', label: 'Biweekly' },
  { value: 'D', label: 'Daily' },
  { value: 'M', label: 'Monthly' },
  { value: 'S', label: 'SemiMonthly' },
  { value: 'W', label: 'Weekly' },
];

export const PAY_METHODS = [
  { label: 'Salary', value: 'S' },
  { label: 'Hourly', value: 'H' },
];

export const HOLIDAY_WORK_PAY_RULES = [
  { value: 'R', label: 'Regular Time' },
  { value: 'O', label: 'Overtime' },
  { value: 'D', label: 'Double Time' },
];

export const EMPLOYEEMENT_TYPES = [
  // { value: 'FS', title: 'Full Time Salary' },
  // { value: 'PS', title: 'Part Time Salary' },
  // { value: 'FH', title: 'Full Time Hourly' },
  // { value: 'PH', title: 'Part Time Hourly' },
  // { value: 'CH', title: 'Contract Hourly' },
  { value: 'C', title: 'Contractor' },
  { value: 'E', title: 'Employee' },
];

export const _1099_TYPES = ['1099-MISC', '1099-NEC', '1099-K'];

export const TAX_FILING_STATUS = [
  {
    Status: 'S',
    StatusName: 'Single',
  },
  {
    Status: 'MFJ',
    StatusName: 'Married Filing Jointly',
  },
  {
    Status: 'MFS',
    StatusName: 'Married Filing Separately',
  },
  {
    Status: 'HOH',
    StatusName: 'Head of Household',
  },
  {
    Status: 'QW',
    StatusName: 'Qualifying Widow(er)',
  },
];
