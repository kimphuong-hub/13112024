import { FilterType } from '~/core/types';
import { SystemAccountResponse } from '../system-accounts/types';

export type GroupsState = {
  groups: {
    data: { rows: GroupResponse[]; total: number };
    status: 'loading' | 'hasValue' | 'hasError';
  } & FilterType;
  details: {
    [publicId: string]: {
      data: GroupDetailResponse[];
      companyNo: string;
      companyName: string;
      status: 'loading' | 'hasValue' | 'hasError';
    };
  };
  systemAccounts: {
    data: SystemAccountResponse[];
    status: 'loading' | 'hasValue' | 'hasError';
  };
  groupsSelector: {
    data: GroupAllResponse[];
    status: 'loading' | 'hasValue' | 'hasError';
  };
  allocationItemsDrawer: GroupDetailResponse | null;
};

export type GroupResponse = {
  id: string;
  publicId: string;

  name: string;

  siteUrl: string;
  companyNo: string;
  partnerName: string;

  totalAccount: number;
  totalAccountMapped: number;
  totalAccountUnMapped: number;

  updatedAt: string;
};

export type GroupAllResponse = {
  id: string;
  publicId: string;

  name: string;
  companyNo: string;
};

export type GroupDetailResponse = {
  id: string;

  companyNo: string;

  accountNo: string;
  accountName: string;

  systemAccountNo: string;
  systemAccountName: string;
  systemAccountRef: string;

  userMapping: string;

  status: boolean;
  totalItems: number;
  lastAllocation: string;
};

export type GroupAccountResponse = {
  id: string;
  companyNo: string;
  companyName: string;
  accountNo: string;
  accountName: string;
  systemAccountNo: string;
  systemAccountName: string;
  systemAccountRef: string;
};

export type SetGroupDetailPayload = {
  publicId: string;
  systemAccountId?: string;
  companyAccountId: string;
};
