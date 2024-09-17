import { Box, BoxProps, useTheme } from '@mui/material';
import { forwardRef } from 'react';

export type FontAwesomeIconType = {
  icon?: string;
  color?: string;
  size?: number;
};

export type FontAwesomeIconProps = BoxProps & FontAwesomeIconType;

type RefProps = ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null;

export default forwardRef(function FontAwesomeIcon(props: FontAwesomeIconProps, ref: RefProps) {
  const theme = useTheme();
  const { sx, icon, color = theme.palette.text.secondary, size: fontSize, className = '', ...restProps } = props;

  return (
    <Box
      sx={{ color, fontSize, ...sx }}
      ref={ref}
      component='span'
      className={`fa-icon ${icon}${className ? ' ' + className : ''}`}
      {...restProps}
    ></Box>
  );
});
