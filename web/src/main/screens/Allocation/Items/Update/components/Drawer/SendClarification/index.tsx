import { Divider, FormHelperText, useTheme } from '@mui/material';
import { AxiosResponse, HttpStatusCode } from 'axios';
import { useFormik } from 'formik';
import { useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import Button from '~/base/components/Material/Button';
import DataGrid from '~/base/components/Material/DataGrid';
import TextField from '~/base/components/Material/Form/TextField';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import { commentClarification, getClarificationCategories } from '~/main/features/allocation/items/action';
import {
  AllocationItemsDetailChanged,
  AllocationItemsDetailResponse,
  AllocationStatusType,
  CommentClarificationPayload
} from '~/main/features/allocation/items/types';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import { destinationStatusClarification } from '../../../common/config';
import { SelectedContext } from '../../../contexts/selected';
import { useColumns } from './common/columns';
import { FormValues, initialValues, validationSchema } from './common/form';

type Props = {
  details: AllocationItemsDetailResponse[];
  itemsChanged: { [itemId: string]: AllocationItemsDetailChanged };
  onSendComment: (referenceIds: string[]) => void;
};

const DetailSendClarification = (props: Props) => {
  const { details, itemsChanged, onSendComment } = props;

  const { t } = useTranslation();
  const theme = useTheme();

  const { companyNo } = useParams();

  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') ?? '';

  const dispatch = useDispatchApp();
  const defaultCategories = useSelectorApp((state) => state.allocation.items.clarification.categories);

  const destinationStatus = destinationStatusClarification[status as AllocationStatusType];
  const { data: categories = [], status: categoriesStatus } = defaultCategories[destinationStatus] || {};

  const { groupAccount, allocationItem } = useContext(SelectedContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getClarificationCategories({ type: destinationStatus }));
  }, [destinationStatus, dispatch]);

  const onSubmit = useCallback(
    (values: FormValues) => {
      if (loading || !companyNo || !allocationItem || !values.problemTypeId) {
        return;
      }

      const invoiceAccount = itemsChanged[allocationItem.id];
      if (!invoiceAccount) {
        return;
      }

      setLoading(true);

      const referenceIds = details
        .filter((detail) => detail.id !== allocationItem.id && detail.itemName === allocationItem.itemName)
        .map((detail) => detail.id);

      const clarificationParams: CommentClarificationPayload = {
        invoice_account_id: allocationItem.id,
        clarification_category_id: values.problemTypeId,
        clarification_comment: values.comment,
        company_no: companyNo,
        current_status: status,
        next_status: destinationStatus,
        invoice_account_reference_ids: referenceIds,
        invoice_account: {
          id: invoiceAccount.id ?? '',
          invoice_id: invoiceAccount.invoiceId ?? 0,
          invoice_position_id: invoiceAccount.invoicePositionId ?? 0,
          account_id: invoiceAccount.accountId ?? '',
          account_no: invoiceAccount.accountNo ?? '',
          system_account_id: `${invoiceAccount.systemAccountId ?? 0}`,
          system_account_no: `${invoiceAccount.systemAccountNo ?? 0}`
        }
      };

      toast.promise(
        dispatch(commentClarification(clarificationParams))
          .then((response) => {
            const payload = response.payload as AxiosResponse;
            if (!payload || payload?.data?.status !== HttpStatusCode.Ok) {
              throw new Error(t('app.system.error.internal-server'));
            }

            onSendComment(referenceIds);
          })
          .finally(() => {
            setLoading(false);
          }),
        {
          loading: t('app.system.loading.processing'),
          success: t('app.system.loading.success'),
          error: (error) => `${error.message || error || t('app.system.error.message')}`
        }
      );
    },
    [allocationItem, companyNo, destinationStatus, details, dispatch, itemsChanged, loading, onSendComment, status, t]
  );

  const formik = useFormik({ initialValues, validationSchema: validationSchema(t), onSubmit });
  const { values, touched, errors, setFieldValue, handleBlur, handleChange, submitForm } = formik;

  useEffect(() => {
    if (groupAccount) {
      const accountText = `${groupAccount.accountNo} - ${groupAccount.accountName}`;
      setFieldValue('comment', accountText);
    }
  }, [groupAccount, setFieldValue]);

  useEffect(() => {
    const defaultCategory = categories.find((category) => category.isDefault);
    if (defaultCategory) {
      setFieldValue('problemTypeId', defaultCategory.id);
    }
  }, [categories, setFieldValue]);

  return (
    <Section flexGrow={1} width={600}>
      <Typography fontSize={16}>{t('app.allocation.items.clarification.title')}</Typography>
      <View gap={2}>
        <View>
          <Typography fontSize={14}>{t('app.allocation.items.clarification.problem.title')}</Typography>
          <Divider />
        </View>
        <View>
          <DataGrid
            sx={{
              ...(touched.problemTypeId &&
                Boolean(errors.problemTypeId) && {
                  borderColor: theme.palette.error.main
                })
            }}
            rows={categories}
            columns={useColumns(t)}
            getRowId={(row) => row.id}
            loading={categoriesStatus === 'loading'}
            rowSelectionModel={values.problemTypeId ? [values.problemTypeId] : []}
            onRowSelectionModelChange={(model) => setFieldValue('problemTypeId', model[0])}
            checkboxSelection
            disableMultipleRowSelection
            hideFooter
          />
          <FormHelperText sx={{ ml: '14px' }} error={touched.problemTypeId && Boolean(errors.problemTypeId)}>
            {touched.problemTypeId && errors.problemTypeId}
          </FormHelperText>
        </View>
      </View>
      <View gap={2}>
        <View>
          <Typography fontSize={14}>{t('app.allocation.items.clarification.comment.title')}</Typography>
          <Divider />
        </View>
        <TextField
          size='small'
          variant='outlined'
          rows={4}
          multiline
          placeholder={t('app.allocation.items.clarification.comment.input.placeholder')}
          InputProps={{
            sx: { borderRadius: '1px', '.MuiInputBase-input': { fontSize: 13.5 } },
            autoComplete: 'off'
          }}
          name='comment'
          value={values.comment}
          onBlur={handleBlur}
          onChange={handleChange}
          error={touched.comment && Boolean(errors.comment)}
          helperText={touched.comment && errors.comment}
        />
      </View>
      <View flexDirection='row' justifyContent='end'>
        <Button variant='contained' onClick={submitForm}>
          <FontAwesomeIcon icon='fa-regular fa-send' size={12} color={theme.palette.common.white} sx={{ mr: 1 }} />
          <Typography>{t('app.allocation.items.clarification.comment.send')}</Typography>
        </Button>
      </View>
    </Section>
  );
};

export default DetailSendClarification;
