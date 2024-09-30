import { FilterType } from '~/core/types';
import { GroupAccountResponse } from '../../account-settings/group-accounts/types';
import { SystemCompanyAccountResponse } from '../../account-settings/system-accounts/types';

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

  clarification: {
    comments: {
      [invoiceId: string]: {
        data: ClarificationCommentResponse[];
        status: 'loading' | 'hasValue' | 'hasError';
      };
    };
    categories: {
      [type: string]: {
        data: ClarificationCategoryResponse[];
        status: 'loading' | 'hasValue' | 'hasError';
      };
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

  groupAccountOptions: {
    [companyNo: string]: {
      data: GroupAccountResponse[];
      status: 'loading' | 'hasValue' | 'hasError';
    };
  };

  systemCompanyAccountOptions: {
    [companyNo: string]: {
      data: SystemCompanyAccountResponse[];
      status: 'loading' | 'hasValue' | 'hasError';
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
  unsettled: number;
  allocation1: number;
  allocation2: number;
  verification: number;
  clarification1: number;
  clarification2: number;

  lastAllocation: number;
  defaultAllocation: number;
};

export type AllocationItemsDetailResponse = {
  id: string;

  itemName: string;
  itemNameVI: string;
  itemNumber: string;
  itemDescription: string;

  reseller: string;

  accountId: string;
  accountNo: string;
  accountName: string;

  systemAccountId: string;
  systemAccountNo: string;
  systemAccountName: string;

  clarificationDate: string;
  clarificationComment: string;
  clarificationUsername: string;
  clarificationReplyDate: string;
  clarificationReplyComment: string;
  clarificationReplyUsername: string;

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

  invoiceId: number;
  invoiceDate: string;
  invoiceNumber: string;
  invoicePositionId: number;

  folderDate: string;
  createdDate: string;
  updatedDate: string;
};

export type AllocationItemsDetailChanged = {
  id: string;
  invoiceId: number;
  invoicePositionId: number;
  accountId: string;
  accountNo: string;
  systemAccountId: string;
  systemAccountNo: string;
  replyStatus: string;
  replyComment: string;
};

export type SetAllocationItemsDetailPayload = {
  data: {
    id: string;
    referenceIds: string[];
    detail: {
      status?: string;

      accountId?: string;
      accountName?: string;
      accountNo?: string;

      systemAccountId?: string;
      systemAccountName?: string;
      systemAccountNo?: string;
    };
  };
  params: { companyNo: string; status: string };
};

export type AllocationStatusType = 'allocation1' | 'allocation2' | 'verification';

export type ClarificationStatusType = 'clarification1' | 'clarification2';

export type ClarificationCommentResponse = {
  id: string;
  date: string;
  user: string;
  comment: string;
  replyUser: string;
  replyComment: string;
};

export type ClarificationCategoryResponse = {
  id: string;
  name: string;
  type: string;
  isDefault: boolean;
};

export type ReplyClarificationPayload = {
  status: string;
  company_no: string;
  data: {
    id: string;
    invoice_id: number;
    invoice_position_id: number;
    account_id: string;
    account_no: string;
    system_account_id: string | 0;
    system_account_no: string | 0;
    next_status: string;
    reply: string;
  }[];
};

export type CommentClarificationPayload = {
  invoice_account_id: string;
  clarification_category_id: string;
  clarification_comment: string;
  current_status: string;
  next_status: string;
  invoice_account_reference_ids: string[];
  company_no: string;
  invoice_account: {
    invoice_id: number;
    invoice_position_id: number;
    id: string;
    account_id: string;
    account_no: string;
    system_account_id: string;
    system_account_no: string;
  };
};
