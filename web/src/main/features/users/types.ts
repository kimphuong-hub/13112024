import { FilterType } from '~/core/types';

export type UsersState = {
  users: {
    data: { rows: UsersResponse[]; total: number };
    status: 'loading' | 'hasValue' | 'hasError';
  } & FilterType;
};

export type UsersResponse = {
  id: string;

  name: string;
  email: string;
};
