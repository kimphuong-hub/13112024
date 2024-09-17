import Box, { BoxProps } from '@mui/material/Box';

type Props = BoxProps;

export default function LayoutBody(props: Props) {
  const { children, ...restProps } = props;

  return (
    <Box
      sx={{
        overflow: 'auto',
        backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900])
      }}
      component='main'
      display='flex'
      flexDirection='column'
      flexGrow={1}
      {...restProps}
    >
      <Box display='flex' flexDirection='column' flexGrow={1}>
        {children}
      </Box>
    </Box>
  );
}
