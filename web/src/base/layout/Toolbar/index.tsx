import { styled } from '@mui/material';
import MuiToolbar, { ToolbarProps } from '@mui/material/Toolbar';

const Toolbar = styled((props: ToolbarProps) => <MuiToolbar {...props} />)(({ theme }) => ({
  [`&`]: { minHeight: 61, backgroundColor: theme.customColors.topBar.primary }
}));

type Props = ToolbarProps;

export default function LayoutToolbar(props: Props) {
  return <Toolbar {...props} />;
}
