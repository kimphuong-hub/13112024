import { useTranslation } from 'react-i18next';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import IconButton from '~/base/components/Material/Button/Icon';
import Tooltip from '~/base/components/Material/Tooltip';
import View from '~/base/components/Material/View';

type Props = {
  onSubmit?: () => void;
  onToggleGroupAccounts: () => void;
  onToggleItemsHistory: () => void;
};

export const FormAction = (props: Props) => {
  const { onSubmit, onToggleGroupAccounts, onToggleItemsHistory } = props;

  const { t } = useTranslation();

  return (
    <View flexDirection='row' justifyContent='end' alignItems='end' gap={3}>
      <Tooltip title={t('app.allocation.items.info.button.group-accounts.tooltip')}>
        <IconButton style={{ width: 40, height: 30 }} onClick={onToggleGroupAccounts}>
          <FontAwesomeIcon icon='fa-solid fa-book' size={15} />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('app.allocation.items.info.button.items-history.tooltip')}>
        <IconButton style={{ width: 40, height: 30 }} onClick={onToggleItemsHistory}>
          <FontAwesomeIcon icon='fa-solid fa-clock-rotate-left' size={15} />
        </IconButton>
      </Tooltip>
      {onSubmit && (
        <Tooltip title={t('app.system.save.tooltip')}>
          <IconButton style={{ width: 40, height: 30 }} onClick={onSubmit}>
            <FontAwesomeIcon icon='fa-solid fa-floppy-disk' size={16} />
          </IconButton>
        </Tooltip>
      )}
    </View>
  );
};