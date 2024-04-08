import axios from 'axios';
import { formatClientDateTime } from './Utils/helpers';
// import { DEV_ONLY_CURRENT_USER } from './LoginPage';
import { ComboType } from './types';

const DEV_ONLY_CURRENT_USER = 'JASON';

type PayloadType = Record<
  string,
  string | number | boolean | ArrayBuffer | Date | null | undefined
>;

const customAxios = () =>
  axios.create({
    baseURL: import.meta.env.VITE_BASE_URI,
    headers: {
      Ak: import.meta.env.VITE_AK,
      Cid: import.meta.env.VITE_CID,
      User: DEV_ONLY_CURRENT_USER ?? 'SWAGGER',
      ClientPlatform: 'all',
      ClientTime: formatClientDateTime(new Date()),
    },
  });

export async function fetchPricingData(ID = 1) {
  const data = await customAxios().get(`/v3/Entity/GetPricing?IDNo=${ID}`);
  return data.data.data;
}

export async function fetchEntityData(ID = 1) {
  const data = await customAxios().get(`/v3/Entity/GetVendor?IDNo=${ID}`);
  return data.data.data;
}

export async function fetchVendorList(listType = 'Vendor', status = 'Enabled') {
  const { data } = await customAxios().get(
    `/v3/Entity/GetList?ListType=${listType}&Status=${status}`
  );
  return data.data.records;
}

export async function fetchCustomerList(
  listType = 'Customer',
  status = 'Enabled'
) {
  const { data } = await customAxios().get(
    `/v3/Entity/GetList?ListType=${listType}&Status=${status}`
  );
  return data.data.records;
}

export async function fetchPersonnelList(listType = 'All', status = 'Enabled') {
  const { data } = await customAxios().get(
    `/v3/Entity/Personnel/GetList?ListType=${listType}&ActiveTerm=${status}`
  );
  return data.data.records;
}

export async function fetchAccountList(
  accountType = 'All',
  accountGroup = 'All',
  status = 'Enabled'
) {
  const { data } = await customAxios().get(
    `/v3/GLAccount/GetList?GLAccountType=${accountType}&GLAccountGroup=${accountGroup}&Status=${status}`
  );
  return data.data.records;
}

export async function fetchTransaction(transType: string, transNo = -1) {
  const { data } = await customAxios().get(
    `/v3/Transaction?TransTypeName=${transType}&TransNo=${transNo}`
  );
  return data.data;
}

export async function updateMainRecord(
  transNo: number,
  payload: PayloadType,
  bNew: boolean = false
) {
  console.log(
    `updateMainRecord: transNo : ${transNo} bNew:${bNew} payload : ${JSON.stringify(
      payload,
      null,
      4
    )}`
  );
  const { data } = await customAxios().patch(
    `/v3/Transaction/PatchMain?TransNo=${transNo}&bNew=${bNew}`,
    payload
  );
  return data.transNoGenerated;
}

export async function deleteMainRecord(transType: string, transNo: number) {
  const { data } = await customAxios().delete(
    `/v3/Transaction/DeleteMain?TransTypeName=${transType}&TransNo=${transNo}`
  );
  return data.status;
}

export async function createSubRecord(
  transType: string,
  transNo: number,
  payload: PayloadType
) {
  const { data } = await customAxios().patch(
    `/v3/Transaction/PatchSub?TransTypeName=${transType}&TransNo=${transNo}&IDNo=0`,
    payload
  );
  return data;
}

export async function updateSubRecord(
  transType: string,
  IDNo: number,
  transNo: number,
  payload: PayloadType,
  bNew: boolean = false
) {
  const { data } = await customAxios().patch(
    `/v3/Transaction/PatchSub?TransTypeName=${transType}&IDNo=${IDNo}&TransNo=${transNo}&bNew=${bNew}`,
    payload
  );
  return data;
}

export async function deleteSubRecord(
  transType: string,
  IDNo: number,
  transNo: number
) {
  const { data } = await customAxios().delete(
    `/v3/Transaction/DeleteSub?TransTypeName=${transType}&IDNo=${IDNo}&TransNo=${transNo}`
  );
  return data.status as boolean;
}

export async function fetchAcctDefaults() {
  const { data } = await customAxios().get(`/v3/Setup/AccountingDefaults`);
  return data.data;
}

export async function fetchTermsCodeList() {
  const { data } = await customAxios().get(`/v3/Setup/TermsCodes/GetList`);
  return data.data.records;
}

export async function fetchPayGroupsList() {
  const { data } = await customAxios().get(`/v3/Payroll/PayGroups/GetList`);
  return data.data.records;
}

export async function fetchPayRunsList() {
  const { data } = await customAxios().get(`/v3/Payroll/Payruns/GetList`);
  return data.data.records;
}

export async function fetchDepartmentsList() {
  const { data } = await customAxios().get(
    `/v3/Payroll/PayDepartments/GetList`
  );
  return data.data.records;
}

export const AccountsAPI = {
  getAccount: async (accountNo = '0') => {
    const { data } = await customAxios().get(
      `/v3/GLAccount?AccountNo=${accountNo}`
    );
    return data;
  },
  createAccount: async (accountNo: string, payload: PayloadType) => {
    const { data } = await customAxios().post(
      `/v3/GLAccount?AccountNo=${accountNo}`,
      payload
    );
    return data.status;
  },
  updateAccount: async (accountNo: string, payload: PayloadType) => {
    const { data } = await customAxios().patch(
      `/v3/GLAccount?AccountNo=${accountNo}`,
      payload
    );
    return data.status;
  },
  deleteAccount: async (accountNo: string) => {
    const { data } = await customAxios().delete(
      `/v3/GLAccount?AccountNo=${accountNo}`
    );
    return data.status;
  },
};

