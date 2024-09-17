import { AppBarProps } from '@mui/material';
import { KeyboardEvent, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Tooltip from '~/base/components/Material/Tooltip';
import LayoutIcon from '../Icon';
import LayoutToolbar from '../Toolbar';
import LayoutUser from './User';
import { AppBar, TypographyTitleStyled } from './styles';
import NavbarSearch from './Search';
import View from '~/base/components/Material/View';
import KeyCode from '~/const/keycode';

type Props = AppBarProps & {
  onClickBars: () => void;
};

export default function LayoutNavbar(props: Props) {
  const { onClickBars, ...restProps } = props;
  const { t } = useTranslation();

  const navigation = useNavigate();

  const textSearchRef = useRef<HTMLInputElement | null>(null);

  const [search, setSearch] = useState('');

  const onHomePage = useCallback(() => {
    navigation('/');
  }, [navigation]);

  const onReloadPage = useCallback(() => {
    navigation(0);
  }, [navigation]);

  const onClickSearch = useCallback(() => {
    if (textSearchRef.current) {
      textSearchRef.current.focus();
    }
  }, []);

  const onKeydownSearch = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === KeyCode.VALUE_ENTER) {
        const queryParams = new URLSearchParams();
        queryParams.append('q', search);

        const queryString = queryParams.toString();

        setSearch('');

        navigation(`/search/items?${queryString}`);
      }
    },
    [navigation, search]
  );

  return (
    <AppBar position='absolute' style={{ height: 61 }} {...restProps}>
      <LayoutToolbar sx={{ pr: '1rem' }}>
        <View flexDirection='row' alignItems='center' flexGrow={1}>
          <Tooltip title={t('app.navbar.button.tooltip.bars')}>
            <LayoutIcon icon='fa-solid fa-bars' onClick={onClickBars} sx={{ mr: '16px' }} />
          </Tooltip>
          <TypographyTitleStyled color='#000000' noWrap>
            {t('app.name')}
          </TypographyTitleStyled>
          <View flexDirection='row' flexGrow={1} gap={3} sx={{ ml: '25px' }}>
            <Tooltip title={t('app.navbar.button.tooltip.home')}>
              <LayoutIcon icon='fa-solid fa-house' onClick={onHomePage} />
            </Tooltip>
            <Tooltip title={t('app.navbar.button.tooltip.reload')}>
              <LayoutIcon icon='fa-solid fa-arrows-rotate' onClick={onReloadPage} />
            </Tooltip>
            <View flexDirection='row' gap={1}>
              <Tooltip title={t('app.navbar.button.tooltip.search')}>
                <LayoutIcon icon='fa-solid fa-search' onClick={onClickSearch} />
              </Tooltip>
              <NavbarSearch
                inputRef={textSearchRef}
                name='search'
                placeholder={t('app.navbar.input.search.placeholder')}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={onKeydownSearch}
                InputProps={{ autoComplete: 'off' }}
              />
            </View>
          </View>
        </View>
        <LayoutUser />
      </LayoutToolbar>
    </AppBar>
  );
}
