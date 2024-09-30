import { Box, BoxProps, useTheme } from '@mui/material';
import { forwardRef } from 'react';

export type FontAwesomeIconType = {
  icon?: string;
  color?: string;
  size?: number;
};

export type FontAwesomeIconProps = BoxProps & FontAwesomeIconType;

const FontAwesomeIcon = forwardRef(
  (
    props: FontAwesomeIconProps,
    ref: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null
  ) => {
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
  }
);

FontAwesomeIcon.displayName = 'FontAwesomeIcon';

export default FontAwesomeIcon;
