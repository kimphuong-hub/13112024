import { ListItemIcon, ListItemText, MenuItem, styled } from '@mui/material';
import {
  DataGridProps as DefaultDataGridProps,
  GridCallbackDetails,
  GridColumnMenu,
  GridColumnMenuItemProps,
  GridColumnMenuProps,
  GridColumnResizeParams,
  GridColumnVisibilityModel,
  GridLocaleText,
  DataGrid as MuiDataGrid,
  MuiEvent
} from '@mui/x-data-grid';
import { TFunction } from 'i18next';
import { SyntheticEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import View from '../View';

export type DataGridProps = DefaultDataGridProps & {
  name?: string;
  defaultHeight?: number;
  onResetSizeColumns?: () => void;
  onColumnVisibilityModelChange?: (model: GridColumnVisibilityModel, details: GridCallbackDetails) => void;
  disableStyleFocusedCell?: boolean;
};

const getSlotProps = (t: TFunction<'translation', undefined>): Partial<DataGridProps['slotProps']> => ({
  basePopper: {
    sx: {
      '& .MuiDataGrid-menuList': {
        '& .MuiTypography-root': {
          fontSize: 13
        },
        '& .MuiSvgIcon-root': {
          fontSize: 15
        }
      }
    }
  },
  pagination: {
    showLastButton: true,
    showFirstButton: true,
    labelRowsPerPage: t('app.grid.pagination.rows-per-page')
  },
  columnsPanel: {
    sx: {
      '&': {
        '& .MuiInputBase-input': {
          fontSize: 14
        },
        '& .MuiTypography-root': {
          fontSize: 14
        },
        '& .MuiSvgIcon-root': {
          fontSize: 15
        },
        '& .MuiButtonBase-root': {
          fontSize: 13
        }
      }
    }
  },
  columnsManagement: {}
});

const getLocaleText = (t: TFunction<'translation', undefined>): Partial<GridLocaleText> => ({
  noRowsLabel: t('app.grid.no-rows'),
  columnMenuLabel: t('app.grid.column.menu.label'),
  columnMenuFilter: t('app.grid.column.menu.filter'),
  columnMenuSortAsc: t('app.grid.column.menu.sort-asc'),
  columnMenuSortDesc: t('app.grid.column.menu.sort-desc'),
  columnMenuUnsort: t('app.grid.column.menu.unsort'),
  columnMenuHideColumn: t('app.grid.column.menu.hide-column'),
  columnMenuShowColumns: t('app.grid.column.menu.show-columns'),
  columnMenuManageColumns: t('app.grid.column.menu.manage-columns'),
  columnHeaderSortIconLabel: t('app.grid.column.header.sort-icon-label'),
  footerRowSelected: (count) => t('app.grid.footer.row.selected', { count })
});

const CustomUserItem = (props: GridColumnMenuItemProps) => {
  const { resetSizeColumnsTitle, onResetSizeColumnsClick } = props;

  return (
    <MenuItem onClick={onResetSizeColumnsClick}>
      <ListItemIcon>
        <FontAwesomeIcon icon='fa-regular fa-arrow-rotate-left' size={12} />
      </ListItemIcon>
      <ListItemText>{resetSizeColumnsTitle}</ListItemText>
    </MenuItem>
  );
};

const CustomColumnMenu = (
  props: GridColumnMenuProps & {
    onResetSizeColumns?: (hideMenu: () => void) => void;
  }
) => {
  const { hideMenu, onResetSizeColumns } = props;

  const { t } = useTranslation();

  return (
    <GridColumnMenu
      {...props}
      {...(onResetSizeColumns && {
        slots: { columnMenuUserItem: CustomUserItem },
        slotProps: {
          ...(onResetSizeColumns && {
            columnMenuUserItem: {
              displayOrder: 30,
              resetSizeColumnsTitle: t('app.grid.column.menu.reset-size-columns'),
              onResetSizeColumnsClick: (event: SyntheticEvent<Element, Event>) =>
                onResetSizeColumns(() => hideMenu(event))
            }
          })
        }
      })}
    />
  );
};

const DataGrid = styled((props: DataGridProps) => {
  const {
    name,
    columns,
    autoHeight = true,
    defaultHeight = 200,
    initialState,
    onResetSizeColumns,
    onColumnWidthChange,
    onColumnVisibilityModelChange,
    ...restProps
  } = props;

  const { t } = useTranslation();

  const boxRef = useRef<HTMLDivElement | null>(null);

  const columnWidthStorage = JSON.parse(localStorage.getItem('DataGridColumnWidth') || '{}');
  const [columnWidth, setColumnWidth] = useState(columnWidthStorage);

  const columnVisibility = JSON.parse(localStorage.getItem('DataGridColumnVisibility') || '{}');
  const columnVisibilityModel = name ? columnVisibility[name] : {};

  const onResetSizeColumnsProxy = useCallback(
    (hideMenu: () => void) => {
      if (name) {
        localStorage.setItem('DataGridColumnWidth', JSON.stringify({ ...columnWidth, [name]: {} }));
        setColumnWidth({ ...columnWidth, [name]: {} });

        hideMenu();
        if (onResetSizeColumns) {
          onResetSizeColumns();
        }
      }
    },
    [columnWidth, name, onResetSizeColumns]
  );

  const onColumnWidthChangeProxy = useCallback(
    (params: GridColumnResizeParams, event: MuiEvent<object | MouseEvent>, details: GridCallbackDetails) => {
      if (name) {
        const { field } = params.colDef;
        columnWidth[name] = { ...columnWidth[name], [field]: params.width };
        localStorage.setItem('DataGridColumnWidth', JSON.stringify(columnWidth));
      }
      if (onColumnWidthChange) {
        onColumnWidthChange(params, event, details);
      }
    },
    [columnWidth, name, onColumnWidthChange]
  );

  const onColumnVisibilityModelChangeProxy = useCallback(
    (model: GridColumnVisibilityModel, details: GridCallbackDetails) => {
      if (name) {
        columnVisibility[name] = model;
        localStorage.setItem('DataGridColumnVisibility', JSON.stringify(columnVisibility));
      }
      if (onColumnVisibilityModelChange) {
        onColumnVisibilityModelChange(model, details);
      }
    },
    [columnVisibility, name, onColumnVisibilityModelChange]
  );

  const { columns: initialStateColumns, ...restInitialState } = initialState || {};

  const columnsProxy = useMemo(() => {
    const columnWidthModel = name ? columnWidth[name] : {};
    return columns.map((column) => {
      const width = columnWidthModel?.[column.field] || column.width;
      if (width) return { ...column, width, flex: 0 };
      return column;
    });
  }, [columnWidth, columns, name]);

  if (!autoHeight) {
    return (
      <MuiDataGrid
        columns={columnsProxy}
        rowHeight={35}
        columnHeaderHeight={40}
        autoHeight={autoHeight}
        slots={{
          columnMenu: (props) => (
            <CustomColumnMenu {...(name && { onResetSizeColumns: onResetSizeColumnsProxy })} {...props} />
          )
        }}
        slotProps={getSlotProps(t)}
        localeText={getLocaleText(t)}
        initialState={{
          columns: { columnVisibilityModel, ...initialStateColumns },
          ...restInitialState
        }}
        onColumnWidthChange={onColumnWidthChangeProxy}
        onColumnVisibilityModelChange={onColumnVisibilityModelChangeProxy}
        disableColumnFilter
        {...restProps}
      />
    );
  }

  return (
    <View ref={boxRef} flexGrow={1}>
      <View height={boxRef.current?.clientHeight || defaultHeight} flexGrow={1}>
        <MuiDataGrid
          columns={columnsProxy}
          rowHeight={35}
          columnHeaderHeight={40}
          autoHeight={false}
          slots={{
            columnMenu: (props) => (
              <CustomColumnMenu {...(name && { onResetSizeColumns: onResetSizeColumnsProxy })} {...props} />
            )
          }}
          slotProps={getSlotProps(t)}
          localeText={getLocaleText(t)}
          initialState={{
            columns: { columnVisibilityModel, ...initialStateColumns },
            ...restInitialState
          }}
          onColumnWidthChange={onColumnWidthChangeProxy}
          onColumnVisibilityModelChange={onColumnVisibilityModelChangeProxy}
          disableColumnFilter
          {...restProps}
        />
      </View>
    </View>
  );
})(({ theme, disableStyleFocusedCell = false }) => ({
  [`&`]: {
    borderRadius: 0
  },
  [`& .MuiDataGrid-cell`]: { display: 'inline-flex', alignItems: 'center', fontSize: 12.5 },
  ...(disableStyleFocusedCell && {
    ['& .MuiDataGrid-cell:focus']: { outline: 'none' },
    ['& .MuiDataGrid-cell:focus-within']: { outline: 'none' },
    ['& .MuiDataGrid-cell.MuiDataGrid-cell--editing:focus-within']: { outline: 'none' }
  }),
  [`& .MuiDataGrid-columnHeader`]: {
    color: theme.palette.mode === 'dark' ? '#D8D8D8' : '#000000',
    backgroundColor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#FAFAFA'
  },
  [`& .MuiDataGrid-columnHeaderTitle`]: {
    fontSize: 12.5
  }
}));

export default DataGrid;
