import { Box, List, Typography } from '@mui/material';
import MenuList from './List';
import { useSelectorApp } from '~/redux/store';

type Props = {
  openDrawer: boolean;
};

export default function LayoutMenu(props: Props) {
  const { openDrawer } = props;

  const profile = useSelectorApp((state) => state.auth.data.profile);

  return (
    <List component='nav'>
      {openDrawer && (
        <Box component='main' style={{ padding: '25px 30px' }}>
          <Typography variant='subtitle1' fontSize={13} fontWeight={600}>
            {profile?.username}
          </Typography>
          <Typography variant='body1' color='primary' fontSize={12}>
            {profile?.userType}
          </Typography>
        </Box>
      )}
      <MenuList openDrawer={openDrawer} />
    </List>
  );
}
