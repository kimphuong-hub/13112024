/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import { ItemsHistoryResponse } from './types';

export const mappingItemsHistoryResponse = (item: any): ItemsHistoryResponse => ({
  id: uuidv4(),

  itemName: `${item.item_name || ''}`,

  companyNo: `${item.company_no || ''}`,

  allocationType: `${item.allocation_type || ''}`,

  accountNumber: `${item.account_number || ''}`,
  accountName: `${item.account_name || ''}`,
  accountingDate: `${item.accounting_date || ''}`,

  systemAccountName: `${item.system_account_name || ''}`,

  score: Number(item.score || '0')
});

export const mappingItemsHistoriesResponse = (items: any[]): ItemsHistoryResponse[] => {
  return items.map((item) => mappingItemsHistoryResponse(item));
};
