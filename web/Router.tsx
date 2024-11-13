import { lazy } from 'react';
import { RouterProvider as RouterProviderDefault, createBrowserRouter } from 'react-router-dom';
import AppError from '~/base/Error';
import LayoutAuthError from '~/base/auth/Error';
import LayoutError from '~/base/layout/Error';
import PermissionRoleScreen from '~/main/screens/Users/Security/PermissionRole/List';
const Layout = lazy(() => import('./src/base/layout'));
const LayoutNotFound = lazy(() => import('~/base/layout/NotFound'));

const LayoutAuth = lazy(() => import('~/base/auth'));

const HomeScreen = lazy(() => import('~/main/screens/Home'));

const AuthScreen = lazy(() => import('~/main/screens/Auth/AuthScreen'));
const AuthLoginScreen = lazy(() => import('~/main/screens/Auth/Login'));
const AuthRequestPasswordScreen = lazy(() => import('~/main/screens/Auth/RequestPassword'));
const AuthResetPasswordScreen = lazy(() => import('~/main/screens/Auth/ResetPassword'));

const AllocationItemsListScreen = lazy(() => import('~/main/screens/Allocation/Items/List'));
const AllocationItemsUpdateScreen = lazy(() => import('~/main/screens/Allocation/Items/Update'));
const AllocationArchivesListScreen = lazy(() => import('./src/main/screens/Allocation/Archives/List'));

const AccountSettingsGroupAccountsListScreen = lazy(() => import('~/main/screens/AccountSettings/GroupAccounts/List'));
const AccountSettingsGroupAccountsUpdateScreen = lazy(
  () => import('~/main/screens/AccountSettings/GroupAccounts/Update')
);
const AccountSettingsSystemAccountsListScreen = lazy(
  () => import('~/main/screens/AccountSettings/SystemAccounts/List')
);
const UsersRolesScreen = lazy(() => import('~/main/screens/Users/Roles/List'));
const SecurityroleUserScreen = lazy(() => import('~/main/screens/Users/Security'));

const UsersScreen = lazy(() => import('~/main/screens/Users/Users/List'));
const UsersNewUsersScreen = lazy(() => import('~/main/screens/Users/Users/NewUsers'));
const EditUserScreen = lazy(() => import('~/main/screens/Users/Users/Edit'));

const UsersUsersAdministratorScreen = lazy(() => import('~/main/screens/Users/UsersAdministrator/List'));

const HelpsAboutScreen = lazy(() => import('~/main/screens/Helps/About'));
const HelpsChangelogScreen = lazy(() => import('~/main/screens/Helps/Changelog'));
const HelpsLegalNoticeScreen = lazy(() => import('~/main/screens/Helps/LegalNotice'));
const HelpsPrivacyPolicyScreen = lazy(() => import('~/main/screens/Helps/PrivacyPolicy'));

const SearchItemsHistoryScreen = lazy(() => import('~/main/screens/Search/Items/History'));

const ProfileSettingsScreen = lazy(() => import('~/main/screens/Profile/Settings'));
const ProfileChangePasswordScreen = lazy(() => import('~/main/screens/Profile/ChangePassword'));

const router = createBrowserRouter([
  {
    errorElement: <AppError />,
    children: [
      {
        path: '/',
        element: <Layout />,
        errorElement: <Layout outlet={<LayoutError />} />,
        children: [
          {
            path: '',
            element: <HomeScreen />
          },
          {
            path: '*',
            element: <LayoutNotFound />
          },
          {
            path: 'allocation',
            children: [
              {
                path: 'items',
                children: [
                  {
                    path: '',
                    element: <AllocationItemsListScreen />
                  },
                  {
                    path: 'update/:companyNo',
                    element: <AllocationItemsUpdateScreen />
                  }
                ]
              },
              {
                path: 'archives',
                children: [
                  {
                    path: '',
                    element: <AllocationArchivesListScreen />
                  },
                  {
                    path: 'update/:companyNo',
                    element: <AllocationItemsUpdateScreen type='archives' />
                  }
                ]
              }
            ]
          },
          {
            path: 'account-settings',
            children: [
              {
                path: 'group-accounts',
                children: [
                  {
                    path: '',
                    element: <AccountSettingsGroupAccountsListScreen />
                  },
                  {
                    path: 'update/:publicId',
                    element: <AccountSettingsGroupAccountsUpdateScreen />
                  }
                ]
              },
              {
                path: 'global-accounts',
                element: <AccountSettingsSystemAccountsListScreen />
              }
            ]
          },
          {
            path: 'users',
            children: [
              {
                path: 'users',
                children: [
                  {
                    path: '',
                    element: <UsersScreen />
                  },
                  {
                    path: 'newusers',
                    element: <UsersNewUsersScreen />
                  },  
                  {
                    path: 'editusers/:id',
                    element: <EditUserScreen />
                  }      
               
                ]
                
              },
              {
                path: 'securityrole',
                children: [
                  {
                    path: '',
                    element: <SecurityroleUserScreen />
                  },
                  {
                    path: 'permissionrole',
                    element: <PermissionRoleScreen />
                  } 
                ]
                
              },
              
           
              {
                path: 'users-administrator',
                element: <UsersUsersAdministratorScreen />
              },
              {
                path: 'roles',
                element: <UsersRolesScreen />
              },  
              
            
            ]
          },
          {
            path: 'helps',
            children: [
              {
                path: 'changelog',
                element: <HelpsChangelogScreen />
              },
              {
                path: 'about',
                element: <HelpsAboutScreen />
              },
              {
                path: 'privacy-policy',
                element: <HelpsPrivacyPolicyScreen />
              },
              {
                path: 'legal-notice',
                element: <HelpsLegalNoticeScreen />
              }
            ]
          },
          {
            path: 'search',
            children: [
              {
                path: 'items',
                element: <SearchItemsHistoryScreen />
              }
            ]
          },
          {
            path: 'profile',
            children: [
              {
                path: 'settings',
                element: <ProfileSettingsScreen />
              },
              {
                path: 'password',
                element: <ProfileChangePasswordScreen />
              }
            ]
          }
        ]
      },
      {
        path: 'auth',
        element: <LayoutAuth />,
        errorElement: <LayoutAuth outlet={<LayoutAuthError />} />,
        children: [
          {
            path: '',
            element: <AuthScreen />
          },
          {
            path: 'login',
            element: <AuthLoginScreen />
          },
          {
            path: 'request-password',
            element: <AuthRequestPasswordScreen />
          },
          {
            path: 'reset-password',
            element: <AuthResetPasswordScreen />
          }
        ]
      }
    ]
  }
]);

export default function RouterProvider() {
  return <RouterProviderDefault router={router} />;
}
