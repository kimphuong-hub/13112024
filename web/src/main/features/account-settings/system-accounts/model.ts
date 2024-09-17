/* eslint-disable @typescript-eslint/no-explicit-any */
import { SystemAccountDetailResponse, SystemAccountResponse } from './types';

export const mappingSystemAccountResponse = (item: any): SystemAccountResponse => ({
  id: `${item.id}`,
  isDefault: item.is_default === 1,
  accountNo: `${item.account_no || ''}`,
  accountType: `${item.account_type || ''}`,
  accountName: `${item.account_name_de || ''}`,
  accountNameEN: `${item.account_name_en || ''}`,
  accountNameVI: `${item.account_name_vn || ''}`,
  accountDescription: `${item.account_description || ''}`,
  accountCategory: `${item.account_category || ''}`,
  accountNoCount: Number(item.account_no_count || ''),
  children: mappingSystemAccountsResponse(item.children)
});

export const mappingSystemAccountsResponse = (items: any[]): SystemAccountResponse[] =>
  items?.map((item) => mappingSystemAccountResponse(item));

export const mappingSystemAccountDetailResponse = (item: any): SystemAccountDetailResponse => ({
  id: `${item.id}`,
  accountNo: `${item.account_no || ''}`,
  accountName: `${item.account_name || ''}`,
  companyNo: `${item.company_no || ''}`,
  companyName: `${item.company_name || ''}`,
  userMapping: `${item.user_name || ''}`,
  totalItems: `${item.total_item || ''}`,
  systemAccountRef: `${item.system_account_ref || ''}`
});

export const mappingSystemAccountDetailsResponse = (items: any[]): SystemAccountDetailResponse[] =>
  items.map((item) => mappingSystemAccountDetailResponse(item));
