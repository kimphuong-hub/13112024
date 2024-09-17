import { Box, Divider } from '@mui/material';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { isDev } from '~/core/config';
import { commonAction } from '~/redux/common/slice';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import LayoutIcon from '../../Icon';
import UserMenuItem from './MenuItem';
import { MenuStyled } from './styles';
import { AccountingSession } from '~/const/storage';
import { useCookies } from 'react-cookie';

export default function LayoutUser() {
  const { t } = useTranslation();
  const dispatch = useDispatchApp();

  const navigation = useNavigate();
  const [, , removeCookies] = useCookies([AccountingSession]);

  const common = useSelectorApp((state) => state.common);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onOpenMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const onCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onSettings = useCallback(() => {
    navigation('/profile/settings');
    onCloseMenu();
  }, [navigation, onCloseMenu]);

  const onChangePassword = useCallback(() => {
    navigation('/profile/password');
    onCloseMenu();
  }, [navigation, onCloseMenu]);

  const onToggleDarkMode = useCallback(() => {
    dispatch(commonAction.setTheme(common.theme === 'light' ? 'dark' : 'light'));
    onCloseMenu();
  }, [common.theme, dispatch, onCloseMenu]);

  const onLogout = useCallback(() => {
    removeCookies(AccountingSession, { path: '/' });
  }, [removeCookies]);

  return (
    <Box>
      <LayoutIcon icon='fa-solid fa-circle-user' iconSize={35} onClick={onOpenMenu} />
      <MenuStyled open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <UserMenuItem icon='fa-solid fa-gear' title={t('app.navbar.user.menu.settings')} onClick={onSettings} />
        <UserMenuItem
          icon='fa-solid fa-key'
          title={t('app.navbar.user.menu.change-password')}
          onClick={onChangePassword}
        />
        <Divider />
        {isDev && <UserMenuItem icon='fa-solid fa-moon' title='Dark Mode' onClick={onToggleDarkMode} />}
        <UserMenuItem icon='fa-solid fa-bell' title={t('app.navbar.user.menu.notification')} disabled />
        <Divider />
        <UserMenuItem
          icon='fa-solid fa-arrow-right-from-bracket'
          title={t('app.navbar.user.menu.logout')}
          onClick={onLogout}
        />
      </MenuStyled>
    </Box>
  );
}
