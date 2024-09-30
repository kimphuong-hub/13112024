import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DataGrid from '~/base/components/Material/DataGrid';
import { getItemsHistory } from '~/main/features/items/action';
import { useDispatchApp, useSelectorApp } from '~/redux/store';
import TopBar from './TopBar';
import { useColumns } from './common/columns';

type Props = {
  name?: string;
  hideTopBar?: boolean;

  companyNo?: string | number;
  searchValue?: string;
  onSearchValue?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const ItemsHistory = (props: Props) => {
  const { name, hideTopBar = false, companyNo = 0, searchValue = '', onSearchValue } = props;

  const { t } = useTranslation();

  const dispatch = useDispatchApp();
  const defaultItemsHistory = useSelectorApp((state) => state.items.history);
  const { data: itemsHistory = [], status } = defaultItemsHistory[companyNo] || {};

  useEffect(() => {
    dispatch(
      getItemsHistory({
        group_nr: companyNo,
        items: [{ item_name: searchValue, item_vat: 0 }]
      })
    );
  }, [companyNo, dispatch, searchValue]);

  return (
    <>
      {!hideTopBar && <TopBar searchValue={searchValue} onSearchValue={onSearchValue} />}
      <DataGrid
        name={name}
        rows={itemsHistory}
        columns={useColumns(t)}
        getRowId={(row) => row.id}
        loading={status === 'loading'}
      />
    </>
  );
};

export default ItemsHistory;
