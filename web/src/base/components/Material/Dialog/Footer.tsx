import { Box, BoxProps, styled } from '@mui/material';

const Footer = styled((props: BoxProps) => <Box {...props}></Box>)(() => ({
  padding: '10px',
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  borderRadius: 0
}));

export default Footer;
