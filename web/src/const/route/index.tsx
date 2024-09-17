import { HelpsContactScreen } from '~/main/screens/Helps/Contact';
import { BreadcrumbRoute, MenuRoute } from './types';
import { TFunction } from 'i18next';

export const getMenuRoute = (t: TFunction<'translation', undefined>): MenuRoute[] => [
  {
    id: 'allocation',
    icon: 'fa-solid fa-file-invoice',
    title: t('app.menu.allocation'),
    children: [
      {
        id: 'allocation.items',
        path: '/allocation/items',
        title: t('app.menu.allocation.items')
      },
      {
        id: 'allocation.archives',
        path: '/allocation/archives',
        title: t('app.menu.allocation.archives')
      }
    ]
  },
  {
    id: 'account-settings',
    icon: 'fa-solid fa-book',
    title: t('app.menu.account-settings'),
    children: [
      {
        id: 'account-settings.group-accounts',
        path: '/account-settings/group-accounts',
        title: t('app.menu.account-settings.group-accounts')
      },
      {
        id: 'account-settings.global-accounts',
        path: '/account-settings/global-accounts',
        title: t('app.menu.account-settings.global-accounts')
      }
    ]
  },
  {
    id: 'users',
    icon: 'fa-solid fa-user',
    title: t('app.menu.users'),
    children: [
      {
        id: 'users.roles',
        path: '/users/roles',
        title: t('app.menu.users.roles')
      },
      {
        id: 'users.user-administrator',
        path: '/users/users-administrator',
        title: t('app.menu.users.users-administrator')
      }
    ]
  },
  {
    id: 'administrator',
    icon: 'fa-solid fa-user-tie',
    path: '/administrator',
    title: t('app.menu.administrator')
  },
  {
    id: 'helps',
    icon: 'fa-solid fa-circle-question',
    title: t('app.menu.helps'),
    children: [
      {
        id: 'helps.contact',
        modal: HelpsContactScreen,
        title: t('app.menu.helps.contact')
      },
      {
        id: 'helps.changelog',
        path: '/helps/changelog',
        title: t('app.menu.helps.changelog')
      },
      {
        id: 'helps.about',
        path: '/helps/about',
        title: t('app.menu.helps.about')
      },
      {
        id: 'helps.privacy-policy',
        path: '/helps/privacy-policy',
        title: t('app.menu.helps.privacy-policy')
      },
      {
        id: 'helps.legal-notice',
        path: '/helps/legal-notice',
        title: t('app.menu.helps.legal-notice')
      }
    ]
  }
];

export const getBreadcrumbsRoute = (t: TFunction<'translation', undefined>): BreadcrumbRoute[] => [
  {
    id: 'home',
    path: '/',
    title: t('app.breadcrumb.home')
  },
  {
    id: 'allocation.items',
    path: '/allocation/items',
    title: t('app.breadcrumb.allocation.items')
  },
  {
    id: 'allocation.archives',
    path: '/allocation/archives',
    title: t('app.breadcrumb.allocation.archives')
  },
  {
    id: 'account-settings.group-accounts',
    path: '/account-settings/group-accounts',
    title: t('app.breadcrumb.account-settings.group-accounts')
  },
  {
    id: 'account-settings.global-accounts',
    path: '/account-settings/global-accounts',
    title: t('app.breadcrumb.account-settings.global-accounts')
  },
  {
    id: 'users.users-administrator',
    path: '/users/users-administrator',
    title: t('app.breadcrumb.users.users-administrator')
  },
  {
    id: 'helps',
    path: '/helps',
    title: t('app.breadcrumb.helps'),
    navigate: false
  },
  {
    id: 'helps.contact',
    path: '/helps/contact',
    title: t('app.breadcrumb.helps.contact')
  },
  {
    id: 'helps.changelog',
    path: '/helps/changelog',
    title: t('app.breadcrumb.helps.changelog')
  },
  {
    id: 'helps.about',
    path: '/helps/about',
    title: t('app.breadcrumb.helps.about')
  },
  {
    id: 'helps.privacy-policy',
    path: '/helps/privacy-policy',
    title: t('app.breadcrumb.helps.privacy-policy')
  },
  {
    id: 'helps.legal-notice',
    path: '/helps/legal-notice',
    title: t('app.breadcrumb.helps.legal-notice')
  },
  {
    id: 'search.items',
    path: '/search/items',
    title: t('app.breadcrumb.search.items')
  },
  {
    id: 'profile',
    path: '/profile',
    title: t('app.breadcrumb.profile'),
    navigate: false
  },
  {
    id: 'profile.settings',
    path: '/profile/settings',
    title: t('app.breadcrumb.profile.settings')
  },
  {
    id: 'profile.password',
    path: '/profile/password',
    title: t('app.breadcrumb.profile.change-password')
  }
];
