import React, { Fragment, useCallback, useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getMenuRoute } from '~/const/route';
import { MenuRoute } from '~/const/route/types';
import MenuCollapseBig from './Collapse/Big';
import MenuCollapseSmall from './Collapse/Small';
import MenuListItem from './Item';
import NavLink from '~/base/components/Router/NavLink';
import { useTheme } from '@mui/material';

type Props = {
  openDrawer: boolean;
};

export default function MenuList(props: Props) {
  const { openDrawer } = props;

  const theme = useTheme();
  const { t } = useTranslation();

  const location = useLocation();
  const { pathname } = location;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | number>(0);
  const [collapseId, setCollapseId] = useState<string | number>(0);

  const menuRoute = useMemo(() => getMenuRoute(t), [t]);

  useEffect(() => {
    if (openDrawer) {
      setCollapseId(activeId);
    } else {
      setCollapseId(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDrawer]);

  useEffect(() => {
    setActiveId(0);
    setCollapseId(0);

    // onLoad detect collapse menu
    const menuActive = menuRoute.find((menu) => menu.children?.find((child) => pathname.includes(child.path || '//')));
    if (menuActive) {
      setActiveId(menuActive.id);
      setCollapseId(menuActive.id);
    }
  }, [menuRoute, pathname]);

  const onClickItem = useCallback(
    (menu: MenuRoute, event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
      if (menu.id === collapseId && openDrawer) {
        setCollapseId(0);
        return;
      }
      setCollapseId(menu.id);
    },
    [collapseId, openDrawer]
  );

  const onClickCollapseItem = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const isActiveItem = useCallback(
    (menu: MenuRoute) => {
      if (menu.id === collapseId) {
        return true;
      }
      const menuActive = menu.children?.find((child) => pathname.includes(child.path || '//'));
      if (menuActive && !collapseId) {
        return true;
      }
      return false;
    },
    [collapseId, pathname]
  );

  return (
    <>
      {menuRoute.map((menu) => (
        <Fragment key={menu.id}>
          {menu.path ? (
            <NavLink
              to={menu.path}
              style={{ color: theme.palette.text.primary }}
              className={({ isActive: active }) => (active && collapseId === 0 ? 'active' : '')}
            >
              <MenuListItem
                menu={menu}
                openDrawer={openDrawer}
                collapseId={collapseId}
                onClick={() => setCollapseId(0)}
              />
            </NavLink>
          ) : (
            <MenuListItem
              menu={menu}
              active={isActiveItem(menu)}
              openDrawer={openDrawer}
              collapseId={collapseId}
              onClick={(event) => onClickItem(menu, event)}
            />
          )}
          {openDrawer && <MenuCollapseBig menu={menu} open={menu.id === collapseId} />}
          {!openDrawer && (
            <MenuCollapseSmall
              menu={menu}
              anchorEl={anchorEl}
              open={menu.id === collapseId}
              onClick={onClickCollapseItem}
              onClose={() => {
                setCollapseId(0);
                setAnchorEl(null);
              }}
            />
          )}
        </Fragment>
      ))}
    </>
  );
}
