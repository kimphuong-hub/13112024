import { Box, BoxProps } from '@mui/material';
import moment from 'moment';
import packageJson from 'packageJson';
import { useEffect, useState } from 'react';
import { TypographySecondary } from '~/base/components/Material/Typography';

type Props = BoxProps & {
  openDrawer: boolean;
};

export default function LayoutVersion(props: Props) {
  const { sx, openDrawer, ...restProps } = props;

  const [currentDate, setCurrentDate] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: openDrawer ? 'block' : 'none',
        position: 'fixed',
        bottom: 0,
        padding: '20px',
        boxSizing: 'border-box',
        ...sx
      }}
      {...restProps}
    >
      <TypographySecondary>V{packageJson.version}</TypographySecondary>
      <TypographySecondary>{currentDate.format('hh:mm:ss A MM/DD/YYYY')}</TypographySecondary>
    </Box>
  );
}
