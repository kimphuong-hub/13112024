import { FormControl, MenuItem, SelectChangeEvent } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Select from '~/base/components/Material/Form/Select';
import View from '~/base/components/Material/View';
import NavLink from '~/base/components/Router/NavLink';
import { objectToArray } from '~/core/commonFuncs';
import { i18nResources } from '~/core/i18n';
import { commonAction } from '~/redux/common/slice';
import { useDispatchApp, useSelectorApp } from '~/redux/store';

type Props = BoxProps;

const LayoutAuthBody = (props: Props) => {
  const { children } = props;

  const { t } = useTranslation();

  const dispatch = useDispatchApp();
  const common = useSelectorApp((state) => state.common);

  const onChangeLanguage = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const { value } = event.target;
      dispatch(commonAction.setLanguage(value));
    },
    [dispatch]
  );

  return (
    <View
      component='main'
      justifyContent='center'
      alignItems='center'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        backgroundImage: 'url(/images/auth/CISBOX_login_pagebg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <View
        flexDirection='row'
        sx={{
          width: { xs: '95%', lg: '1280px' },
          height: '720px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0.2rem 0.2rem 0.2rem #666666',
          borderRadius: '15px'
        }}
      >
        <View
          justifyContent='center'
          sx={{
            display: { xs: 'none', lg: 'flex' },
            width: '50%',
            boxSizing: 'border-box',
            backgroundColor: '#C8C8C8',
            backgroundImage: 'url(/images/auth/CISBOX_thumbnail_background.png)',
            borderRadius: '15px 0 0 15px'
          }}
        >
          <View flexDirection='row' flexWrap='wrap'>
            <View flexDirection='row' justifyContent='flex-end' width='50%' p='18px' boxSizing='border-box'>
              <NavLink
                to='https://www.cisbox.com/'
                style={{
                  display: 'block',
                  width: '160px',
                  height: '160px',
                  boxShadow: '4px 4px 4px #666666',
                  boxSizing: 'border-box',
                  border: '2px solid #FFFFFF',
                  borderRadius: '7px',
                  backgroundImage: 'url(/images/auth/CISBOX_thumbnail_web.svg)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }}
              />
            </View>
            <View
              flexDirection='row'
              justifyContent='flex-start'
              width='50%'
              p='18px 0 18px 18px'
              boxSizing='border-box'
            >
              <NavLink
                to='https://order-staging.cisbox.com/'
                style={{
                  display: 'block',
                  width: '160px',
                  height: '160px',
                  boxShadow: '4px 4px 4px #666666',
                  boxSizing: 'border-box',
                  border: '2px solid #FFFFFF',
                  borderRadius: '7px',
                  backgroundImage: 'url(/images/auth/CISBOX_thumbnail_order.svg)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }}
              />
            </View>
            <View flexDirection='row' justifyContent='flex-end' width='50%' p='18px' boxSizing='border-box'>
              <NavLink
                to='https://www.linkedin.com/company/cisbox-gmbh/'
                style={{
                  display: 'block',
                  width: '160px',
                  height: '160px',
                  boxShadow: '4px 4px 4px #666666',
                  boxSizing: 'border-box',
                  border: '2px solid #FFFFFF',
                  borderRadius: '7px',
                  backgroundImage: 'url(/images/auth/CISBOX_thumbnail_join.svg)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }}
              />
            </View>
            <View
              flexDirection='row'
              justifyContent='flex-start'
              width='50%'
              p='18px 0 18px 18px'
              boxSizing='border-box'
            >
              <NavLink
                to='https://www.cisbox.com/invoice_app/'
                style={{
                  display: 'block',
                  width: '160px',
                  height: '160px',
                  boxShadow: '4px 4px 4px #666666',
                  boxSizing: 'border-box',
                  border: '2px solid #FFFFFF',
                  borderRadius: '7px',
                  backgroundImage: 'url(/images/auth/CISBOX_thumbnail_app.svg)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }}
              />
            </View>
          </View>
        </View>
        <View
          justifyContent='space-between'
          sx={{
            width: { xs: '100%', lg: '50%' },
            padding: '60px 65px 20px',
            boxSizing: 'border-box'
          }}
        >
          <View flexDirection='row' justifyContent='center'>
            <img src='/images/cisbox_logo.svg' alt='cisbox Accounting' style={{ width: '220px', height: '88px' }} />
          </View>
          <View flexDirection='row' justifyContent='center'>
            {children}
          </View>
          <View alignItems='center' p='2rem'>
            <NavLink to='http://www.cisbox.com/en/impressum' style={{ fontSize: 13, fontWeight: 400 }}>
              {t('app.auth.legal-notice')}
            </NavLink>
            <NavLink to='https://www.cisbox.com/en/datenschutzerklaerung' style={{ fontSize: 13, fontWeight: 400 }}>
              {t('app.auth.privacy-policy')}
            </NavLink>
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
              <Select value={(common.language || '').split('-')[0]} onChange={onChangeLanguage}>
                {objectToArray(i18nResources).map((language: { key: string } & (typeof i18nResources)['en']) => (
                  <MenuItem key={language.key} value={language.key}>
                    {language.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LayoutAuthBody;
