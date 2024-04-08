export type RequestFormData = {
  Entity: { EntityName: string; IDNo: number; Department: string };
  PayCode: { PayCode: string };
  RequestDT: Date | null;
  DateFrom: Date | null;
  DateTo: Date | null;
  TimeFrom: Date | null;
  TimeTo: Date | null;
  ResponseNotes: string;
  RequestNotes: string;
  ResponseDT: Date | null;
  ResponseCode: { key: string; name: string } | null;
  FullDay: string;
  RequestStatus: string;
};

export type TORequestCombos = {
  availHours: number;
  data: {
    record?: RequestRecord;
    combos: {
      Employees: TORequestEmployee[];
      PayCodesTO: TORequestPTOCode[];
      PTOResponse: GenericKeyNameObject[];
    };
  };
};

export type RequestRecord = {
  IDNo: number;
  EntityName: string;
  PTOCode: string;
  RequestDT: Date | null;
  DateFrom: Date | null;
  DateTo: Date | null;
  TimeFrom: Date | null;
  TimeTo: Date | null;
  ResponseNotes: string;
  RequestNotes: string;
  ResponseDT: Date | null;
  ResponseCode: number;
  RequestStatus: string;
  EntityID: number;
};

export type TORequestEmployee = {
  IDNo: number;
  EntityName: string;
  Address1: string | null;
  City: string | null;
  State: string | null;
  Zip: string | null;
  MainPhone: string | null;
  EmailMain: string | null;
  PrimaryContact: string | null;
  LocCode: number | null;
  Position: string | null;
  JobTitle: string | null;
  Department: string | null;
  MobilePhone: string | null;
  TermsCodeID: number | null;
  Notes: string | null;
};

export type TORequestPTOCode = {
  PayCode: string;
  PayDesc: string | null;
  PayMethod: string;
  PayRate: number | null;
  // PTOQty: number | null;
  // PTOUnits: number | null;
  // AccrualMethod: string | null;
  // AccrualBegins: string | null;
  // AccrualInterval: string | null;
  // MaxRollover: number | null;
  // AccruePaidYN: boolean | null;
};

type GenericKeyNameObject = { key: string; name: string };