export const EntityAPI = {
  fetchEntity: async (idNo: number) => {
    const { data } = await customAxios().get(`/v3/Entity?IDNo=${idNo}`);
    return data.data.record[0];
  },
  fetchEmployee: async (idNo: number) => {
    const { data } = await customAxios().get(
      `/v3/Entity/Personnel?IDNo=${idNo}`
    );
    return data.data;
  },
  fetchVendor: async (idNo: number) => {
    const { data } = await customAxios().get(
      `/v3/Entity/GetVendor?IDNo=${idNo}`
    );
    return data.data.record[0];
  },
  fetchCustomer: async (idNo: number) => {
    const { data } = await customAxios().get(
      `/v3/Entity/GetCustomer?IDNo=${idNo}`
    );
    return data.data;
  },
  fetchLead: async (idNo: number) => {
    const { data } = await customAxios().get(`/v3/Entity/GetLead?IDNo=${idNo}`);
    return data.data;
  },
  patchEntity: async (idNo: number, payload: PayloadType) => {
    const { data } = await customAxios().patch(
      `/v3/Entity?IDNo=${idNo}`,
      payload
    );
    return data;
  },
  deleteEntity: async (idNo: number) => {
    const { data } = await customAxios().delete(`/v3/Entity?IDNo=${idNo}`);
    return data.status;
  },
  terminateEntity: async (idNo: number, payload: PayloadType) => {
    const { data } = await customAxios().patch(
      `/v3/Entity/TerminateEntity?IDNo=${idNo}`,
      payload
    );
    return data.status;
  },
};

export const NotesPayableAPI = {
  fetchList: async () => {
    const { data } = await customAxios().get('/v3/NotesPayable/GetList');
    return data.data.records;
  },
  fetchNote: async (loanNo = -1) => {
    const { data } = await customAxios().get(
      `/v3/NotesPayable?LoanNo=${loanNo}`
    );
    return data.data;
  },
  patchMainNote: async (loanNo: number, payload: PayloadType) => {
    console.log(
      `updateMainRecord: loanNo : ${loanNo} payload : ${JSON.stringify(
        payload,
        null,
        4
      )}`
    );
    const { data } = await customAxios().patch(
      `/v3/NotesPayable/PatchMainNote?LoanNo=${loanNo}`,
      payload
    );
    return data;
  },
  patchSubSchedule: async (loanNo: number, payload: PayloadType) => {
    const { data } = await customAxios().patch(
      `/v3/NotesPayable/PatchSubSchedule?LoanNo=${loanNo}`,
      payload
    );
    return data;
  },
  deleteMainNote: async (loanNo: number) => {
    const { data } = await customAxios().delete(
      `/v3/NotesPayable/DeleteMainNote?LoanNo=${loanNo}`
    );
    return data.status as boolean;
  },
  deleteSubSchedule: async (loanNo: number) => {
    const { data } = await customAxios().delete(
      `/v3/NotesPayable/DeleteSubSchedule?LoanNo=${loanNo}`
    );
    return data.status as boolean;
  },
};

export const NotesReceivableAPI = {
  fetchList: async () => {
    const { data } = await customAxios().get('/v3/NotesReceivable/GetList');
    return data.data.records;
  },
  fetchNote: async (loanNo = -1) => {
    const { data } = await customAxios().get(
      `/v3/NotesReceivable?LoanNo=${loanNo}`
    );
    return data.data;
  },
  patchMainNote: async (loanNo: number, payload: PayloadType) => {
    console.log(
      `updateMainRecord: loanNo : ${loanNo} payload : ${JSON.stringify(
        payload,
        null,
        4
      )}`
    );
    const { data } = await customAxios().patch(
      `/v3/NotesReceivable/PatchMainNote?LoanNo=${loanNo}`,
      payload
    );
    return data;
  },
  patchSubSchedule: async (loanNo: number, payload: PayloadType) => {
    const { data } = await customAxios().patch(
      `/v3/NotesReceivable/PatchSubSchedule?LoanNo=${loanNo}`,
      payload
    );
    return data;
  },
  deleteMainNote: async (loanNo: number) => {
    const { data } = await customAxios().delete(
      `/v3/NotesReceivable/DeleteMainNote?LoanNo=${loanNo}`
    );
    return data.status as boolean;
  },
  deleteSubSchedule: async (loanNo: number) => {
    const { data } = await customAxios().delete(
      `/v3/NotesReceivable/DeleteSubSchedule?LoanNo=${loanNo}`
    );
    return data.status as boolean;
  },
};

export const TransactionGetRegisterAPI = {
  fetchList: async (
    type: string,
    accountNo = '0',
    startDate = '01/01/2020',
    endDate = '01/01/2024',
    entity = 0
  ) => {
    const { data } = await customAxios().get(
      `/v3/Transaction/GetRegister?RegisterType=${type}&AccountNo=${accountNo}&StartDate=${encodeURIComponent(
        startDate
      )}&EndDate=${encodeURIComponent(endDate)}&EntityID=${entity}`
    );
    return data.data.records;
  },
};

