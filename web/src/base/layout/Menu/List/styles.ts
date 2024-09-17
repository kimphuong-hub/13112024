import {
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  listItemTextClasses,
  styled,
  typographyClasses
} from '@mui/material';
import { ListItemButton } from '~/base/components/Material/List';

export const ListItemIconStyled = styled(ListItemIcon)(() => ({
  [`&`]: {
    minWidth: 32
  }
}));

export const ListItemTextStyled = styled(ListItemText)(() => ({
  [`& .${typographyClasses.root}`]: {
    fontSize: 12
  }
}));

type ListItemButtonPropsStyled = ListItemButtonProps & {
  active?: boolean;
  openDrawer?: boolean;
};

export const ListItemButtonStyled = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'openDrawer'
})<ListItemButtonPropsStyled>(({ theme, active, openDrawer }) => {
  return {
    [`&`]: {
      paddingLeft: 21,
      paddingRight: 25,
      borderLeftWidth: 4,
      borderLeftStyle: 'solid',
      borderLeftColor: 'transparent',
      ...(active && {
        borderLeftColor: theme.palette.primary.main
      }),
      ...(!openDrawer && {
        paddingTop: 20,
        paddingBottom: 20
      })
    },
    [`& .${typographyClasses.root}`]: {
      ...(active && {
        fontWeight: 700
      })
    },
    [`.active &`]: {
      borderLeftColor: theme.palette.primary.main
    },
    [`&:hover .${listItemTextClasses.primary}`]: {
      fontWeight: 700
    },
    [`.active & .${listItemTextClasses.primary}`]: {
      fontWeight: 700
    }
  };
});
