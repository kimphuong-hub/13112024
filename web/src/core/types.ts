import { GridFilterItem, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';

export type FilterType = {
  sort?: GridSortModel | null;
  filter?: GridFilterItem[];
  pagination?: GridPaginationModel | null;
  search?: string;
};

export type RichTreeItemsType = {
  id: string;
  label: string;
  children: RichTreeItemsType[];
};
