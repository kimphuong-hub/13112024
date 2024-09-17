export type AccountsChangedType = {
  [companyAccountId: string]: {
    systemAccountNo: string;
    companyAccountNo: string;
  };
};
