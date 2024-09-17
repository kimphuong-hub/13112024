import { Divider } from '@mui/material';
import moment from 'moment';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import Button from '~/base/components/Material/Button';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import { getDashboardInvoiceItemsOverview } from '~/main/features/dashboard/action';
import { useDispatchApp, useSelectorApp } from '~/redux/store';

const TabInvoicesItemsOverview = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const toDate = searchParams.get('to-date') || moment().format('YYYY-MM-DD');
  const fromDate = searchParams.get('from-date') || moment().day(-7).format('YYYY-MM-DD');

  const dispatch = useDispatchApp();
  const { invoicesItemsOverview: defaultInvoicesItemsOverview } = useSelectorApp((state) => state.dashboard);

  const { data: invoicesItemsOverview } = defaultInvoicesItemsOverview || {};

  const getData = useCallback(() => {
    dispatch(getDashboardInvoiceItemsOverview({ toDate, fromDate }));
  }, [dispatch, fromDate, toDate]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <View>
      <Typography fontWeight={700} mb={1}>
        {t('app.home.invoices-items-overview.items.title')}
      </Typography>
      <View flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Typography>{t('app.home.invoices-items-overview.items.allocation1')}</Typography>
        <View width={150} flexDirection='row' gap={2}>
          <Button variant='text' fullWidth>
            {invoicesItemsOverview.itemsInProcess || 0}
          </Button>
          <Button variant='text' color='error' fullWidth>
            {invoicesItemsOverview.itemsInProcessWarning || 0}
          </Button>
        </View>
      </View>
      <View flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Typography>{t('app.home.invoices-items-overview.items.allocation2')}</Typography>
        <View width={150} flexDirection='row' gap={2}>
          <Button variant='text' fullWidth>
            {invoicesItemsOverview.itemsClarification1}
          </Button>
          <Button variant='text' color='error' fullWidth>
            {invoicesItemsOverview.itemsClarification1Warning || 0}
          </Button>
        </View>
      </View>
      <View flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Typography>{t('app.home.invoices-items-overview.items.allocation3')}</Typography>
        <View width={150} flexDirection='row' gap={2}>
          <Button variant='text' fullWidth>
            {invoicesItemsOverview.itemsClarification2Warning || 0}
          </Button>
          <Button variant='text' color='error' fullWidth>
            {invoicesItemsOverview.itemsClarification2Warning || 0}
          </Button>
        </View>
      </View>
      <View flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Typography>{t('app.home.invoices-items-overview.items.verification')}</Typography>
        <View width={150} flexDirection='row' gap={2}>
          <Button variant='text' fullWidth>
            {invoicesItemsOverview.itemsPending || 0}
          </Button>
          <Button variant='text' color='error' fullWidth>
            {invoicesItemsOverview.itemsPendingWarning || 0}
          </Button>
        </View>
      </View>
      <Divider style={{ marginTop: '10px', marginBottom: '30px' }} />
      <Typography fontWeight={700} mb={1}>
        {t('app.home.invoices-items-overview.invoices.title')}
      </Typography>
      <View flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Typography>{t('app.home.invoices-items-overview.invoices.in-process')}</Typography>
        <View width={150} flexDirection='row' gap={2}>
          <Button variant='text' fullWidth>
            {invoicesItemsOverview.invoicesInProcess || 0}
          </Button>
          <Button variant='text' color='error' fullWidth>
            {invoicesItemsOverview.invoicesInProcessWarning || 0}
          </Button>
        </View>
      </View>
      <View flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Typography>{t('app.home.invoices-items-overview.invoices.in-clarification1')}</Typography>
        <View width={150} flexDirection='row' gap={2}>
          <Button variant='text' fullWidth>
            {invoicesItemsOverview.invoicesClarification1 || 0}
          </Button>
          <Button variant='text' color='error' fullWidth>
            {invoicesItemsOverview.invoicesClarification1Warning || 0}
          </Button>
        </View>
      </View>
      <View flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Typography>{t('app.home.invoices-items-overview.invoices.in-clarification2')}</Typography>
        <View width={150} flexDirection='row' gap={2}>
          <Button variant='text' fullWidth>
            {invoicesItemsOverview.invoicesClarification2Warning || 0}
          </Button>
          <Button variant='text' color='error' fullWidth>
            {invoicesItemsOverview.invoicesClarification2Warning || 0}
          </Button>
        </View>
      </View>
      <View flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Typography>{t('app.home.invoices-items-overview.invoices.pending')}</Typography>
        <View width={150} flexDirection='row' gap={2}>
          <Button variant='text' fullWidth>
            {invoicesItemsOverview.invoicesPending || 0}
          </Button>
          <Button variant='text' color='error' fullWidth>
            {invoicesItemsOverview.invoicesPendingWarning || 0}
          </Button>
        </View>
      </View>
      <Divider style={{ marginTop: '10px', marginBottom: '30px' }} />
      <View flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Typography>{t('app.home.invoices-items-overview.over24h')}</Typography>
        <View width={150} flexDirection='row' gap={2}>
          <Button variant='text' fullWidth>
            {invoicesItemsOverview.over24H || 0}
          </Button>
          <Button variant='text' color='error' fullWidth></Button>
        </View>
      </View>
      <View flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Typography>{t('app.home.invoices-items-overview.over48h')}</Typography>
        <View width={150} flexDirection='row' gap={2}>
          <Button variant='text' fullWidth>
            {invoicesItemsOverview.over48H || 0}
          </Button>
          <Button variant='text' color='error' fullWidth></Button>
        </View>
      </View>
      <View flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Typography>{t('app.home.invoices-items-overview.checked')}</Typography>
        <View width={150} flexDirection='row' gap={2}>
          <Button variant='text' fullWidth>
            {invoicesItemsOverview.invoicesChecked || 0}
          </Button>
          <Button variant='text' color='error' fullWidth>
            {invoicesItemsOverview.invoicesCheckedWarning || 0}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default TabInvoicesItemsOverview;
