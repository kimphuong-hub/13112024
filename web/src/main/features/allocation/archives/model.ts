import { AllocationArchivesResponse } from './types';
import { AllocationArchivesAPI } from './types.api';

export const mappingAllocationArchiveResponse = (item: AllocationArchivesAPI): AllocationArchivesResponse => ({
  reseller: String(item.reseller || ''),

  companyNo: String(item.company_no || ''),
  companyName: String(item.company_name || ''),

  invoices: Number(item.invoices || '0'),

  items: Number(item.items || '0'),
  newItems: Number(item.new_items || '0'),

  exported: Number(item.exported || '0'),

  lastAllocation: Number(item.last_allocation || '0'),
  defaultAllocation: Number(item.default_allocation || '0')
});

export const mappingAllocationArchivesResponse = (items: AllocationArchivesAPI[]): AllocationArchivesResponse[] => {
  return items.map((item) => mappingAllocationArchiveResponse(item));
};
