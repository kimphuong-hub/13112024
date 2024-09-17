import { styled, useTheme } from '@mui/material';
import MuiTypography, { TypographyProps } from '@mui/material/Typography';

const Typography = styled((props: TypographyProps) => <MuiTypography {...props} />, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'fontSize'
})(({ color, fontSize, theme }) => ({
  color: typeof color === 'string' ? color : theme.palette.text.primary,
  fontSize: typeof fontSize === 'number' ? fontSize : 12
}));

export default Typography;

export const TypographySecondary = styled((props: TypographyProps) => <MuiTypography {...props} />, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'fontSize'
})(({ color, fontSize, theme }) => ({
  color: typeof color === 'string' ? color : theme.palette.text.secondary,
  fontSize: typeof fontSize === 'number' ? fontSize : 12
}));

export const TypographySearch = styled(
  (props: TypographyProps & { text: string; search: string }) => {
    const { text, search, ...restProps } = props;

    const theme = useTheme();

    if (!search)
      return (
        <Typography fontSize={14} {...restProps}>
          {text}
        </Typography>
      );

    const parts = text.split(new RegExp(`(${search})`, 'gi'));

    return (
      <Typography fontSize={14} {...restProps}>
        {parts.map((part, index) => {
          if (part?.toLowerCase() === search.toLowerCase()) {
            return (
              <span key={index} style={{ backgroundColor: theme.palette.primary.main }}>
                {part}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </Typography>
    );
  },
  {
    shouldForwardProp: (prop) => prop !== 'color' && prop !== 'fontSize'
  }
)(({ color, fontSize, theme }) => ({
  color: typeof color === 'string' ? color : theme.palette.text.secondary,
  fontSize: typeof fontSize === 'number' ? fontSize : 12
}));
