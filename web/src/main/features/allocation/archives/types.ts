import { FilterType } from '~/core/types';
import { AllocationItemsDetailResponse } from '../items/types';

export type AllocationArchivesState = {
  archives: {
    data: { rows: AllocationArchivesResponse[]; total: number };
    status: 'loading' | 'hasValue' | 'hasError';
  } & FilterType;

  details: {
    [companyNo: string]: {
      data: AllocationItemsDetailResponse[];
      companyNo: string;
      companyName: string;
      status: 'loading' | 'hasValue' | 'hasError';
    };
  };
};

export type AllocationArchivesResponse = {
  reseller: string;

  companyNo: string;
  companyName: string;

  invoices: number;

  items: number;
  newItems: number;

  exported: number;

  lastAllocation: number;
  defaultAllocation: number;
};
