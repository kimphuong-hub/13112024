import { i18nResources } from '~/core/i18n';

export type CommonState = {
  theme: 'dark' | 'light' | null;
  language: keyof typeof i18nResources | null;
  status: 'loading' | 'hasValue' | 'hasError';
};
