import { styled, svgIconClasses } from '@mui/material';
import MuiChip, { ChipProps, chipClasses } from '@mui/material/Chip';

const Chip = styled((props: ChipProps) => <MuiChip {...props} />)(({ theme }) => ({
  [`&`]: {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgb(241, 243, 245)' : 'rgba(0, 0, 0, 0.08)',
    borderRadius: '4px'
  },
  [`& .${chipClasses.label}`]: {
    color: 'rgb(73, 80, 87)',
    fontSize: 12,
    fontWeight: 700
  },
  [`& .${svgIconClasses.root}`]: {
    color: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.66)' : 'rgba(0, 0, 0, 0.26)'
  },
  [`& .${svgIconClasses.root}:hover`]: {
    color: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.88)' : 'rgba(0, 0, 0, 0.4)'
  }
}));

export default Chip;
