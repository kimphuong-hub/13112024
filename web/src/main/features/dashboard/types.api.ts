export type ItemTrendAPI = {
  id: string;
  date: string;
  day_name: string;
  total_items: number;
};

export type InvoiceOverviewAPI = {
  id: string;
  date: string;
  day_name: string;
  total_default_allocation: number;
  total_invoices: number;
  total_items: number;
  total_last_allocation: number;
  total_new_allocation: number;
};

export type InvoiceItemsOverviewAPI = {
  over_24h: number;
  over_48h: number;
  items_pending: number;
  items_pending_warning: number;
  items_in_process: number;
  items_in_process_warning: number;
  items_clarification1: number;
  items_clarification1_warning: number;
  items_clarification2: number;
  items_clarification2_warning: number;
  invoices_checked: number;
  invoices_checked_warning: number;
  invoices_pending: number;
  invoices_pending_warning: number;
  invoices_in_process: number;
  invoices_in_process_warning: number;
  invoices_clarification1: number;
  invoices_clarification1_warning: number;
  invoices_clarification2: number;
  invoices_clarification2_warning: number;
};
