import { useTranslation } from 'react-i18next';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import IconButton from '~/base/components/Material/Button/Icon';
import Tooltip from '~/base/components/Material/Tooltip';
import View from '~/base/components/Material/View';

type Props = {
  onSave: () => void;
};

export const FormAction = (props: Props) => {
  const { onSave } = props;

  const { t } = useTranslation();

  return (
    <View flexDirection='row' justifyContent='end' alignItems='end' gap={3}>
      <Tooltip title={t('app.system.save.tooltip')}>
        <IconButton onClick={onSave}>
          <FontAwesomeIcon icon='fa-solid fa-floppy-disk' size={16} />
        </IconButton>
      </Tooltip>
    </View>
  );
};
