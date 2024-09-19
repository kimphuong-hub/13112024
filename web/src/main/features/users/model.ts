import { v4 as uuidv4 } from 'uuid';
import { UsersResponse } from './types';
import { UsersAPI } from './types.api';

export const mappingUserResponse = (item: UsersAPI): UsersResponse => ({
  id: uuidv4(),

  name: String(item.name || ''),
  email: String(item.email || '')
});

export const mappingUsersResponse = (items: UsersAPI[]): UsersResponse[] => {
  return items.map((item) => mappingUserResponse(item));
};
