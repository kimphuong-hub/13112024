import { ListItemText, Menu, MenuItem, menuClasses, styled, typographyClasses } from '@mui/material';

export const MenuStyled = styled(Menu)(() => ({
  [`& .${menuClasses.list}`]: {
    padding: 0
  }
}));

export const MenuItemStyled = styled(MenuItem)(() => ({
  [`&`]: {
    fontSize: 13,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 35
  }
}));

export const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
  [`&`]: {
    minWidth: 120,
    marginLeft: 12
  },
  [`& .${typographyClasses.root}`]: {
    color: theme.palette.text.secondary,
    fontSize: 13
  }
}));
