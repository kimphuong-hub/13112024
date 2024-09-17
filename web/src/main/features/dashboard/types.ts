export type DashBoardState = {
  itemsTrend: {
    data: ItemTrendResponse[];
    status: 'loading' | 'hasValue' | 'hasError';
  };
  invoicesOverview: {
    data: InvoiceOverviewResponse[];
    status: 'loading' | 'hasValue' | 'hasError';
  };
  invoicesItemsOverview: {
    data: InvoiceItemsOverviewResponse;
    status: 'loading' | 'hasValue' | 'hasError';
  };
};

export type ItemTrendResponse = {
  id: string;
  date: string;
  dayName: string;
  totalItems: number;
};

export type InvoiceOverviewResponse = {
  id: string;
  date: string;
  dayName: string;
  totalDefaultAllocation: number;
  totalInvoices: number;
  totalItems: number;
  totalLastAllocation: number;
  totalNewAllocation: number;
};

export type InvoiceItemsOverviewResponse = {
  over24H: number;
  over48H: number;
  itemsPending: number;
  itemsPendingWarning: number;
  itemsInProcess: number;
  itemsInProcessWarning: number;
  itemsClarification1: number;
  itemsClarification1Warning: number;
  itemsClarification2: number;
  itemsClarification2Warning: number;
  invoicesChecked: number;
  invoicesCheckedWarning: number;
  invoicesPending: number;
  invoicesPendingWarning: number;
  invoicesInProcess: number;
  invoicesInProcessWarning: number;
  invoicesClarification1: number;
  invoicesClarification1Warning: number;
  invoicesClarification2: number;
  invoicesClarification2Warning: number;
};
