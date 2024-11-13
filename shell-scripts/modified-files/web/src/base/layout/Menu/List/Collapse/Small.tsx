import { useTheme } from '@mui/material';
import NavLink from '~/base/components/Router/NavLink';
import { MenuRoute } from '~/const/route/types';
import { MenuItemStyled, MenuStyled } from './styles';
import { Fragment, useState } from 'react';

type Props = {
  menu: MenuRoute;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClick: () => void;
  onClose: () => void;
};

export default function MenuCollapseSmall(props: Props) {
  const { open, menu, anchorEl, onClick, onClose } = props;

  const theme = useTheme();

  if (!anchorEl) {
    return null;
  }

  return (
    <>
      {menu.children && (
        <MenuStyled key={menu.id} anchorEl={anchorEl} open={open} onClose={onClose}>
          {menu.children.map((child) => (
            <Fragment key={child.id}>
              {child.path && !child.modal ? (
                <NavLink
                  key={child.id}
                  to={child.path || '/404'}
                  style={{ color: theme.palette.text.primary }}
                  className={({ isActive: active }) => (active ? 'active' : '')}
                  onClick={onClick}
                >
                  <MenuItemStyled key={child.id} disableRipple>
                    {child.title}
                  </MenuItemStyled>
                </NavLink>
              ) : (
                <MenuCollapseModal {...child} />
              )}
            </Fragment>
          ))}
        </MenuStyled>
      )}
    </>
  );
}

export function MenuCollapseModal(props: MenuRoute) {
  const { id, title, modal: Modal } = props;

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {Modal && <Modal open={openModal} onClose={() => setOpenModal(false)} />}
      <MenuItemStyled key={id} onClick={() => setOpenModal(false)}>
        {title}
      </MenuItemStyled>
    </>
  );
}