export const TransactionGetListAPI = {
  fetchList: async (
    type: string,
    accountNo = '0',
    startDate = '01/01/2020',
    endDate = '01/01/2024',
    entity = 0
  ) => {
    const { data } = await customAxios().get(
      `/v3/Transaction/GetList?TransListType=${type}&AccountNo=${accountNo}&StartDate=${encodeURIComponent(
        startDate
      )}&EndDate=${encodeURIComponent(endDate)}&EntityID=${entity}`
    );
    return data.data.records;
  },
  //FIXTHIS creating a 2nd one because date isn't a required field
  fetchList2: async (
    type: string,
    accountNo = '0',
    startDate?: string,
    endDate?: string,
    entity = 0
  ) => {
    let getString = `/v3/Transaction/GetList?TransListType=${type}&AccountNo=${accountNo}&EntityID=${entity}`;
    getString += startDate ? `&StartDate=${encodeURIComponent(startDate)}` : '';
    getString += endDate ? `&EndDate=${encodeURIComponent(endDate)}` : '';

    const { data } = await customAxios().get(getString);
    return data.data.records;
  },
  fetchListWithCombos: async (
    type: string,
    accountNo = '0',
    startDate?: string,
    endDate?: string,
    entity = 0
  ) => {
    let getString = `/v3/Transaction/GetList?TransListType=${type}&EntityID=${entity}`;
    getString += accountNo ? `&AccountNo=${accountNo}` : '';
    getString += startDate ? `&StartDate=${encodeURIComponent(startDate)}` : '';
    getString += endDate ? `&EndDate=${encodeURIComponent(endDate)}` : '';

    const { data } = await customAxios().get(getString);
    return data.data;
  },
};

// /v3/Transaction/Deposits/PatchSubDeposit
export const DepositsAPI = {
  PatchSubDeposit: async (
    transType: string,
    transNo: number,
    payload: PayloadType[]
  ) => {
    const { data } = await customAxios().patch(
      `/v3/Transaction/Deposits/PatchSubDeposit?TransTypeName=${transType}&TransNo=${transNo}`,
      payload
    );
    return data.status;
  },
};

export async function TransactionGetJournalEntry(transNo = -1) {
  const { data } = await customAxios().get(
    `/v3/Transaction/GetJournalEntry?TransNo=${transNo}`
  );
  return data.data;
}

export async function TransactionGetPayment(transNo = -1) {
  const { data } = await customAxios().get(
    `/v3/Transaction/GetPayment?TransNo=${transNo}`
  );
  return data.data;
}

export async function TransactionGetDeposit(transNo = -1) {
  const { data } = await customAxios().get(
    `/v3/Transaction/GetDeposit?TransNo=${transNo}`
  );
  return data.data;
}

export async function TransactionGetBill(transNo = -1) {
  const { data } = await customAxios().get(
    `/v3/Transaction/GetBill?TransNo=${transNo}`
  );
  return data.data;
}

export async function TransactionGetChangeBillBalance(transNo = -1) {
  const { data } = await customAxios().get(
    `/v3/Transaction/GetChangeBillBalance?TransNo=${transNo}`
  );
  return data.data;
}

export async function TransactionPatchChangeBillBalance(
  transNo = -1,
  payload: Record<string, string | number | null | boolean | any>
) {
  const { data } = await customAxios().patch(
    `/v3/Transaction/PatchChangeBillBalance?TransNo=${transNo}`,
    payload
  );

  return data;
}

export async function TransactionGetInvoice(transNo = -1) {
  const { data } = await customAxios().get(
    `/v3/Transaction/GetInvoice?TransNo=${transNo}`
  );
  return data.data;
}

export async function TransactionGetChangeInvoiceBalance(transNo = -1) {
  const { data } = await customAxios().get(
    `/v3/Transaction/GetChangeInvoiceBalance?TransNo=${transNo}`
  );
  return data.data;
}

export async function TransactionPatchChangeInvoiceBalance(
  transNo = -1,
  payload: Record<string, string | number | null | boolean | any>
) {
  const { data } = await customAxios().patch(
    `/v3/Transaction/PatchChangeInvoiceBalance?TransNo=${transNo}`,
    payload
  );

  return data;
}

export async function GetOpenedInvoice(transEntityID = -1, transAccount = ' ') {
  const { data } = await customAxios().get(
    `/v3/Transaction/InvoicePayments/GetOpenInvoices?TransEntityID=${transEntityID}&PmtsSourceAccount=${transAccount}`
  );
  return data.data.records;
}

export async function GetUndepositedFunds() {
  const { data } = await customAxios().get(
    `/v3/Transaction/GetList?TransListType=InvoicePaymentsUncleared&AccountNo=10440&EntityID=0`
  );
  return data.data.records;
}

export async function TransactionGetInvoicePayment(transNo = -1) {
  // console.log(`from sournce: ${transNo }`);

  const { data } = await customAxios().get(
    `/v3/Transaction/InvoicePayments/GetInvoicePayment?TransNo=${transNo}`
  );

  // console.log(`from sournce: ${JSON.stringify(data.data,null, 4) }`);
  return data.data;
}

export async function PatchOpenInvoices(
  payload: Record<string, string | number | null | boolean | any>
) {
  const { data } = await customAxios().patch(
    `/v3/Transaction/InvoicePayments/PatchOpenInvoices`,
    payload
  );

  return data;
}

export async function DeleteInvoicePaymentSubrecord(
  transType: 'Payment' | 'Discount' | undefined,
  IDNo: number | undefined,
  transNo: number | undefined,
  transCreditAmount: number | undefined,
  linkBackID: number | undefined
) {
  console.log([transType, IDNo, transNo, transCreditAmount, linkBackID]);

  if (!transType || !IDNo || !transNo) return false;
  const route = transType === 'Payment' ? 'DeletePayment' : 'DeleteDiscount';
  console.log(
    `delete route : ${`/v3/Transaction/InvoicePayment/${route}?IDNo=${IDNo}&TransNo=${transNo}`}`
  );
  const { data } = await customAxios().delete(
    `/v3/Transaction/InvoicePayments/${route}?IDNo=${IDNo}&TransNo=${transNo}`,
    {
      data: {
        transCreditAmount,
        linkBackID,
      },
    }
  );
  return data.status as boolean;
}

