import { buttonClasses, styled } from '@mui/material';
import MuiButtonGroup, { ButtonGroupProps, buttonGroupClasses } from '@mui/material/ButtonGroup';

const ButtonGroup = styled((props: ButtonGroupProps) => <MuiButtonGroup {...props} />)(({ theme }) => ({
  [`&`]: {
    boxShadow: `none`
  },
  [`& .${buttonClasses.root}:hover`]: {},
  [`& .${buttonClasses.root}:not(:last-child)`]: {
    borderRight: 0
  },
  [`&.${buttonGroupClasses.outlined} .${buttonClasses.root}`]: {
    color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#6C757D',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#6C757D'
  },
  [`&.${buttonGroupClasses.outlined} .${buttonClasses.root}:hover`]: {
    backgroundColor: 'initial'
  }
}));

export default ButtonGroup;
