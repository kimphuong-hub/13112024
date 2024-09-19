export type SystemAccountAPI = {
  id: number;
  is_default: 0 | 1;
  account_no: string;
  account_type: string;
  account_name_de: string;
  account_name_en: string;
  account_name_vn: string;
  account_description: string;
  account_category: string;
  children: SystemAccountAPI[];
};

export type SystemAccountDetailAPI = {
  id: number;
  account_no: string;
  account_name: string;
  company_no: string;
  company_name: string;
  user_name: string;
  total_item: number;
  system_account_ref: number;
};

export type SystemCompanyGroupAccountAPI = {
  id: number;
  account_no: string;
  account_no_count?: number;
  account_name_de: string;
  account_name_en: string;
  account_name_vn: string;
  children: SystemCompanyGroupAccountAPI[];
};
