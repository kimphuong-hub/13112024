import { Box, BoxProps, styled } from '@mui/material';
import FontAwesomeIcon from '../../Icon/FontAwesome';
import IconButton from '../Button/Icon';
import { TypographySecondary } from '../Typography';

const Header = styled((props: { title: string; onClose?: () => void } & BoxProps) => (
  <Box
    component='div'
    display='flex'
    flexDirection='row'
    justifyContent='space-between'
    alignItems='center'
    gap={2}
    p='10px 15px'
    {...props}
  >
    <TypographySecondary style={{ fontSize: 18 }}>{props.title}</TypographySecondary>
    {props.onClose && (
      <IconButton onClick={props.onClose}>
        <FontAwesomeIcon icon='fa-solid fa-xmark' size={18} />
      </IconButton>
    )}
  </Box>
))(() => ({
  boxShadow: '0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)',
  boxSizing: 'border-box',
  padding: '10px 15px',
  borderRadius: '0.25em'
}));

export default Header;
