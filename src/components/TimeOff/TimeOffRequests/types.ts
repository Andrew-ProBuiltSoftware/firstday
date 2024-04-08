export type RequestRecord = {
  IDNo: number;
  EntityID?: number;
  RequestDT?: string;
  DateFrom?: string;
  DateTo?: string;
  TimeFrom?: string;
  TimeTo?: string;
  RequestStatus?: string;
  DateRange: string;
  TimeRange: string;
  PTOCode: string;
};
export type PayRunsListType = {
  IDNo: string | number;
  PayRunId: number;
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

export interface PayRunData {
  combos: {
    PayGroups: PayGroup[];
  };
  mainRecord: MainRecord;
  subRecords: SubRecord[];
}

export interface MainRecord {
  IDNo: number;
  PayRunID: number;
  PayGroupCode: string;
  PayFrequency: string;
  PayRunDate: string;
  PeriodStart: string;
  PeriodEnd: string;
  PayDate: string;
  QuantityPaid: number;
  GrossPay: number;
  NetPay: number;
  EmployerPaid: number;
  CompletedYN: boolean;
  PersInSelGroup: number;
  PersAddedToPayRun: number;
  NextPayDT: string;
  NextPayStartDT: string;
  NextPayEndDT: string;
  LastPayDT: string;
  LastPayStartDT: string;
  LastPayEndDT: string;
  PersOnLastPayRun: number;
}

export interface SubRecord {
  IDNo: number;
  EntityType: string;
  EntityName: string;
  LastName: string;
  FirstName: string;
  MiddleName: string;
  Department: string;
  JobTitle: string | null;
}

export interface PayGroup {
  PayGroupCode: string;
  PayGroupDesc: string;
}

export interface HolidaysList {
  IDNo: number;
  Company_ID?: number;
  HolidayName?: string;
  SystemYN?: boolean;
  Month?: number;
  DateOfMonth?: number;
  DayOfMonth?: string;
  WeekOfMonth?: string;
}

export interface FilteredHoliday {
  HolidayName?: string;
  Date?: string;
}

export interface RequestsCalendarData {
  Description: string | undefined;
  End: string;
  EndTimeZone: null;
  OwnerID: number | undefined;
  Start: string;
  StartTimeZone: null;
  TaskID: number;
  Title: string;
  id: number;
}

export interface IHolidays {
  DateOfMonth: number | null;
  DayOfWeek: string;
  IDNo: number;
  Month: number;
  PayCode: string;
  PayDesc: string;
  SystenYN: boolean;
  WeekOfMonth: string;
}
