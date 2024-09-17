import { inputBaseClasses, styled, svgIconClasses } from '@mui/material';
import { DatePickerProps, DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

const DatePicker = styled((props: DatePickerProps<Dayjs>) => (
  <MuiDatePicker
    sx={{ flexGrow: 1 }}
    slotProps={{
      textField: { size: 'small' },
      openPickerButton: {
        style: {
          outline: 0,
          borderRadius: '0px',
          padding: '3px 10px'
        },
        disableTouchRipple: true,
        disableFocusRipple: true
      }
    }}
    {...props}
  />
))(({ theme }) => ({
  [`& .${inputBaseClasses.root}`]: {
    fontSize: 13,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white
  },
  [`& .${inputBaseClasses.root} .${inputBaseClasses.input}`]: {
    paddingTop: '7px',
    paddingBottom: '7px'
  },
  [`& .${inputBaseClasses.root} .${svgIconClasses.root}`]: {
    fontSize: 18
  }
}));

export default DatePicker;
