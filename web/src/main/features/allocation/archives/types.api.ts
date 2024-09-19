export type AllocationArchivesAPI = {
  reseller: string;

  company_no: number;
  company_name: string;

  invoices: number;

  items: number;
  new_items: number;

  exported: number;

  last_allocation: number;
  default_allocation: number;
};
