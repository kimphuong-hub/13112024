import { List, Typography } from '@mui/material';
import View from '~/base/components/Material/View';
import { useSelectorApp } from '~/redux/store';
import MenuList from './List';

type Props = {
  openDrawer: boolean;
};

export default function LayoutMenu(props: Props) {
  const { openDrawer } = props;

  const profile = useSelectorApp((state) => state.auth.data.profile);

  return (
    <List component='nav'>
      {openDrawer && (
        <View component='main' style={{ padding: '25px 30px' }}>
          <Typography variant='subtitle1' fontSize={13} fontWeight={600}>
            {profile?.username}
          </Typography>
          <Typography variant='body1' color='primary' fontSize={12}>
            {profile?.userType}
          </Typography>
        </View>
      )}
      <MenuList openDrawer={openDrawer} />
    </List>
  );
}
