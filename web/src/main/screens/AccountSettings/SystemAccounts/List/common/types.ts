export type AccountsChangedType = {
  [companyAccountId: string]: {
    companyNo: string;
    systemAccountId: string;
    systemAccountNo: string;
    companyAccountNo: string;
  };
};
