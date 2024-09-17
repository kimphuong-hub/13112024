import { styled } from '@mui/material';
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem';

export const SelectItem = styled((props: MenuItemProps) => <MuiMenuItem disableTouchRipple {...props} />)(() => ({
  [`&`]: {
    fontSize: 13
  }
}));

export default SelectItem;
