import { Collapse, List, useTheme } from '@mui/material';
import { Fragment, useState } from 'react';
import NavLink from '~/base/components/Router/NavLink';
import { MenuRoute } from '~/const/route/types';
import { ListItemButtonStyled, ListItemTextStyled } from './styles';

type Props = {
  menu: MenuRoute;
  open: boolean;
};

export default function MenuCollapseBig(props: Props) {
  const { menu, open } = props;

  const theme = useTheme();

  return (
    <>
      {menu.children && (
        <Collapse key={menu.id} in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {menu.children.map((child) => (
              <Fragment key={child.id}>
                {child.path && !child.modal ? (
                  <NavLink
                    to={child.path || '/404'}
                    style={{ color: theme.palette.text.primary }}
                    className={({ isActive: active }) => (active ? 'active' : '')}
                  >
                    <ListItemButtonStyled key={child.id} active={open}>
                      <ListItemTextStyled primary={child.title} />
                    </ListItemButtonStyled>
                  </NavLink>
                ) : (
                  <MenuCollapseModal active={open} {...child} />
                )}
              </Fragment>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export function MenuCollapseModal(props: MenuRoute & { active: boolean }) {
  const { id, title, modal: Modal, active } = props;

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {Modal && <Modal open={openModal} onClose={() => setOpenModal(false)} />}
      <ListItemButtonStyled key={id} active={active} onClick={() => setOpenModal(true)}>
        <ListItemTextStyled primary={title} />
      </ListItemButtonStyled>
    </>
  );
}
