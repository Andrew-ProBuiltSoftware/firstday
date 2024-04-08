export type UserCreds = {
  token?: string;
  id?: number;
  email?: string;
};

export type IContextProvider = {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (state: boolean) => void;
  userCreds: UserCreds;
  setUserCreds: (state: UserCreds) => void;
  onOpenForm: () => void;
};
