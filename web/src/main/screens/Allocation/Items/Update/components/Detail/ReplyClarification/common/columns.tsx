import { GridColDef } from '@mui/x-data-grid';
import { TFunction } from 'i18next';

export const useColumns = (t: TFunction<'translation', undefined>): GridColDef[] => {
  return [
    {
      width: 150,
      field: 'clarificationDate',
      headerName: t('app.allocation.items.clarification.comment.history.columns.date')
    },
    {
      flex: 1,
      minWidth: 150,
      field: 'clarificationComment',
      headerName: t('app.allocation.items.clarification.comment.history.columns.comment')
    },
    {
      width: 200,
      field: 'clarificationUsername',
      headerName: t('app.allocation.items.clarification.comment.history.columns.user')
    },
    {
      flex: 1,
      minWidth: 150,
      field: 'clarificationReplyComment',
      headerName: t('app.allocation.items.clarification.comment.history.columns.reply')
    },
    {
      width: 200,
      field: 'clarificationReplyUsername',
      headerName: t('app.allocation.items.clarification.comment.history.columns.user')
    }
  ];
};
