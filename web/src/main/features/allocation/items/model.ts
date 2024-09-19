import { AllocationItemsDetailResponse, AllocationItemsResponse } from './types';
import { AllocationItemsAPI, AllocationItemsDetailAPI } from './types.api';

export const mappingAllocationItemResponse = (item: AllocationItemsAPI): AllocationItemsResponse => ({
  reseller: String(item.reseller || ''),

  companyNo: String(item.company_no || '0'),
  companyName: String(item.company_name || ''),

  invoices: Number(item.invoices || '0'),

  items: Number(item.items || '0'),
  newItems: Number(item.new_items || '0'),

  checked: Number(item.checked || '0'),
  allocation1: Number(item.allocation1 || '0'),
  allocation2: Number(item.allocation2 || '0'),
  verification: Number(item.verification || '0'),

  lastAllocation: Number(item.last_allocation || '0'),
  defaultAllocation: Number(item.default_allocation || '0')
});

export const mappingAllocationItemsResponse = (items: AllocationItemsAPI[]): AllocationItemsResponse[] => {
  return items.map((item) => mappingAllocationItemResponse(item));
};

export const mappingAllocationItemsDetailResponse = (item: AllocationItemsDetailAPI): AllocationItemsDetailResponse => {
  let accountId = String(item.account_id || '');
  let accountNo = String(item.account_no || '');
  let accountName = String(item.account_name || '');

  let systemAccountId = String(item.system_account_id || '');
  let systemAccountNo = String(item.system_account_no || '');
  let systemAccountName = String(item.system_account_name || '');

  // allocation1, allocation2 not show account
  if (['allocation1', 'allocation2'].includes(item.status)) {
    accountId = '';
    accountNo = '';
    accountName = '';

    systemAccountId = '';
    systemAccountNo = '';
    systemAccountName = '';
  }

  return {
    id: String(item.id),

    itemName: String(item.item_name || ''),
    itemNameVI: String(item.item_name_vi || ''),
    itemNumber: String(item.item_number || ''),
    itemDescription: String(item.item_description || ''),

    reseller: String(item.reseller),

    accountId,
    accountNo,
    accountName,

    systemAccountId,
    systemAccountNo,
    systemAccountName,

    status: String(item.status || ''),
    allocationType: String(item.allocation_type || ''),

    companyNo: String(item.company_no || ''),
    companyName: String(item.company_name || ''),

    supplierNo: String(item.supplier_no),
    supplierName: String(item.supplier_name || ''),

    customerNo: String(item.customer_no || ''),
    customerName: String(item.customer_name || ''),

    externalId: String(item.external_id || ''),
    externalDetailId: String(item.external_detail_id || ''),
    externalFilename: String(item.external_filename || ''),

    net: Number(item.net || '0'),
    vat: Number(item.vat || '0'),
    tax: Number(item.tax || '0'),
    unit: String(item.unit || ''),
    gross: Number(item.gross || '0'),
    currency: String(item.currency || ''),
    quantity: Number(item.quantity || '0'),

    score: Number(item.score || '0'),
    isOpen: String(item.is_open || ''),
    pdfUrl: String(item.pdf_url || ''),
    imagesUrl: item.image_url,

    invoiceId: Number(item.invoice_id || '0'),
    invoiceDate: String(item.invoice_date || ''),
    invoiceNumber: String(item.invoice_number || ''),
    invoicePositionId: Number(item.invoice_position_id || '0'),

    folderDate: String(item.folder_date || ''),
    createdDate: String(item.created_date || ''),
    updatedDate: String(item.updated_date || '')
  };
};

export const mappingAllocationItemsDetailsResponse = (
  items: AllocationItemsDetailAPI[]
): AllocationItemsDetailResponse[] => {
  return items.map((item) => mappingAllocationItemsDetailResponse(item));
};
