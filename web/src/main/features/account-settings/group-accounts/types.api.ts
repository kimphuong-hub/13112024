export type GroupAPI = {
  row_id: number;
  public_id: string;

  name: string;
  site_url: string;

  company_no: number;
  partner_name: string;

  total_account: number;
  total_account_mapped: number;
  total_account_unmapp: number;

  updated_at: string;
};

export type GroupAllAPI = {
  id: string;
  public_id: string;

  name: string;
  company_no: number;
};

export type GroupDetailAPI = {
  id: string;

  company_no: number;

  account_no: string;
  account_name: string;

  system_account_no: string;
  system_account_de: string;
  system_account_en: string;
  system_account_vn: string;
  system_account_ref: string;

  user_name: string;

  status: boolean;
  total_item: number;
  last_allocation: string;
};

export type GroupAccountAPI = {
  id: string;
  company_no: string;
  company_name: string;
  account_no: string;
  account_name: string;
  system_account_no: string;
  system_account_de: string;
  system_account_ref: string;
};
