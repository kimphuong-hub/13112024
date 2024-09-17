/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvoiceItemsOverviewResponse, InvoiceOverviewResponse, ItemTrendResponse } from './types';
import { v4 as uuidv4 } from 'uuid';

export const mappingItemTrendResponse = (item: any): ItemTrendResponse => ({
  id: uuidv4(),
  date: `${item.date || ''}`,
  dayName: `${item.day_name || ''}`,
  totalItems: Number(item.total_items || '0')
});

export const mappingItemsTrendResponse = (items: any[]): ItemTrendResponse[] => {
  return items.map((item) => mappingItemTrendResponse(item));
};

export const mappingInvoiceOverviewResponse = (item: any): InvoiceOverviewResponse => ({
  id: uuidv4(),
  date: `${item.date || ''}`,
  dayName: `${item.day_name || ''}`,
  totalDefaultAllocation: Number(item.total_default_allocation || '0'),
  totalInvoices: Number(item.total_invoices || '0'),
  totalItems: Number(item.total_items || '0'),
  totalLastAllocation: Number(item.total_last_allocation || '0'),
  totalNewAllocation: Number(item.total_new_allocation || '0')
});

export const mappingInvoicesOverviewResponse = (items: any[]): InvoiceOverviewResponse[] => {
  return items.map((item) => mappingInvoiceOverviewResponse(item));
};

export const mappingInvoiceItemsOverviewResponse = (item: any): InvoiceItemsOverviewResponse => ({
  over24H: Number(item.over_24h || '0'),
  over48H: Number(item.over_48h || '0'),
  itemsPending: Number(item.items_pending || '0'),
  itemsPendingWarning: Number(item.items_pending_warning || '0'),
  itemsInProcess: Number(item.items_in_process || '0'),
  itemsInProcessWarning: Number(item.items_in_process_warning || '0'),
  itemsClarification1: Number(item.items_clarification1 || '0'),
  itemsClarification1Warning: Number(item.items_clarification1_warning || '0'),
  itemsClarification2: Number(item.items_clarification2 || '0'),
  itemsClarification2Warning: Number(item.items_clarification2_warning || '0'),
  invoicesChecked: Number(item.invoices_checked || '0'),
  invoicesCheckedWarning: Number(item.invoices_checked_warning || '0'),
  invoicesPending: Number(item.invoices_pending || '0'),
  invoicesPendingWarning: Number(item.invoices_pending_warning || '0'),
  invoicesInProcess: Number(item.invoices_in_process || '0'),
  invoicesInProcessWarning: Number(item.invoices_in_process_warning || '0'),
  invoicesClarification1: Number(item.invoices_clarification1 || '0'),
  invoicesClarification1Warning: Number(item.invoices_clarification1_warning || '0'),
  invoicesClarification2: Number(item.invoices_clarification2 || '0'),
  invoicesClarification2Warning: Number(item.invoices_clarification2_warning || '0')
});
