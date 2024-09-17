import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import NavLink from '~/base/components/Router/NavLink';

export const TabUsers = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <View flexDirection='row' justifyContent='space-between' alignItems='center'>
      <NavLink to='/profile/settings'>
        <Typography color={theme.palette.text.primary}>
          <FontAwesomeIcon icon='fa-solid fa-gear' style={{ marginRight: 5 }} />
          {t('app.home.users.settings.button')}
        </Typography>
      </NavLink>
    </View>
  );
};
