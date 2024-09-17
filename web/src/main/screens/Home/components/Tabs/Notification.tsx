import { useTranslation } from 'react-i18next';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';

export const TabNotification = () => {
  const { t } = useTranslation();

  return (
    <View flexGrow={1} justifyContent='center' alignItems='center' gap={1}>
      <FontAwesomeIcon icon='fal fa-comment-lines' size={108} />
      <Typography fontSize='1em'>{t('app.home.notifications.no-data.title')}</Typography>
    </View>
  );
};
