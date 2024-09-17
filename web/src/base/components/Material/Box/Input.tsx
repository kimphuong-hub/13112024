import { styled } from '@mui/material';
import MuiBox, { BoxProps } from '@mui/material/Box';

const BoxInput = styled(({ ...props }: BoxProps) => (
  <MuiBox component='div' display='flex' justifyContent='flex-end' alignItems='start' gap={2} flexGrow={1} {...props} />
))(() => ({}));

export default BoxInput;
