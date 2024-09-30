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
import { AllocationItemsDetailChanged, AllocationItemsDetailResponse } from '~/main/features/allocation/items/types';
import { useAltKeyDoublePress, useKeyPress } from '~/main/hooks/useKeyPress';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import Main from './Main';
import { allowedStatus } from './common/config';
import DetailSendClarification from './components/Drawer/SendClarification';
import { FormAction } from './components/FormAction';
import { SelectedContextProvider } from './contexts/selected';

const DetailItemsHistory = lazy(() => import('./components/Drawer/ItemsHistory'));
const DetailGroupAccounts = lazy(() => import('./components/Drawer/GroupAccounts'));

type Props = {
  type?: 'items' | 'archives';
};

const AllocationItemsUpdateScreen = (props: Props) => {
  const { type = 'items' } = props;
  const { t } = useTranslation();

  const { companyNo } = useParams();

  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') ?? '';
  const toDate = searchParams.get('to-date') ?? moment().format('YYYY-MM-DD');
  const fromDate = searchParams.get('from-date') ?? moment().day(-7).format('YYYY-MM-DD');

  const mainRef = useRef<{
    save: () => void;
    submitForm: () => void;
    toggleVisibleFilePdf: () => void;
    onFirstRowSelected: (status: boolean) => void;
  }>(null);
  const splitPaneRef = useRef<{ sizesPane: number[]; switchPane: (status?: 'open' | 'close') => void }>(null);

  const dispatch = useDispatchApp();
  const allocation = useSelectorApp((state) => {
    const allocation = state.allocation;

    let details: AllocationItemsDetailResponse[] = [];
    let detailsStatus = '';
    let companyName = '';

    if (type === 'items') {
      const items = allocation.items.details?.[companyNo ?? '']?.[status] ?? {};
      details = items.data;
      companyName = items.companyName;
      detailsStatus = items.status;
    } else if (type === 'archives') {
      const archives = allocation.archives.details?.[companyNo ?? ''] ?? {};
      details = archives.data;
      companyName = archives.companyName;
      detailsStatus = archives.status;
    }

    return { details, detailsStatus, companyName };
  });

  const { details, detailsStatus, companyName } = allocation;

  const [loaded, setLoaded] = useState(false);

  const [visibleDrawer, setVisibleDrawer] = useState('');
  const [visibleDrawerDebounce] = useDebounce(visibleDrawer, 100);

  const [groupAccount, setGroupAccount] = useState<GroupAccountResponse | null>(null);
  const [allocationItem, setAllocationItem] = useState<AllocationItemsDetailResponse | null>(null);

  const [itemsChanged, setItemsChanged] = useState<{ [itemId: string]: AllocationItemsDetailChanged }>({});

  const getData = useCallback(
    (callback?: () => void) => {
      if (!companyNo) {
        return;
      }

      if (type === 'items' && status) {
        dispatch(getAllocationItemsDetail({ status, companyNo })).then(() => {
          setLoaded(true);
          callback?.();
        });
      } else if (type === 'archives' && toDate && fromDate) {
        dispatch(getAllocationArchivesDetail({ toDate, fromDate, companyNo })).then(() => {
          setLoaded(true);
          callback?.();
        });
      }
    },
    [companyNo, dispatch, fromDate, status, toDate, type]
  );

  useEffect(() => {
    getData();
  }, [getData]);

  const onToggleDrawer = useCallback((name: string) => {
    setVisibleDrawer((prev) => (prev === name ? '' : name));
  }, []);

  const onToggleSendClarification = useCallback(() => {
    if (!allocationItem) {
      return;
    }

    if (!groupAccount) {
      mainRef.current?.submitForm();
    }

    onToggleDrawer('send-clarification');
  }, [allocationItem, groupAccount, onToggleDrawer]);

  const onSendCommentClarification = useCallback(
    (referenceIds: string[]) => {
      if (!companyNo || !allocationItem) {
        return;
      }

      Object.values(itemsChanged).forEach((item) => {
        if (item.id === allocationItem.id || referenceIds.includes(item.id)) {
          delete itemsChanged[item.id];
        }
      });

      getData(() => {
        onToggleDrawer('send-clarification');
        mainRef.current?.onFirstRowSelected(false);
      });
    },
    [allocationItem, companyNo, getData, itemsChanged, onToggleDrawer]
  );

  const wrapperParams = useMemo(() => {
    const statusTitle = status
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    const companyTitle = `${companyNo ?? ''}${companyName ? ` - ${companyName}` : ''}`;

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
      onToggleSendClarification();
    }
  });

  if (
    (type === 'items' && !allowedStatus.includes(status)) ||
    (type === 'archives' && (!toDate || !fromDate)) ||
    (loaded && !companyName)
  ) {
    return <LayoutNotFound />;
  }

  return (
    <LayoutWrapper
      title={wrapperParams.title}
      breadcrumbs={{
        title: t('app.breadcrumb.allocation'),
        loading: detailsStatus === 'loading',
        lastItems: wrapperParams.breadcrumbsLastItems,
        rightComponent: loaded ? (
          <FormAction
            {...(type === 'items' && { onSubmit: mainRef.current?.save })}
            onToggleItemsHistory={() => onToggleDrawer('items-history')}
            onToggleGroupAccounts={() => onToggleDrawer('group-accounts')}
            onToggleSendClarification={onToggleSendClarification}
          />
        ) : null
      }}
    >
      <SelectedContextProvider value={{ groupAccount, setGroupAccount, allocationItem, setAllocationItem }}>
        <View id='drawer-container' position='relative' p='20px' flexGrow={1} gap={2}>
          <Section style={{ padding: 10 }} flexGrow={1}>
            {loaded && (
              <Main
                ref={mainRef}
                type={type}
                getData={getData}
                details={details}
                detailsStatus={detailsStatus}
                itemsChanged={itemsChanged}
                onItemsChanged={setItemsChanged}
                splitPaneRef={splitPaneRef}
              />
            )}
            {!loaded && (
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
                <DetailItemsHistory searchValue={allocationItem?.itemName} />
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
                <DetailGroupAccounts companyNo={companyNo} groupAccountId={groupAccount?.id} />
              </Suspense>
            </Drawer>
          )}
          {visibleDrawerDebounce === 'send-clarification' && (
            <Drawer
              anchor='right'
              open={visibleDrawer === 'send-clarification'}
              onClose={onToggleSendClarification}
              slotProps={{ backdrop: { style: { position: 'absolute' } } }}
              PaperProps={{ style: { position: 'absolute' } }}
              ModalProps={{
                style: { position: 'absolute' },
                container: document.getElementById('drawer-container'),
                keepMounted: true
              }}
            >
              <Suspense fallback={<LinearProgress />}>
                <DetailSendClarification
                  details={details}
                  itemsChanged={itemsChanged}
                  onSendComment={onSendCommentClarification}
                />
              </Suspense>
            </Drawer>
          )}
        </View>
      </SelectedContextProvider>
    </LayoutWrapper>
  );
};

export default AllocationItemsUpdateScreen;
