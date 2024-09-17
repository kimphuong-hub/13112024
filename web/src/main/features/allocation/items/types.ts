import { FilterType } from '~/core/types';
import { GroupAccountResponse } from '../../account-settings/group-accounts/types';
import { SystemAccountResponse } from '../../account-settings/system-accounts/types';

export type AllocationItemsState = {
  items: {
    data: { rows: AllocationItemsResponse[]; total: number };
    status: 'loading' | 'hasValue' | 'hasError';
  } & FilterType;

  details: {
    [companyNo: string]: {
      [status: string]: {
        data: AllocationItemsDetailResponse[];
        companyNo: string;
        companyName: string;
        status: 'loading' | 'hasValue' | 'hasError';
      };
    };
  };

  groupAccountOptions: {
    [companyNo: string]: {
      data: GroupAccountResponse[];
      status: 'loading' | 'hasValue' | 'hasError';
    };
  };

  systemAccountOptions: {
    [companyNo: string]: {
      data: SystemAccountResponse[];
      status: 'loading' | 'hasValue' | 'hasError';
    };
  };

  groupAccountDrawer: {
    items: {
      [companyNo: string]: {
        [accountNo: string]: {
          data: AllocationItemsDetailResponse[];
          status: 'loading' | 'hasValue' | 'hasError';
        };
      };
    };
    accounts: {
      [companyNo: string]: {
        data: GroupAccountResponse[];
        status: 'loading' | 'hasValue' | 'hasError';
      };
    };
  };
};

export type AllocationItemsResponse = {
  reseller: string;

  companyNo: string;
  companyName: string;

  invoices: number;

  items: number;
  newItems: number;

  checked: number;
  inProcess: number;

  lastAllocation: number;
  defaultAllocation: number;
};

export type AllocationItemsDetailChanged = {
  id?: string;
  accountId?: string;
  accountNo?: string;
  systemAccountId?: string | null;
  systemAccountNo?: string | null;
};

export type AllocationItemsDetailResponse = {
  id: string;

  itemName: string;
  itemNameVI: string;
  itemNumber: string;
  itemDescription: string;

  reseller: string;

  accountId: string | null;
  accountNo: string | null;
  accountName: string | null;

  systemAccountId: string | null;
  systemAccountNo: string | null;
  systemAccountName: string | null;

  status: string;
  allocationType: string;

  companyNo: string;
  companyName: string;

  supplierNo: string;
  supplierName: string;

  customerNo: string;
  customerName: string;

  externalId: string;
  externalDetailId: string;
  externalFilename: string;
  externalFilenameInvoice: string;

  net: number;
  vat: number;
  tax: number;
  unit: string;
  gross: number;
  currency: string;
  quantity: number;

  score: number;
  isOpen: string;
  pdfUrl: string;
  imagesUrl: string[];

  invoiceDate: string;
  invoiceNumber: string;

  folderDate: string;
  createdDate: number;
  updatedDate: number;
};

export type SetAllocationItemsDetailPayload = {
  data: {
    id: string;
    details: {
      status?: string;

      accountId?: string | null;
      accountName?: string | null;
      accountNo?: string | null;

      systemAccountId?: string | null;
      systemAccountName?: string | null;
      systemAccountNo?: string | null;
    };
  };
  params: { companyNo: string; status: string };
};
