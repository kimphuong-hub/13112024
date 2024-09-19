export type SystemAccountsState = {
  system: {
    data: SystemAccountResponse[];
    status: 'loading' | 'hasValue' | 'hasError';
  };
  details: {
    [accountId: string]: {
      data: SystemAccountDetailResponse[];
      status: 'loading' | 'hasValue' | 'hasError';
    };
  };
};

export type SystemAccountResponse = {
  id: string;
  isDefault: boolean;

  accountNo: string;
  accountType: string;
  accountName: string;
  accountNameEN: string;
  accountNameVI: string;

  accountDescription: string;
  accountCategory: string;

  children: SystemAccountResponse[];
};

export type SystemAccountDetailResponse = {
  id: string;

  accountNo: string;
  accountName: string;

  companyNo: string;
  companyName: string;

  totalItems: string;
  userMapping: string;

  systemAccountRef: string;
};

export type SystemCompanyAccountResponse = {
  id: string;

  accountNo: string;
  accountName: string;
  accountNameEN: string;
  accountNameVI: string;
  accountNoCount: number;

  isGroupAccount: boolean;
  isContainGroupAccount: boolean;

  children: SystemCompanyAccountResponse[];
};
