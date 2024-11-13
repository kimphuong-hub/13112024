import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import { useTheme } from '@mui/material';

type Props = React.ComponentProps<typeof FontAwesomeIcon>;

export default function MenuListItemIcon(props: Props) {
  const { style, ...restProps } = props;
  const theme = useTheme();

  return (
    <FontAwesomeIcon
      size={9}
      style={{
        color: theme.palette.mode === 'dark' ? '#D8D8D8' : '#67646C',
        fontWeight: 800,
        ...style
      }}
      {...restProps}
    />
  );
}
