export type ItemsState = {
  history: {
    [companyNo: string]: {
      data: ItemsHistoryResponse[];
      status: 'loading' | 'hasValue' | 'hasError';
    };
  };
};

export type ItemsHistoryResponse = {
  id: string;

  itemName: string;
  companyNo: string;

  allocationType: string;

  accountName: string;
  accountNumber: string;
  accountingDate: string;

  systemAccountName: string;

  score: number;
};
