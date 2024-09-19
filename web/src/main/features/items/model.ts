import { v4 as uuidv4 } from 'uuid';
import { ItemsHistoryResponse } from './types';
import { ItemsHistoryAPI } from './types.api';

export const mappingItemsHistoryResponse = (item: ItemsHistoryAPI): ItemsHistoryResponse => ({
  id: uuidv4(),

  itemName: String(item.item_name || ''),

  companyNo: String(item.company_no || ''),

  allocationType: String(item.allocation_type || ''),

  accountNumber: String(item.account_number || ''),
  accountName: String(item.account_name || ''),
  accountingDate: String(item.accounting_date || ''),

  systemAccountName: String(item.system_account_name || ''),

  score: Number(item.score || '0')
});

export const mappingItemsHistoriesResponse = (items: ItemsHistoryAPI[]): ItemsHistoryResponse[] => {
  return items.map((item) => mappingItemsHistoryResponse(item));
};
