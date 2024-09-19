export type AllocationItemsAPI = {
  reseller: string;

  company_no: number;
  company_name: string;

  invoices: number;

  items: number;
  new_items: number;

  checked: number;
  allocation1: number;
  allocation2: number;
  verification: number;

  last_allocation: number;
  default_allocation: number;
};

export type AllocationItemsDetailAPI = {
  id: number;

  item_name: string;
  item_name_vi: string;
  item_number: string;
  item_description: string;

  reseller: string;

  account_id: number | null;
  account_no: string | null;
  account_name: string | null;

  system_account_id: number | null;
  system_account_no: string | null;
  system_account_name: string | null;

  status: string;
  allocation_type: string;

  company_no: string;
  company_name: string;

  supplier_no: string;
  supplier_name: string;

  customer_no: string;
  customer_name: string;

  external_id: string;
  external_detail_id: string;
  external_filename: string;

  net: number;
  vat: number;
  tax: number;
  unit: string;
  gross: number;
  currency: string;
  quantity: number;

  score: number;
  is_open: string;
  pdf_url: string;
  image_url: string[];

  invoice_id: number;
  invoice_date: string;
  invoice_number: string;
  invoice_position_id: number;

  folder_date: string;
  created_date: string;
  updated_date: string;
};
