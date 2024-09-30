import { styled, svgIconClasses } from '@mui/material';
import { RichTreeView as MuiRichTreeView } from '@mui/x-tree-view/RichTreeView';
import { treeItemClasses } from '@mui/x-tree-view/TreeItem';

const RichTreeView = styled(MuiRichTreeView)(({ theme }) => ({
  [`& .${treeItemClasses.root} .${treeItemClasses.label}`]: {
    fontSize: 14
  },
  [`& .${treeItemClasses.root} .${treeItemClasses.iconContainer} .${svgIconClasses.root}`]: {
    color: theme.palette.text.secondary
  }
}));

export default RichTreeView;
