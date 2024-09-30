import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import FormControlLabel from '~/base/components/Material/FormControl/Label';
import Radio from '~/base/components/Material/Radio';
import RadioGroup from '~/base/components/Material/Radio/Group';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import { FormValues } from '../../../common/form';
import RowReply from './RowReply';

const ReplyClarification = () => {
  const { t } = useTranslation();

  const { values, setFieldValue } = useFormikContext<FormValues>();

  return (
    <View>
      <View flexDirection='row' alignItems='center' gap={5}>
        <Typography fontSize={15}>{t('app.allocation.items.clarification.comment.status.label')}:</Typography>
        <RadioGroup value={values.replyStatus} onChange={(event) => setFieldValue('replyStatus', event.target.value)}>
          <View flexDirection='row' gap={5}>
            <FormControlLabel
              value='pending'
              control={<Radio />}
              label={t('app.allocation.items.clarification.comment.status.pending')}
            />
            <FormControlLabel
              value='checked'
              control={<Radio />}
              label={t('app.allocation.items.clarification.comment.status.checked')}
            />
          </View>
        </RadioGroup>
      </View>
      <RowReply />
    </View>
  );
};

export default ReplyClarification;
