/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import { UsersResponse } from './types';

export const mappingUserResponse = (item: any): UsersResponse => ({
  id: uuidv4(),

  name: `${item.name || ''}`,
  email: `${item.email || ''}`
});

export const mappingUsersResponse = (items: any[]): UsersResponse[] => {
  return items.map((item) => mappingUserResponse(item));
};
