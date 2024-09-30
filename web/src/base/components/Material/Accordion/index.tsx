import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&::before': {
      display: 'none'
    },
    '&:not(:last-child)': {
      borderBottom: 0
    }
  })
);

export default Accordion;
