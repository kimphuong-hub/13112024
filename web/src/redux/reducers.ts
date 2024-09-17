import { combineReducers } from '@reduxjs/toolkit';
import groupAccountsReducer from '~/main/features/account-settings/group-accounts/slice';
import systemAccountsReducer from '~/main/features/account-settings/system-accounts/slice';
import allocationArchivesReducer from '~/main/features/allocation/archives/slice';
import allocationItemsReducer from '~/main/features/allocation/items/slice';
import authReducer from '~/main/features/auth/slice';
import dashboardReducer from '~/main/features/dashboard/slice';
import itemsReducer from '~/main/features/items/slice';
import usersReducer from '~/main/features/users/slice';
import commonReducer from './common/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  dashboard: dashboardReducer,
  users: usersReducer,
  items: itemsReducer,
  allocation: combineReducers({
    archives: allocationArchivesReducer,
    items: allocationItemsReducer
  }),
  accountSettings: combineReducers({
    groupAccounts: groupAccountsReducer,
    systemAccounts: systemAccountsReducer
  })
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