export async function PatchInvoicePaymentSubrecord(
  // transType: 'Payment' | 'Discount' | undefined,
  IDNo: number | undefined,
  transNo: number | undefined,
  paymentAmount: number | undefined
) {
  // console.log([IDNo, transNo, paymentAmount]);

  if (!IDNo || !transNo) return false;
  console.log(
    `patch route : ${`/v3/Transaction/InvoicePayment/PatchPayment?PaymentIDNo=${IDNo}&TransNo=${transNo}`}`
  );
  const { data } = await customAxios().patch(
    `/v3/Transaction/InvoicePayments/PatchPayment?PaymentIDNo=${IDNo}&TransNo=${transNo}`,
    {
      paymentAmount,
    }
  );
  return data.status as boolean;
}

///v3/Transaction/InvoicePayments/PostPartialPayment
export async function PostPartialPayment(
  // transType: 'Payment' | 'Discount' | undefined,
  invoiceTransNo: number | undefined,
  idNo: number | undefined,
  transNo: number | undefined,
  transEntityID: number | undefined,
  transEntityName: string | undefined,
  transAccount: string | undefined,
  transDate: Date | undefined,
  paymentAmount: number | undefined
) {
  if (
    ![
      invoiceTransNo,
      idNo,
      transNo,
      transEntityID,
      transEntityName,
      transAccount,
      transDate,
    ].every((i) => i)
  )
    return false;
  console.log(
    `patch route : ${`/v3/Transaction/InvoicePayment/PostPartialPayment`}`
  );
  const { data } = await customAxios().patch(
    `/v3/Transaction/InvoicePayments/PostPartialPayment?InvoiceTransNo=${invoiceTransNo}`,
    {
      idNo,
      transNo,
      transEntityID,
      transEntityName,
      transAccount,
      transDate,
      paymentAmount,
    }
  );
  return data.status as boolean;
}

// /v3/Transaction/InvoicePayments/PatchPayment

export async function GetOpenedBill(transEntityID = -1, transAccount = ' ') {
  const { data } = await customAxios().get(
    `/v3/Transaction/BillPayments/GetOpenBills?TransEntityID=${transEntityID}&PmtsSourceAccount=${transAccount}`
  );
  return data.data.records;
}

export async function TransactionGetBillPayment(transNo = -1) {
  // console.log(`from sournce: ${transNo }`);

  const { data } = await customAxios().get(
    `/v3/Transaction/BillPayments/GetBillPayment?TransNo=${transNo}`
  );

  // console.log(`from sournce: ${JSON.stringify(data.data,null, 4) }`);
  return data.data;
}

export async function PatchOpenBills(
  payload: Record<string, string | number | null | boolean | any>
) {
  const { data } = await customAxios().patch(
    `/v3/Transaction/BillPayments/PatchOpenBills`,
    payload
  );

  return data;
}

export async function DeleteBillPaymentSubrecord(
  transType: 'Payment' | 'Discount' | undefined,
  IDNo: number | undefined,
  transNo: number | undefined,
  transDebitAmount: number | undefined,
  linkBackID: number | undefined
) {
  console.log([transType, IDNo, transNo, transDebitAmount, linkBackID]);

  if (!transType || !IDNo || !transNo) return false;
  const route = transType === 'Payment' ? 'DeletePayment' : 'DeleteDiscount';
  console.log(
    `delete route : ${`/v3/Transaction/BillPayment/${route}?IDNo=${IDNo}&TransNo=${transNo}`}`
  );
  const { data } = await customAxios().delete(
    `/v3/Transaction/BillPayments/${route}?IDNo=${IDNo}&TransNo=${transNo}`,
    {
      data: {
        transDebitAmount,
        linkBackID,
      },
    }
  );
  return data.status as boolean;
}

export async function PatchBillPaymentSubrecord(
  idNo: number | undefined,
  transNo: number | undefined,
  billPaymentIDNo: number | undefined,
  transEntityID: number | undefined,
  transEntityName: string | undefined,
  transAccount: string | undefined,
  transDate: Date | undefined,
  transPayment: number | undefined
) {
  console.log([
    idNo,
    transNo,
    transEntityID,
    transEntityName,
    transAccount,
    transDate,
  ]);
  ///v3/Transaction/BillPayments/PostPartialBillPayment
  if (
    ![
      idNo,
      transNo,
      transEntityID,
      transEntityName,
      transAccount,
      transDate,
    ].every((i) => i)
  )
    return false;
  console.log(
    `patch route : ${`/v3/Transaction/BillPayments/PatchBillPayment`}`
  );
  const { data } = await customAxios().patch(
    `/v3/Transaction/BillPayments/PatchBillPayment`,
    {
      idNo,
      billPaymentIDNo,
      transNo,
      transEntityID,
      transEntityName,
      transAccount,
      transDate,
      transPayment,
    }
  );
  return data.status as boolean;
}

export async function PostPartialBillPayment(
  // transType: 'Payment' | 'Discount' | undefined,
  billTransNo: number | undefined,
  idNo: number | undefined,
  transNo: number | undefined,
  transEntityID: number | undefined,
  transEntityName: string | undefined,
  transAccount: string | undefined,
  transDate: Date | undefined,
  transPayment: number | undefined
) {
  ///v3/Transaction/BillPayments/PostPartialBillPayment
  if (
    ![
      billTransNo,
      idNo,
      transNo,
      transEntityID,
      transEntityName,
      transAccount,
      transDate,
    ].every((i) => i)
  )
    return false;
  console.log(
    `patch route : ${`/v3/Transaction/BillPayments/PostPartialBillPayment`}`
  );
  const { data } = await customAxios().patch(
    `/v3/Transaction/BillPayments/PostPartialBillPayment?BillTransNo=${billTransNo}`,
    {
      idNo,
      transNo,
      transEntityID,
      transEntityName,
      transAccount,
      transDate,
      transPayment,
    }
  );
  return data.status as boolean;
}

