/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllocationArchivesResponse } from './types';

export const mappingAllocationArchiveResponse = (item: any): AllocationArchivesResponse => ({
  reseller: `${item.reseller || ''}`,

  companyNo: `${item.company_no || ''}`,
  companyName: `${item.company_name || ''}`,

  invoices: Number(item.invoices),

  items: Number(item.items),
  newItems: Number(item.new_items),

  checked: Number(item.checked),
  inProcess: Number(item.in_process),
  exported: Number(item.exported),

  lastAllocation: Number(item.last_allocation),
  defaultAllocation: Number(item.default_allocation)
});

export const mappingAllocationArchivesResponse = (items: any[]): AllocationArchivesResponse[] => {
  return items.map((item) => mappingAllocationArchiveResponse(item));
};
