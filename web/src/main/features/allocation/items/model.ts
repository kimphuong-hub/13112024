/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllocationItemsDetailResponse, AllocationItemsResponse } from './types';

export const mappingAllocationItemResponse = (item: any): AllocationItemsResponse => ({
  reseller: `${item.reseller || ''}`,

  companyNo: `${item.company_no || ''}`,
  companyName: `${item.company_name || ''}`,

  invoices: Number(item.invoices),

  items: Number(item.items),
  newItems: Number(item.new_items),

  checked: Number(item.checked),
  inProcess: Number(item.in_process),

  lastAllocation: Number(item.last_allocation),
  defaultAllocation: Number(item.default_allocation)
});

export const mappingAllocationItemsResponse = (items: any[]): AllocationItemsResponse[] => {
  return items.map((item) => mappingAllocationItemResponse(item));
};

export const mappingAllocationItemsDetailResponse = (item: any): AllocationItemsDetailResponse => ({
  id: `${item.id || ''}`,

  itemName: `${item.item_name || ''}`,
  itemNameVI: `${item.item_name_vi || ''}`,
  itemNumber: `${item.item_number || item.item_no || ''}`,
  itemDescription: `${item.item_description || ''}`,

  reseller: `${item.reseller}`,

  accountId: `${item.account_id || ''}`,
  accountNo: `${item.account_no || ''}`,
  accountName: `${item.account_name || ''}`,

  systemAccountId: `${item.system_account_id || ''}`,
  systemAccountNo: `${item.system_account_no || ''}`,
  systemAccountName: `${item.system_account_name || ''}`,

  status: `${item.status || ''}`,
  allocationType: `${item.allocation_type || ''}`,

  companyNo: `${item.company_no || ''}`,
  companyName: `${item.company_name || ''}`,

  supplierNo: `${item.supplier_no}`,
  supplierName: `${item.supplier_name || ''}`,

  customerNo: `${item.customer_no || ''}`,
  customerName: `${item.customer_name || ''}`,

  externalId: `${item.external_id || ''}`,
  externalDetailId: `${item.external_detail_id || ''}`,
  externalFilename: `${item.external_filename || ''}`,
  externalFilenameInvoice: `${item.external_filename_invoice || ''}`,

  net: Number(item.net || '0'),
  vat: Number(item.vat || '0'),
  tax: Number(item.tax || '0'),
  unit: `${item.unit || ''}`,
  gross: Number(item.gross || '0'),
  currency: `${item.currency || ''}`,
  quantity: Number(item.quantity || '0'),

  score: Number(item.score || '0'),
  isOpen: `${item.is_open || ''}`,
  pdfUrl: `${item.pdf_url || ''}`,
  imagesUrl: item.image_url,

  invoiceDate: `${item.invoice_date || ''}`,
  invoiceNumber: `${item.invoice_number || ''}`,

  folderDate: `${item.folder_date || ''}`,
  createdDate: Number(item.created_at || '0'),
  updatedDate: Number(item.updated_at || '0')
});

export const mappingAllocationItemsDetailsResponse = (items: any[]): AllocationItemsDetailResponse[] => {
  return items.map((item) => mappingAllocationItemsDetailResponse(item));
};
