import { MouseEvent } from 'react';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import { MenuRoute } from '~/const/route/types';
import MenuListItemIcon from './ItemIcon';
import { ListItemButtonStyled, ListItemIconStyled, ListItemTextStyled } from './styles';

type Props = {
  menu: MenuRoute;
  active?: boolean;
  openDrawer: boolean;
  collapseId: string | number;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

export default function MenuListItem(props: Props) {
  const { menu, active, openDrawer, collapseId, onClick } = props;

  return (
    <ListItemButtonStyled active={active} openDrawer={openDrawer} onClick={onClick}>
      <ListItemIconStyled>{menu.icon && <FontAwesomeIcon icon={menu.icon} size={16} />}</ListItemIconStyled>
      {openDrawer && <ListItemTextStyled primary={menu.title} />}
      {openDrawer && menu.children && (
        <>
          {menu.id === collapseId ? (
            <MenuListItemIcon icon='fa-solid fa-chevron-down' />
          ) : (
            <MenuListItemIcon icon='fa-solid fa-chevron-right' />
          )}
        </>
      )}
    </ListItemButtonStyled>
  );
}
