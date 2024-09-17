import { Box, Divider, Skeleton, Theme, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import MuiBox, { BoxProps } from '@mui/material/Box';
import MuiBreadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import NavLink from '~/base/components/Router/NavLink';
import { getBreadcrumbsRoute } from '~/const/route';
import { BreadcrumbRoute } from '~/const/route/types';

const BoxWrapper = styled((props: BoxProps) => (
  <MuiBox component='div' display='flex' flexDirection='column' gap={2} {...props} />
))(({ theme }) => ({
  position: 'sticky',
  top: '61px',
  left: 0,
  padding: '10px 20px',
  boxShadow: '0 1px 1px -1px rgb(0 0 0 / 34%), 0 0 6px 0 rgb(0 0 0 / 14%)',
  backgroundColor: theme.palette.background.default,
  borderRadius: 0,
  zIndex: 100
}));

const Breadcrumbs = styled(MuiBreadcrumbs)(() => ({
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'flex-end'
  },
  [`& .${breadcrumbsClasses.li}`]: {
    fontSize: 15
  },
  [`& .${breadcrumbsClasses.separator}`]: {
    fontSize: 13,
    marginLeft: 15,
    marginRight: 15
  }
}));

type Props = BoxProps & {
  title?: string;
  loading?: boolean;
  lastItems?: BreadcrumbRoute[];
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  bottomComponent?: React.ReactNode;
};

export default function LayoutBreadcrumbs(props: Props) {
  const { title, loading, lastItems, leftComponent, rightComponent, bottomComponent, ...restProps } = props;

  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const theme = useTheme();

  const { t } = useTranslation();

  const { pathname } = useLocation();

  const breadcrumbsRoute = useMemo(() => getBreadcrumbsRoute(t), [t]);

  const breadcrumbs = useMemo(
    () =>
      [
        ...breadcrumbsRoute.filter((breadcrumb) => breadcrumb.path !== '/' && pathname.includes(breadcrumb.path || '')),
        ...(lastItems || [])
      ].map((breadcrumb) => {
        const { navigate = true } = breadcrumb;
        breadcrumb.navigate = navigate;
        return breadcrumb;
      }),
    [breadcrumbsRoute, lastItems, pathname]
  );

  return (
    <BoxWrapper {...restProps}>
      <Box display='flex' justifyContent='space-between' gap={2} minHeight='30px'>
        <Box display='flex' alignItems='flex-end' gap={2} paddingBottom='3px'>
          {isMd && (
            <NavLink to='/'>
              <Typography
                variant='h5'
                style={{ color: theme.palette.text.secondary }}
                fontSize={20}
                lineHeight='20px'
                fontWeight={100}
              >
                {title || 'Accounting'}
              </Typography>
            </NavLink>
          )}
          {isMd && pathname !== '/' ? <Divider orientation='vertical' flexItem /> : null}
          {leftComponent}
          {!leftComponent && (
            <Box display='flex' alignItems='flex-end'>
              <Breadcrumbs>
                {pathname !== '/' && (
                  <NavLink to='/' style={{ display: 'block', marginBottom: 1 }}>
                    <FontAwesomeIcon icon='fa-solid fa-home' color={theme.palette.text.secondary} size={14} />
                  </NavLink>
                )}
                {breadcrumbs.map((breadcrumb) => (
                  <Box key={breadcrumb.id}>
                    {loading && <Skeleton width='70px' variant='text' sx={{ fontSize: 14 }} />}
                    {!loading && breadcrumb.navigate && (
                      <NavLink to={breadcrumb.path || ''} style={{ color: theme.palette.text.secondary, fontSize: 13 }}>
                        {breadcrumb.title}
                      </NavLink>
                    )}
                    {!loading && !breadcrumb.navigate && (
                      <Typography style={{ color: theme.palette.text.secondary, fontSize: 13 }}>
                        {breadcrumb.title}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Breadcrumbs>
            </Box>
          )}
        </Box>
        <Box display='flex' gap={2}>
          {rightComponent}
        </Box>
      </Box>
      {bottomComponent && <Box>{bottomComponent}</Box>}
    </BoxWrapper>
  );
}
