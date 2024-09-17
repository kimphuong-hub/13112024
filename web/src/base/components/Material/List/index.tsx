import { styled } from '@mui/material';
import MuiListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';

export const ListItemButton = styled((props: ListItemButtonProps) => <MuiListItemButton disableRipple {...props} />)(
  () => ({})
);
