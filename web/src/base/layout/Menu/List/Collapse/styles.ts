import {
  ListItemButtonProps,
  ListItemText,
  Menu,
  MenuItem,
  listItemTextClasses,
  styled,
  typographyClasses
} from '@mui/material';
import { ListItemButton } from '~/base/components/Material/List';

export const MenuStyled = styled(Menu)(() => ({
  [`&`]: {
    marginTop: -50,
    marginLeft: 57
  }
}));

export const MenuItemStyled = styled(MenuItem)(() => ({
  [`&`]: {
    fontSize: 14
  },
  [`.active &`]: {
    fontWeight: 700,
    backgroundColor: 'rgba(0, 0, 0, 0.04)'
  }
}));

export const ListItemTextStyled = styled(ListItemText)(() => ({
  [`& .${typographyClasses.root}`]: {
    fontSize: 12
  }
}));

type ListItemButtonPropsStyled = ListItemButtonProps & {
  active?: boolean;
};

export const ListItemButtonStyled = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active'
})<ListItemButtonPropsStyled>(({ theme, active }) => ({
  [`&`]: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 65,
    paddingRight: 25,
    borderLeftWidth: 4,
    borderLeftStyle: 'solid',
    borderLeftColor: 'transparent',
    ...(active && {
      borderLeftColor: theme.palette.primary.main
    })
  },
  [`&:hover .${listItemTextClasses.primary}`]: {
    fontWeight: 700
  },
  [`.active & .${listItemTextClasses.primary}`]: {
    fontWeight: 700
  }
}));
