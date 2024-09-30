import { ButtonProps, buttonClasses } from '@mui/material';
import Button from '~/base/components/Material/Button';

type Props = ButtonProps;

const LayoutAuthButton = (props: Props) => {
  return (
    <Button
      sx={{
        [`&`]: {
          color: '#FFF',
          fontSize: 12,
          fontWeight: 400,
          lineHeight: '20px',
          padding: '2.5px 8px 4.5px'
        },
        [`&.${buttonClasses.contained}`]: {
          backgroundColor: '#6C757D',
          boxShadow: '4px 4px 4px #999999'
        },
        [`&.${buttonClasses.contained}:hover`]: {
          backgroundColor: '#5a6268'
        },
        [`&.${buttonClasses.contained}:focus`]: {
          boxShadow: 'none'
        }
      }}
      {...props}
    />
  );
};

export default LayoutAuthButton;
