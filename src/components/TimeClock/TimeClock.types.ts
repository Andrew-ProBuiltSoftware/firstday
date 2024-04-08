export interface IRecords {
  ClockDate?: string;
  ClockInTime?: string | null;
  ClockOutTime?: string | null;
  LunchOut?: string | null;
  LunchIn?: string | null;
  BreakOut1?: string | null;
  BreakIn1?: string | null;
}

export interface ITimeClockProps {
  userCreds: {
    email?: string;
    token?: string;
    id?: number;
  };
}

export interface ILoginProps {
  setIsUserLoggedIn: (a: boolean) => void;
  setUserCreds: ({}) => void;
}

export interface ILoginBody {
  email: string;
  password: string;
}
