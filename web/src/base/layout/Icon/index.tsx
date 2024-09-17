import { IconButtonProps } from '@mui/material/IconButton';
import { forwardRef } from 'react';
import FontAwesomeIcon from '../../components/Icon/FontAwesome';
import IconButton from '../../components/Material/Button/Icon';

type Props = IconButtonProps & {
  icon?: string;
  iconSize?: number;
};

type RefProps = ((instance: HTMLButtonElement | null) => void) | React.RefObject<HTMLButtonElement> | null;

export default forwardRef(function LayoutIcon(props: Props, ref: RefProps) {
  const { icon, iconSize, ...restProps } = props;

  return (
    <IconButton ref={ref} {...restProps}>
      <FontAwesomeIcon icon={icon} color='#000000' size={iconSize} />
    </IconButton>
  );
});
