import { GroupAccountResponse, GroupAllResponse, GroupDetailResponse, GroupResponse } from './types';
import { GroupAPI, GroupAccountAPI, GroupAllAPI, GroupDetailAPI } from './types.api';

export const mappingGroupResponse = (item: GroupAPI): GroupResponse => ({
  id: String(item.row_id),
  publicId: String(item.public_id || ''),

  name: String(item.name || ''),

  siteUrl: String(item.site_url || ''),
  companyNo: String(item.company_no || ''),
  partnerName: String(item.partner_name || ''),

  totalAccount: Number(item.total_account || '0'),
  totalAccountMapped: Number(item.total_account_mapped || '0'),
  totalAccountUnMapped: Number(item.total_account_unmapp || '0'),

  updatedAt: String(item.updated_at || '')
});

export const mappingGroupsResponse = (items: GroupAPI[]): GroupResponse[] => {
  return items.map((item) => mappingGroupResponse(item));
};

export const mappingGroupAllResponse = (item: GroupAllAPI): GroupAllResponse => ({
  id: String(item.public_id),
  publicId: String(item.public_id || ''),
  name: String(item.name || ''),
  companyNo: String(item.company_no || '')
});

export const mappingGroupsAllResponse = (items: GroupAllAPI[]): GroupAllResponse[] => {
  return items.map((item) => mappingGroupAllResponse(item));
};

export const mappingGroupDetailResponse = (item: GroupDetailAPI, companyNo: string): GroupDetailResponse => ({
  id: String(item.id),

  companyNo,

  accountNo: String(item.account_no || ''),
  accountName: String(item.account_name || ''),

  systemAccountNo: String(item.system_account_no || ''),
  systemAccountName: String(item.system_account_de || ''),
  systemAccountRef: String(item.system_account_ref || ''),

  userMapping: String(item.user_name || ''),

  status: item.status,
  totalItems: Number(item.total_item || '0'),
  lastAllocation: String(item.last_allocation || '')
});

export const mappingGroupDetailsResponse = (items: GroupDetailAPI[], companyNo: string): GroupDetailResponse[] => {
  return items.map((item) => mappingGroupDetailResponse(item, companyNo));
};

export const mappingGroupAccountResponse = (item: GroupAccountAPI): GroupAccountResponse => ({
  id: String(item.id),

  companyNo: String(item.company_no || ''),
  companyName: String(item.company_name || ''),

  accountNo: String(item.account_no || ''),
  accountName: String(item.account_name || ''),

  systemAccountNo: String(item.system_account_no || ''),
  systemAccountName: String(item.system_account_de || ''),
  systemAccountRef: String(item.system_account_ref || '')
});

export const mappingGroupAccountsResponse = (items: GroupAccountAPI[]): GroupAccountResponse[] => {
  return items.map((item) => mappingGroupAccountResponse(item));
};
