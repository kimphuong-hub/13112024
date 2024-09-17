import { styled } from '@mui/material';
import MuiBox, { BoxProps } from '@mui/material/Box';
import { forwardRef } from 'react';

const ViewRef = (
  props: BoxProps,
  ref: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null
) => <MuiBox ref={ref} component='div' display='flex' flexDirection='column' {...props} />;

const View = styled(forwardRef(ViewRef))(() => ({}));

export default View;
