import { SystemAccountDetailResponse, SystemAccountResponse, SystemCompanyAccountResponse } from './types';
import { SystemAccountAPI, SystemAccountDetailAPI, SystemCompanyGroupAccountAPI } from './types.api';

export const mappingSystemAccountResponse = (item: SystemAccountAPI): SystemAccountResponse => ({
  id: String(item.id),

  isDefault: item.is_default === 1,

  accountNo: String(item.account_no || ''),
  accountType: String(item.account_type || ''),
  accountName: String(item.account_name_de || ''),
  accountNameEN: String(item.account_name_en || ''),
  accountNameVI: String(item.account_name_vn || ''),

  accountDescription: String(item.account_description || ''),
  accountCategory: String(item.account_category || ''),

  children: mappingSystemAccountsResponse(item.children)
});

export const mappingSystemAccountsResponse = (items: SystemAccountAPI[]): SystemAccountResponse[] =>
  items.map((item) => mappingSystemAccountResponse(item));

export const mappingSystemAccountDetailResponse = (item: SystemAccountDetailAPI): SystemAccountDetailResponse => ({
  id: String(item.id),
  accountNo: String(item.account_no || ''),
  accountName: String(item.account_name || ''),

  companyNo: String(item.company_no || ''),
  companyName: String(item.company_name || ''),

  totalItems: String(item.total_item || ''),
  userMapping: String(item.user_name || ''),

  systemAccountRef: String(item.system_account_ref || '')
});

export const mappingSystemAccountDetailsResponse = (items: SystemAccountDetailAPI[]): SystemAccountDetailResponse[] => {
  return items.map((item) => mappingSystemAccountDetailResponse(item));
};

export const mappingSystemCompanyAccountResponse = (
  item: SystemCompanyGroupAccountAPI
): SystemCompanyAccountResponse => ({
  id: String(item.id),

  accountNo: String(item.account_no || ''),
  accountName: String(item.account_name_de || ''),
  accountNameEN: String(item.account_name_en || ''),
  accountNameVI: String(item.account_name_vn || ''),
  accountNoCount: Number(item.account_no_count || '0'),

  isGroupAccount: !item.account_no_count,
  countGroupAccounts: (item.children || []).filter((item) => !item.account_no_count).length,

  children: mappingSystemCompanyAccountsResponse(item.children || [])
});

export const mappingSystemCompanyAccountsResponse = (
  items: SystemCompanyGroupAccountAPI[]
): SystemCompanyAccountResponse[] => {
  return items.map((item) => mappingSystemCompanyAccountResponse(item));
};
