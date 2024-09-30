import { createContext } from 'react';
import { GroupAccountResponse } from '~/main/features/account-settings/group-accounts/types';
import { AllocationItemsDetailResponse } from '~/main/features/allocation/items/types';

export type SelectedContextType = {
  groupAccount: GroupAccountResponse | null;
  setGroupAccount: (groupAccount: GroupAccountResponse | null) => void;

  allocationItem: AllocationItemsDetailResponse | null;
  setAllocationItem: (allocationItem: AllocationItemsDetailResponse | null) => void;
};

export const SelectedContext = createContext<SelectedContextType>({
  groupAccount: null,
  setGroupAccount: () => {},

  allocationItem: null,
  setAllocationItem: () => {}
});

export const SelectedContextProvider = SelectedContext.Provider;
export const SelectedContextConsumer = SelectedContext.Consumer;
