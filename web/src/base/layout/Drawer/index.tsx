import { styled } from '@mui/material';
import MuiDrawer, { DrawerProps, drawerClasses } from '@mui/material/Drawer';

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  [`& .${drawerClasses.paper}`]: {
    width: 220,
    position: 'relative',
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(9)
    })
  }
}));

type Props = DrawerProps;

export default function LayoutDrawer(props: Props) {
  return <Drawer style={{ height: '100vh', overflow: 'auto' }} {...props} />;
}
