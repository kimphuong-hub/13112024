import { CircularProgress, Drawer, LinearProgress } from '@mui/material';
import moment from 'moment';
import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutNotFound from '~/base/layout/NotFound';
import LayoutWrapper from '~/base/layout/Wrapper';
import KeyCode from '~/const/keycode';
import { BreadcrumbRoute } from '~/const/route/types';
import { GroupAccountResponse } from '~/main/features/account-settings/group-accounts/types';
import { getAllocationArchivesDetail } from '~/main/features/allocation/archives/action';
import { getAllocationItemsDetail } from '~/main/features/allocation/items/action';
import { AllocationItemsDetailResponse } from '~/main/features/allocation/items/types';
import { useAltKeyDoublePress, useKeyPress } from '~/main/hooks/useKeyPress';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import Main from './Main';
import { FormAction } from './components/FormAction';

const DetailItemsHistory = lazy(() => import('./components/Drawer/ItemsHistory'));
const DetailGroupAccounts = lazy(() => import('./components/Drawer/GroupAccounts'));

type Props = {
  type?: 'items' | 'archives';
};

const AllocationItemsUpdateScreen = (props: Props) => {
  const { type = 'items' } = props;
  const { t } = useTranslation();

  const { companyNo = '' } = useParams();

  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || '';
  const toDate = searchParams.get('to-date') || moment().format('YYYY-MM-DD');
  const fromDate = searchParams.get('from-date') || moment().day(-7).format('YYYY-MM-DD');

  const mainRef = useRef<{ save: () => void; toggleVisibleFilePdf: () => void }>(null);
  const splitPaneRef = useRef<{ sizesPane: number[]; switchPane: (status?: 'open' | 'close') => void }>(null);

  const dispatch = useDispatchApp();
  const allocation = useSelectorApp((state) => {
    const allocation = state.allocation;

    let details: AllocationItemsDetailResponse[] = [];
    let detailsStatus = '';
    let companyName = '';

    if (type === 'items') {
      const items = allocation.items.details?.[companyNo]?.[status] || {};
      details = items.data;
      companyName = items.companyName;
      detailsStatus = items.status;
    } else if (type === 'archives') {
      const archives = allocation.archives.details?.[companyNo] || {};
      details = archives.data;
      companyName = archives.companyName;
      detailsStatus = archives.status;
    }

    return { details, detailsStatus, companyName };
  });

  const { details, detailsStatus, companyName } = allocation;

  const [isLoaded, setIsLoaded] = useState(false);

  const [visibleDrawer, setVisibleDrawer] = useState('');
  const [visibleDrawerDebounce] = useDebounce(visibleDrawer, 100);

  const [groupAccountSelected, setGroupAccountSelected] = useState<GroupAccountResponse | null>(null);
  const [allocationItemSelected, setAllocationItemSelected] = useState<AllocationItemsDetailResponse | null>(null);

  const getData = useCallback(() => {
    if (!companyNo) {
      return;
    }

    if (type === 'items' && status) {
      dispatch(getAllocationItemsDetail({ status, companyNo })).then(() => {
        setIsLoaded(true);
      });
    } else if (type === 'archives' && toDate && fromDate) {
      dispatch(getAllocationArchivesDetail({ toDate, fromDate, companyNo })).then(() => {
        setIsLoaded(true);
      });
    }
  }, [companyNo, dispatch, fromDate, status, toDate, type]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onToggleDrawer = useCallback((name: string) => {
    setVisibleDrawer((prev) => (prev === name ? '' : name));
  }, []);

  const wrapperParams = useMemo(() => {
    const statusTitle = status
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    const companyTitle = `${companyNo || ''}${companyName ? ` - ${companyName}` : ''}`;

    let breadcrumbsLastItems: BreadcrumbRoute[] = [];
    if (type === 'items') {
      breadcrumbsLastItems = [
        { id: `allocation.items.${companyNo}`, title: companyTitle, navigate: false },
        { id: `allocation.items.${companyNo}.${statusTitle}`, title: statusTitle, navigate: false }
      ];
    } else if (type === 'archives') {
      breadcrumbsLastItems = [{ id: `allocation.items.${companyNo}`, title: companyTitle, navigate: false }];
    }

    return {
      title: `${companyTitle} | ${statusTitle} | ${t('app.title.allocation.items')}`,
      breadcrumbsLastItems
    };
  }, [companyName, companyNo, status, t, type]);

  useKeyPress([KeyCode.VALUE_F2, KeyCode.VALUE_F12], (event) => {
    event.preventDefault();

    if (type === 'items' && event.key === KeyCode.VALUE_F2) {
      mainRef.current?.save();
    }

    if (event.key === KeyCode.VALUE_F12) {
      splitPaneRef.current?.switchPane();
    }
  });

  useAltKeyDoublePress([KeyCode.VALUE_V, KeyCode.VALUE_G, KeyCode.VALUE_H, KeyCode.VALUE_SLASH], (event) => {
    event.preventDefault();

    if (event.key === KeyCode.VALUE_V) {
      mainRef.current?.toggleVisibleFilePdf();
    }

    if (event.key === KeyCode.VALUE_G) {
      setVisibleDrawer(visibleDrawer === 'group-accounts' ? '' : 'group-accounts');
    }

    if (event.key === KeyCode.VALUE_H) {
      setVisibleDrawer(visibleDrawer === 'items-history' ? '' : 'items-history');
    }

    if (event.key === KeyCode.VALUE_SLASH) {
      setVisibleDrawer(visibleDrawer === 'send-clarification' ? '' : 'send-clarification');
    }
  });

  if ((type === 'items' && !status) || (type === 'archives' && (!toDate || !fromDate)) || (isLoaded && !companyName)) {
    return <LayoutNotFound />;
  }

  return (
    <LayoutWrapper
      title={wrapperParams.title}
      breadcrumbs={{
        title: t('app.breadcrumb.allocation'),
        loading: detailsStatus === 'loading',
        lastItems: wrapperParams.breadcrumbsLastItems,
        rightComponent: isLoaded ? (
          <FormAction
            {...(type === 'items' && { onSubmit: mainRef.current?.save })}
            onToggleItemsHistory={() => onToggleDrawer('items-history')}
            onToggleGroupAccounts={() => onToggleDrawer('group-accounts')}
            onToggleSendClarification={() => onToggleDrawer('send-clarification')}
          />
        ) : null
      }}
    >
      <View id='drawer-container' position='relative' p='20px' flexGrow={1} gap={2}>
        <Section style={{ padding: 10 }} flexGrow={1}>
          {isLoaded && (
            <Main
              ref={mainRef}
              type={type}
              getData={getData}
              details={details}
              detailsStatus={detailsStatus}
              splitPaneRef={splitPaneRef}
              onSelectGroupAccount={setGroupAccountSelected}
              onSelectAllocationItem={setAllocationItemSelected}
            />
          )}
          {!isLoaded && (
            <View flexGrow={1} alignItems='center' justifyContent='center'>
              <CircularProgress />
            </View>
          )}
        </Section>
        {visibleDrawerDebounce === 'items-history' && (
          <Drawer
            anchor='bottom'
            open={visibleDrawer === 'items-history'}
            onClose={() => onToggleDrawer('items-history')}
            slotProps={{ backdrop: { style: { position: 'absolute' } } }}
            PaperProps={{ style: { position: 'absolute' } }}
            ModalProps={{
              style: { position: 'absolute' },
              container: document.getElementById('drawer-container'),
              keepMounted: true
            }}
          >
            <Suspense fallback={<LinearProgress />}>
              <DetailItemsHistory searchValue={allocationItemSelected?.itemName} />
            </Suspense>
          </Drawer>
        )}
        {visibleDrawerDebounce === 'group-accounts' && (
          <Drawer
            anchor='bottom'
            open={visibleDrawer === 'group-accounts'}
            onClose={() => onToggleDrawer('groups-accounts')}
            slotProps={{ backdrop: { style: { position: 'absolute' } } }}
            PaperProps={{ style: { position: 'absolute' } }}
            ModalProps={{
              style: { position: 'absolute' },
              container: document.getElementById('drawer-container'),
              keepMounted: true
            }}
          >
            <Suspense fallback={<LinearProgress />}>
              <DetailGroupAccounts companyNo={companyNo} groupAccountId={groupAccountSelected?.id} />
            </Suspense>
          </Drawer>
        )}
        {visibleDrawerDebounce === 'send-clarification' && (
          <Drawer
            anchor='right'
            open={visibleDrawer === 'send-clarification'}
            onClose={() => onToggleDrawer('groups-accounts')}
            slotProps={{ backdrop: { style: { position: 'absolute' } } }}
            PaperProps={{ style: { position: 'absolute' } }}
            ModalProps={{
              style: { position: 'absolute' },
              container: document.getElementById('drawer-container'),
              keepMounted: true
            }}
          >
            <Suspense fallback={<LinearProgress />}>
              {/* <DetailGroupAccounts companyNo={companyNo} groupAccountId={groupAccountSelected?.id} /> */}
            </Suspense>
          </Drawer>
        )}
      </View>
    </LayoutWrapper>
  );
};

export default AllocationItemsUpdateScreen;
