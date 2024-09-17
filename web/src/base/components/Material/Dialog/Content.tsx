import { Box, BoxProps, styled } from '@mui/material';

const Content = styled((props: BoxProps) => (
  <Box
    component='div'
    display='flex'
    flexDirection='row'
    justifyContent='space-between'
    alignItems='center'
    gap={2}
    {...props}
  ></Box>
))(() => ({}));

export default Content;
