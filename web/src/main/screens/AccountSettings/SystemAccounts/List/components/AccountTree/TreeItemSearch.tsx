import { useTheme } from '@mui/material';
import { TreeItem2, TreeItem2Props } from '@mui/x-tree-view/TreeItem2';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Typography from '~/base/components/Material/Typography';

export const TreeItemSearch = (props: TreeItem2Props) => {
  const theme = useTheme();

  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('q') || '';

  const highlightText = useCallback(
    (label: string, search: string) => {
      if (!search) return <Typography fontSize={14}>{label}</Typography>;

      const searchWords = search.split(/\s+/).filter((word) => word);
      const sanitizedWords = searchWords.map((word) => word.replace(/[^a-zA-Z0-9,\-()]/g, ''));
      const regexWords = new RegExp(`(${sanitizedWords.join('|')})`, 'gi');

      const partsWords = label.split(regexWords);

      return (
        <Typography fontSize={14}>
          {partsWords.map((part, index) => {
            if (searchWords.some((word) => word.toLowerCase() === part?.toLowerCase())) {
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
    [theme.palette.primary.main]
  );

  return (
    <TreeItem2
      {...props}
      slotProps={{
        label: {
          children: highlightText(`${props.label}`, searchValue)
        }
      }}
    />
  );
};
