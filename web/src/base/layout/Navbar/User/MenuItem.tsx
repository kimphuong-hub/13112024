import { MenuItemProps, useTheme } from '@mui/material';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import { ListItemTextStyled, MenuItemStyled } from './styles';

type Props = MenuItemProps & {
  icon: string;
  iconSize?: number;
  title: string;
};

export default function UserMenuItem(props: Props) {
  const { icon, iconSize, title, ...restProps } = props;
  const theme = useTheme();

  return (
    <MenuItemStyled disableRipple {...restProps}>
      <FontAwesomeIcon icon={icon} color={theme.palette.text.secondary} size={iconSize} />
      <ListItemTextStyled>{title}</ListItemTextStyled>
    </MenuItemStyled>
  );
}
