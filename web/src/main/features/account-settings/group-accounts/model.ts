/* eslint-disable @typescript-eslint/no-explicit-any */
import { GroupAccountResponse, GroupAllResponse, GroupDetailResponse, GroupResponse } from './types';

export const mappingGroupResponse = (item: any): GroupResponse => ({
  id: `${item.row_id || ''}`,
  publicId: `${item.public_id || ''}`,

  name: `${item.name || ''}`,

  siteUrl: `${item.site_url || ''}`,
  companyNo: `${item.company_no || ''}`,
  partnerName: `${item.partner_name || ''}`,

  totalAccount: Number(item.total_account || '0'),
  totalAccountMapped: Number(item.total_account_mapped || '0'),
  totalAccountUnMapped: Number(item.total_account_unmapp || '0'),

  updatedAt: `${item.updated_at || ''}`
});

export const mappingGroupsResponse = (items: any[]): GroupResponse[] => {
  return items.map((item) => mappingGroupResponse(item));
};

export const mappingGroupAllResponse = (item: any): GroupAllResponse => ({
  id: `${item.public_id || ''}`,
  publicId: `${item.public_id || ''}`,

  name: `${item.name || ''}`,
  companyNo: `${item.company_no || ''}`
});

export const mappingGroupsAllResponse = (items: any[]): GroupAllResponse[] => {
  return items.map((item) => mappingGroupAllResponse(item));
};

export const mappingGroupDetailResponse = (item: any, companyNo: string): GroupDetailResponse => ({
  id: `${item.id}`,

  companyNo,

  accountNo: `${item.account_no || ''}`,
  accountName: `${item.account_name || ''}`,

  systemAccountNo: `${item.system_account_no || ''}`,
  systemAccountName: `${item.system_account_de || ''}`,
  systemAccountRef: `${item.system_account_ref || ''}`,

  userMapping: `${item.user_name || ''}`,

  status: item.status,
  totalItems: Number(item.total_item || '0'),
  lastAllocation: `${item.last_allocation || ''}`
});

export const mappingGroupDetailsResponse = (items: any[], companyNo: string): GroupDetailResponse[] => {
  return items.map((item) => mappingGroupDetailResponse(item, companyNo));
};

export const mappingGroupAccountResponse = (item: any): GroupAccountResponse => ({
  id: `${item.id || ''}`,

  companyNo: `${item.company_no || ''}`,
  companyName: `${item.company_name || ''}`,

  accountNo: `${item.account_no || ''}`,
  accountName: `${item.account_name || ''}`,

  systemAccountNo: `${item.system_account_no || ''}`,
  systemAccountName: `${item.system_account_de || ''}`,
  systemAccountRef: `${item.system_account_ref || ''}`
});

export const mappingGroupAccountsResponse = (items: any[]): GroupAccountResponse[] => {
  return items.map((item) => mappingGroupAccountResponse(item));
};
