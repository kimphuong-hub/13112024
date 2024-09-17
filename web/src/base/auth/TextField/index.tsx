import { inputBaseClasses, outlinedInputClasses } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import TextField from '~/base/components/Material/Form/TextField';
import View from '~/base/components/Material/View';

type Props = TextFieldProps & {
  icon: string;
};

export default function LayoutAuthTextField(props: Props) {
  const { icon, ...restProps } = props;

  return (
    <View flexDirection='row'>
      <View>
        <FontAwesomeIcon
          size={10}
          icon={icon}
          style={{
            color: '#495057',
            padding: '8px',
            backgroundColor: '#E9ECEF',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px'
          }}
        />
      </View>
      <TextField
        InputProps={{
          sx: {
            [`&.${inputBaseClasses.root}`]: {
              backgroundColor: '#FFFFFF'
            },
            [`&.${inputBaseClasses.root} .${inputBaseClasses.input}.${inputBaseClasses.inputSizeSmall}`]: {
              color: '#000000',
              padding: '0.25rem 0.5rem',
              paddingBottom: '0.3rem'
            },
            [`& .${inputBaseClasses.input}::placeholder`]: {
              color: '#6C757D',
              opacity: 1
            },
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: '#E5E6E7'
            }
          },
          style: {
            fontSize: 12,
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px'
          }
        }}
        {...restProps}
      />
    </View>
  );
}