export async function GetUndepositedPayments() {
  const { data } = await customAxios().get(
    `/v3/Transaction/Deposits/GetUndepositedPayments`
  );
  return data.data.records;
}

export async function PatchUndepositedPayments(
  transNo: number | undefined,
  transAccount: string | undefined,
  defUndepFundsAcct: string | undefined,
  idNos: Number[]
  // payload: Record<string, string | number | null | boolean | any>
) {
  if (!transNo || !transAccount) return false;
  const form = new FormData();
  form.append('TransNo', transNo.toString());
  form.append('TransAccount', transAccount.toString());
  form.append('UndepFundsAcct', defUndepFundsAcct?.toString() || '');
  idNos.forEach((i) => {
    form.append('IDNos', i.toString());
  });

  const { data } = await customAxios().patch(
    `/v3/Transaction/Deposits/PatchUndepositedPayments`,
    form
  );

  return data;
}

export const ReconciliationAPI = {
  fetchRec: async (recNo: number, transAccount: string) => {
    const { data } = await customAxios().get(
      `/v3/Reconciliation?RecNo=${recNo}&TransAccount=${transAccount}`
    );
    const returnData = { ...data.data };
    if (data.startDate) {
      returnData['startDate'] = data.startDate;
    }
    if (data.endDate) {
      returnData['endDate'] = data.endDate;
    }

    return returnData;
  },
  updateMainRecord: async (
    mainIDNo: number | undefined,
    accountNo: string | undefined,
    recNo: number,
    payload: Record<
      string,
      string | number | null | boolean | Date | undefined
    >,
    bNew: boolean = false
  ) => {
    // if (
    // 	![
    // 		recNo,
    // 	].every((i) => i)
    // )
    // 	return false;
    const { data } = await customAxios().patch(
      `/v3/Reconciliation/PatchMainRec?MainIDNo=${
        mainIDNo || 0
      }&AccountNo=${accountNo}&RecNo=${recNo}&bNew=${bNew}`,
      payload
    );

    return data;
  },
  updateSubRecord: async (
    mainIDNo: number,
    accountNo: string,
    subIDNo: number,
    recNo: number,
    type: 'Add' | 'Del'
  ) => {
    if (![mainIDNo, subIDNo, recNo].every((i) => i)) return false;

    const { data } = await customAxios().patch(
      `/v3/Reconciliation/PatchSub${type}Rec?MainIDNo=${mainIDNo}&AccountNo=${accountNo}&SubIDNo=${subIDNo}&RecNo=${recNo}`
    );

    return data;
  },
  updateSubRecords: async (
    mainIDNo: number,
    accountNo: string,
    subIDNo: number[],
    recNo: number
  ) => {
    if (![mainIDNo, subIDNo, recNo].every((i) => i)) {
      return false;
    }
    const url = `/v3/Reconciliation/PatchSubAddRecords?MainIDNo=${mainIDNo}&AccountNo=${accountNo}&RecNo=${recNo}`;
    const formData = new FormData();

    if (subIDNo?.length) {
      subIDNo.forEach((id) => {
        formData.append('SubIDNo', String(id));
      });
    }
    const { data } = await customAxios().patch(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  },
  deleteRecRecord: async (recNo: number, accountNo: string) => {
    const { data } = await customAxios().delete(
      `/v3/Reconciliation/DeleteMainRec?RecNo=${recNo}&AccountNo=${accountNo}`
    );

    return data.status;
  },
  getCurrentPeriod: async (AccountNo: string) => {
    const { data } = await customAxios().get(
      `/v3/Reconciliation/GetCurrentPeriod?AccountNo=${AccountNo}`
    );
    return data;
  },
};

export const ReconciliationGetListAPI = {
  //FIXTHIS default dates
  fetchList: async (
    accountNo = '10010',
    startDate = '01/01/2000',
    endDate = '01/01/2024'
  ) => {
    const { data } = await customAxios().get(
      `/v3/Reconciliation/GetList?AccountNo=${accountNo}&StartDate=${encodeURIComponent(
        startDate
      )}&EndDate=${encodeURIComponent(endDate)}`
    );
    return data.data.records;
  },
};

export const ItemCodesAPI = {
  getAllItems: async () => {
    const { data } = await customAxios().get(`/v3/Item/ItemCodes/GetAllItems`);
    return data.data.records;
  },
  getProducts: async () => {
    const { data } = await customAxios().get(`/v3/Item/ItemCodes/GetProducts`);
    return data.data.records;
  },
  getServices: async () => {
    const { data } = await customAxios().get(`/v3/Item/ItemCodes/getServices`);
    return data.data.records;
  },
  fetchProduct: async (itemCode: any) => {
    const { data } = await customAxios().get(
      `/v3/Item/ItemCodes/GetProduct?ItemCode=${itemCode}`
    );
    return data.data;
  },
  fetchService: async (itemCode: any) => {
    const { data } = await customAxios().get(
      `/v3/Item/ItemCodes/GetService?ItemCode=${itemCode}`
    );
    return data.data;
  },
  createItem: async (itemCode: string, payload: PayloadType) => {
    const { data } = await customAxios().post(
      `/v3/Item/ItemCodes?ItemCode=${itemCode}`,
      payload
    );
    return data.status;
  },
  patchItem: async (itemCode: string, payload: PayloadType) => {
    const { data } = await customAxios().patch(
      `/v3/Item/ItemCodes?ItemCode=${itemCode}`,
      payload
    );
    return data.status;
  },
  deleteItem: async (itemCode: string) => {
    const { data } = await customAxios().delete(
      `/v3/Item/ItemCodes?ItemCode=${itemCode}`
    );
    return data.status;
  },
};

// Customer Contacts
export const CustomerContactAPI = {
  fetchContacts: async (idNo: number) => {
    const { data } = await customAxios().get(
      `/v3/Entity/Contact/GetList?Entity_ID=${idNo}`
    );
    return data.data.records;
  },
  getSingleContact: async (idNo: number) => {
    const { data } = await customAxios().get(`/v3/Entity/Contact?IDNo=${idNo}`);
    return data.data;
  },
  patchContact: async (idNo: number, payload: PayloadType) => {
    const { data } = await customAxios().patch(
      `/v3/Entity/Contact?IDNo=${idNo}`,
      payload
    );
    return data.status;
  },
  deleteContact: async (idNo: number) => {
    const { data } = await customAxios().delete(
      `/v3/Entity/Contact?IDNo=${idNo}`
    );
    return data.status;
  },
};

// Entity Files
export const EntityFilesAPI = {
  getFiles: async (fileCategory: string, categoryID: number) => {
    const { data } = await customAxios().get(
      `/v3/Document/GetImageList?FileCategory=${fileCategory}&CategoryID=${categoryID}`
    );
    return data.data.records;
  },
  getFileURL: async (fileID: number) => {
    const { data } = await customAxios().get(
      `/v3/Document/GetFileURL?FileID=${fileID}`
    );
    return data.data;
  },
  getThumbnailsURL: async (fileIDQuery: string) => {
    const { data } = await customAxios().get(
      `/v3/Document/GetThumbnailUrls?${fileIDQuery}`
    );
    return data.data.records;
  },
  uploadSingleFile: async (payload: PayloadType) => {
    const { data } = await customAxios().post(
      `/v3/Document/UploadFile`,
      {
        file: payload.file,
      },
      {
        params: {
          FileCategory: payload.fileCategory,
          CategoryID: payload.categoryID,
          FileType: payload.FileType,
          FileDescription: payload.fileDescription,
          FileExt: payload.fileExt,
        },
      }
    );
    return data;
  },
  deleteFile: async (fileID: number) => {
    const { data } = await customAxios().delete(
      `/v3/Document/DeleteFile?FileID=${fileID}`
    );
    return data;
  },
  downloadFile: async (fileID: number) => {
    const { data } = await customAxios().get(
      `/v3/Document/DownloadFile?FileID=${fileID}`
    );
    return data;
  },
};

// Reports
export async function fetchReportsList() {
  const { data } = await customAxios().get(
    `/v3/Reporting/SystemReports/GetList`
  );
  return data;
}

export async function fetchSingleReport(
  ReportCode: string,
  ReportVariation: string
) {
  const { data } = await customAxios().get(
    `/v3/Reporting/SystemReports?ReportCode=${ReportCode}&ReportVariation=${ReportVariation}`
  );
  return data;
}

export const HolidaysAPI = {
  getList: async () => {
    const data = await customAxios().get('v3/Setup/PTOHolidays/GetList');
    return data.data.data.records;
  },
};

export const CustomFieldsAPI = {
  getTemplateList: async () => {
    const data = await customAxios().get('v3/Custom/CustomFormFields/GetList', {
      params: { FormName: 'Customers' },
    });
    return data.data.data.records;
  },
  getDefinitionsAndValues: async (LinkID: number) => {
    const data = await customAxios().get(
      'v3/Custom/EntityCustomData/GetFieldDefinitionsAndValues',
      {
        params: { FormName: 'Customers', LinkID },
      }
    );
    return data.data.data;
  },
  getListByID: async (LinkID: number) => {
    const data = await customAxios().get('v3/Custom/EntityCustomData/GetList', {
      params: { FormName: 'Customers', LinkID },
    });
    return data.data.data.records;
  },
  createField: async (LinkID: number, payload: any) => {
    const data = await customAxios().patch(
      'v3/Custom/EntityCustomData',
      {
        ...payload,
        LinkID,
      },
      { params: { IDNo: 0 } }
    );
    return data.status;
  },
  patchField: async (IDNo: number, LinkID: number, payload: any) => {
    const data = await customAxios().patch(
      'v3/Custom/EntityCustomData',
      {
        ...payload,
      },
      { params: { LinkID, IDNo } }
    );
    return data.status;
  },
  deleteField: async (IDNo: number) => {
    const data = await customAxios().delete('v3/Custom/EntityCustomData', {
      params: { IDNo },
    });
    return data.status;
  },
};

export const VendorsCustomFieldsAPI = {
  getTemplateList: async () => {
    const data = await customAxios().get('v3/Custom/CustomFormFields/GetList', {
      params: { FormName: 'Vendors' },
    });
    return data.data.data.records;
  },
  getDefinitionsAndValues: async (LinkID: number) => {
    const data = await customAxios().get(
      'v3/Custom/EntityCustomData/GetFieldDefinitionsAndValues',
      {
        params: { FormName: 'Vendors', LinkID },
      }
    );
    return data.data.data;
  },
  getListByID: async (LinkID: number) => {
    const data = await customAxios().get('v3/Custom/EntityCustomData/GetList', {
      params: { FormName: 'Vendors', LinkID },
    });
    return data.data.data.records;
  },
  createField: async (LinkID: number, payload: any) => {
    const data = await customAxios().patch(
      'v3/Custom/EntityCustomData',
      {
        ...payload,
        LinkID,
      },
      { params: { IDNo: 0 } }
    );
    return data.status;
  },
  patchField: async (IDNo: number, LinkID: number, payload: any) => {
    const data = await customAxios().patch(
      'v3/Custom/EntityCustomData',
      {
        ...payload,
      },
      { params: { LinkID, IDNo } }
    );
    return data.status;
  },
  deleteField: async (IDNo: number) => {
    const data = await customAxios().delete('v3/Custom/EntityCustomData', {
      params: { IDNo },
    });
    return data.status;
  },
};

export const LeadssCustomFieldsAPI = {
  getTemplateList: async () => {
    const data = await customAxios().get('v3/Custom/CustomFormFields/GetList', {
      params: { FormName: 'Leads' },
    });
    return data.data.data.records;
  },
  getDefinitionsAndValues: async (LinkID: number) => {
    const data = await customAxios().get(
      'v3/Custom/EntityCustomData/GetFieldDefinitionsAndValues',
      {
        params: { FormName: 'Leads', LinkID },
      }
    );
    return data.data.data;
  },
  getListByID: async (LinkID: number) => {
    const data = await customAxios().get('v3/Custom/EntityCustomData/GetList', {
      params: { FormName: 'Leads', LinkID },
    });
    return data.data.data.records;
  },
  createField: async (LinkID: number, payload: any) => {
    const data = await customAxios().patch(
      'v3/Custom/EntityCustomData',
      {
        ...payload,
        LinkID,
      },
      { params: { IDNo: 0 } }
    );
    return data.status;
  },
  patchField: async (IDNo: number, LinkID: number, payload: any) => {
    const data = await customAxios().patch(
      'v3/Custom/EntityCustomData',
      {
        ...payload,
      },
      { params: { LinkID, IDNo } }
    );
    return data.status;
  },
  deleteField: async (IDNo: number) => {
    const data = await customAxios().delete('v3/Custom/EntityCustomData', {
      params: { IDNo },
    });
    return data.status;
  },
};

export const PTOManagerAPI = {
  getTimeOffPerEmp: async (month: number = 3, year: number = 2024) => {
    const data = await customAxios().get(
      'v3/Dashboard/TimeOffManager/GetTmeOffPerEmp',
      {
        params: { PTOMonth: month, PTOYear: year, EmpID: 3053 },
      }
    );
    return data.data.data;
  },

  getDashboard: async (month: number, year: number, signal: AbortSignal) => {
    const data = await customAxios().get(
      'v3/Dashboard/TimeOffManager/GetDashboard',
      {
        params: { PTOMonth: month, PTOYear: year },
        signal: signal,
      }
    );
    return data.data.data;
  },
  getDepartmentCombos: async (month: number, year: number) => {
    const data = await customAxios().get(
      'v3/Dashboard/TimeOffManager/GetDashboard',
      {
        params: { PTOMonth: month, PTOYear: year },
      }
    );
    return data.data.data.combos.PayDepartmentsALL;
  },
  getTORequest: async (IDNo = 0) => {
    const data = await customAxios().get(
      'v3/Dashboard/TimeOffManager/GetTORequest',
      {
        params: { IDNo },
      }
    );
    return data.data;
  },
  deleteTORequest: async (IDNo: number) => {
    const data = await customAxios().delete('v3/Dashboard/TimeOffManager', {
      params: { IDNo },
    });
    return data.status;
  },
  patchTORequest: async (IDNo: number, payload: any) => {
    const data = await customAxios().patch(
      'v3/Dashboard/TimeOffManager/PatchTimeOff',
      { ...payload },
      {
        params: { IDNo, TakenYN: false },
      }
    );
    return data;
  },
  createTORequest: async (payload: any) => {
    const data = await customAxios().patch(
      'v3/Dashboard/TimeOffManager/PatchTimeOff',
      { ...payload },
      {
        params: { IDNo: 0, TakenYN: false },
      }
    );
    return data;
  },
};

export const PayCodeAPI = {
  getList: async (employeeID: number) => {
    const data = await customAxios().get('v3/Entity/EmployeePayCodes/GetList', {
      params: { employeeID: employeeID },
    });
    return data.data.data.records;
  },
  getEmployeeDeduct: async (employeeID: number) => {
    const data = await customAxios().get(
      `v3/Entity/EmployeePayCodes/GetDeduct?IDNo=${employeeID}`,
      {
        params: { IDNo: employeeID },
      }
    );
    return data.data.data;
  },
  getEmployeeAdd: async (employeeID: number) => {
    const data = await customAxios().get('v3/Entity/EmployeePayCodes/GetAdd', {
      params: { IDNo: employeeID },
    });
    return data.data.data;
  },
  getPayCodeDedCombos: async () => {
    const data = await customAxios().get(
      'v3/Entity/EmployeePayCodes/GetNewDeduct'
    );
    return data.data.data.combos;
  },
  getPayCodeDedRecord: async (payCode?: string) => {
    const data = await customAxios().get(
      'v3/Entity/EmployeePayCodes/GetNewDeduct',
      { params: { PayCode: payCode } }
    );
    return data.data.data.record;
  },
  getPayCodeAddRecord: async (payCode?: string) => {
    const data = await customAxios().get(
      'v3/Entity/EmployeePayCodes/GetNewAdd',
      { params: { PayCode: payCode } }
    );
    return data.data.data.record;
  },
  getPayCodeAddCombos: async () => {
    const data = await customAxios().get(
      'v3/Entity/EmployeePayCodes/GetNewAdd'
    );
    return data.data.data.combos;
  },
  createEmployeePayCode: async (payload: any) => {
    const data = await customAxios().patch(
      'v3/Entity/EmployeePayCodes',
      { ...payload },
      { params: { IDNo: 0 } }
    );
    return data.status;
  },
  updateEmployeePayCode: async (payload: any, IDNo: number) => {
    const data = await customAxios().patch(
      'v3/Entity/EmployeePayCodes',
      { ...payload },
      { params: { IDNo: IDNo } }
    );
    return data.status;
  },
  deleteEmployeePayCode: async (IDNo: number) => {
    const data = await customAxios().delete('v3/Entity/EmployeePayCodes', {
      params: { IDNo: IDNo },
    });
    return data.status;
  },
};

export async function fetchNewPayGroups(code?: string) {
  const { data } = await customAxios().get(
    `/v3/Payroll/PayRuns/GetNew?PayGroupCode=${code}`
  );
  return data;
}

export async function patchPayRun(
  id: string,
  payload: any,
  bNew: boolean = false
) {
  const { data } = await customAxios().patch(
    `/v3/Payroll/PayRuns/PatchPayRun?PayRunID=${id}&bNew=${bNew}`,
    payload
  );
  return data;
}

export async function fetchPayRunWorksheet(
  payRunId: string,
  employeeId: number
) {
  const { data } = await customAxios().get(
    `/v3/Payroll/PayRuns/GetPayWorksheet?PayRunID=${payRunId}&EmployeeID=${employeeId}`
  );
  return data;
}

export async function fetchPayRun(id: string) {
  const { data } = await customAxios().get(
    `v3/Payroll/PayRuns/GetPayRun?PayRunID=${id}`
  );
  return data;
}

export async function fetchPayRuns(id: number | string, year: number | string) {
  const { data } = await customAxios().get(
    `v3/Payroll/PayRuns/GetPayRun?PayRunID=${id}&PayRunYear=${year}`
  );
  return data.data;
}

export async function fetchAccountDefaults() {
  const { data } = await customAxios().get(`v3/Setup/AccountingDefaults`);
  return data.data;
}

export const PayrollWorksheet = {
  getNewDeduct: async (employeeId: number, payCode?: string) => {
    const { data } = await customAxios().get(
      `/v3/Payroll/PayWorksheet/GetNewDeduct?EmployeeID=${employeeId}${
        payCode ? `&PayCode=${payCode}` : ''
      }`
    );
    return data;
  },
  getNewAdd: async (employeeId: number, payCode?: string) => {
    const { data } = await customAxios().get(
      `/v3/Payroll/PayWorksheet/GetNewAdd?EmployeeID=${employeeId}${
        payCode ? `&PayCode=${payCode}` : ''
      }`
    );
    return data;
  },
  getDeduct: async (IDNo: number) => {
    const { data } = await customAxios().get(
      `/v3/Payroll/PayWorksheet/GetDeduct?IDNo=${IDNo}`
    );
    return data;
  },
  getAdd: async (IDNo: number) => {
    const { data } = await customAxios().get(
      `/v3/Payroll/PayWorksheet/GetAdd?IDNo=${IDNo}`
    );
    return data;
  },
  patchAdd: async (idNo: number, payload: PayloadType) => {
    const { data } = await customAxios().patch(
      `/v3/Payroll/PayWorksheet/PatchAdd?IDNo=${idNo}`,
      payload
    );
    return data.status;
  },
  patchDeduct: async (idNo: number, payload: PayloadType) => {
    const { data } = await customAxios().patch(
      `/v3/Payroll/PayWorksheet/PatchDeduct?IDNo=${idNo}`,
      payload
    );
    return data.status;
  },
  deleteWorksheet: async (idNo: number) => {
    const { data } = await customAxios().delete(
      `/v3/Payroll/PayWorksheet?IDNo=${idNo}`
    );
    return data.status;
  },
  addHours: async (PayRunID: string, payload: PayloadType) => {
    const { data } = await customAxios().patch(
      `/v3/Payroll/PayRuns/UpdatePayrollHours?PayRunID=${PayRunID}`,
      payload
    );
    return data.status;
  },
};

type PayLoadHoursType = {
  EmployeeIDs: number;
  NewHours: number;
}[];
export async function patchPayrollHours(
  PayRunID: string,
  payload: PayLoadHoursType
) {
  const formData = new FormData();

  payload.forEach(({ EmployeeIDs, NewHours }) => {
    formData.append('EmployeeIDs', String(EmployeeIDs));
    formData.append('NewHours', String(NewHours));
  });

  const { data } = await customAxios().patch(
    `/v3/Payroll/PayRuns/UpdatePayrollHours?PayRunID=${PayRunID}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
}

export async function fetchPositionsList() {
  const { data } = await customAxios().get(`/v3/Payroll/PayPositions/GetList`);
  return data.data.records;
}

export const MiscAPI = {
  getCombo: async (
    type: ComboType,
    status?: `Enabled` | `Disabled` | `All`
  ) => {
    let getString = `/v3/Misc/GetCombo?combo=${type}`;
    getString += status ? `&status=${status}` : ``;
    // console.log("getCombo: ~ getString:", getString)
    const data = await customAxios().get(getString);
    return data.data.data[type.toString()];
  },
  getCombos: async (list: ComboType[]) => {
    // const promises = list.map(async (type) => {
    // 	console.log("promises ~ type:", type)
    // 	let getString = `/v3/Misc/GetCombo?combo=${type}`;
    // 	console.log("getCombo: ~ getString:", getString)
    // 	const promise = customAxios().get(getString);
    // 	 return promise;
    // });
    // return Promise.all(promises);

    const promises = list.map(async (type) => {
      return await MiscAPI.getCombo(type);
    });

    return Promise.all(promises);
  },
};
