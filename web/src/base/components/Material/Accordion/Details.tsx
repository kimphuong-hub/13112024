import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderTop: `1px solid ${theme.palette.divider}`
}));

export default AccordionDetails;
