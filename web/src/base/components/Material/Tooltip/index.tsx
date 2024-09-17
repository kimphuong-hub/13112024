import { styled } from '@mui/material';
import MuiTooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip placement='bottom' {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black
  },
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 14,
    fontWeight: 'normal',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: theme.palette.common.black
  }
}));

export default Tooltip;
