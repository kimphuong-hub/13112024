import { styled } from '@mui/material';
import MuiTab, { TabProps, tabClasses } from '@mui/material/Tab';
import MuiTabs, { TabsProps } from '@mui/material/Tabs';

export const Tab = styled((props: TabProps) => <MuiTab {...props} />)(() => ({
  [`&`]: {
    fontSize: 13,
    minHeight: '30px',
    paddingTop: 0,
    paddingBottom: 0,
    textTransform: 'none'
  },
  [`&.${tabClasses.selected}`]: {
    backgroundColor: '#FFFFFF'
  }
}));

export const Tabs = styled((props: TabsProps) => <MuiTabs {...props} />)(() => ({
  [`&`]: {
    minHeight: '30px'
  }
}));
