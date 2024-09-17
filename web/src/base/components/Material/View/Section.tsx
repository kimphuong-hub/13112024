import { styled } from '@mui/material';
import MuiBox, { BoxProps } from '@mui/material/Box';
import { forwardRef } from 'react';

const SectionRef = (
  props: BoxProps,
  ref: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null
) => <MuiBox ref={ref} component='div' display='flex' flexDirection='column' gap={2} {...props} />;

const Section = styled(forwardRef(SectionRef))(({ theme }) => ({
  padding: 20,
  boxShadow: '0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)',
  boxSizing: 'border-box',
  borderRadius: '0.25em',
  backgroundColor: theme.palette.background.default,
  overflow: 'auto'
}));

export default Section;
