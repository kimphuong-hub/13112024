import { GridRenderCellParams } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import Cell from '~/base/components/Material/Table/Cell';
import Tooltip from '~/base/components/Material/Tooltip';
import View from '~/base/components/Material/View';

type Props = GridRenderCellParams & {
  onEdit: (id: string) => void;
};

export default function CellAction(props: Props) {
  const {
    row: { id },
    onEdit
  } = props;

  const { t } = useTranslation();

  return (
    <View flexDirection='row' gap={0.5}>
      <Tooltip title={t('app.account-settings.global-accounts.action.edit.tooltip')}>
        <Cell.Button variant='text' onClick={() => onEdit(id)}>
          <FontAwesomeIcon icon='fa-solid fa-pen-circle' size={15} />
        </Cell.Button>
      </Tooltip>
    </View>
  );
}
