import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';

export const AccordionSummary = styled((props: AccordionSummaryProps) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#292E33' : 'rgba(0, 0, 0, .03)'
  })
);

export default AccordionSummary;
