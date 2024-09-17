import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DefaultSplitPane from 'split-pane-react/esm/SplitPane';
import SashContent from './SashContent';

type SplitPaneProps = Omit<React.ComponentProps<typeof DefaultSplitPane>, 'sizes' | 'sashRender' | 'onChange'> & {
  sashRender?: (index: number, active: boolean) => React.ReactNode;
  onChange?: (sizes: number[]) => void;
  onSwitchPane?: (status: 'open' | 'close') => void;

  loading: boolean;
  initialSizesPane: number[];
  initialSizesPaneClose: number[];
};

const SplitPane = forwardRef((props: SplitPaneProps, ref) => {
  const {
    split = 'vertical',
    sashRender,
    onChange,
    onSwitchPane,
    loading,
    initialSizesPane,
    initialSizesPaneClose,
    ...restProps
  } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const sizePane = searchParams.get('size-pane') || '';

  const [sizesPane, setSizesPane] = useState(sizePane ? sizePane.split('-').map(Number) : initialSizesPaneClose);

  const onChangeProxy = useCallback(
    (sizes: number[]) => {
      const sizePane = sizes.map((size) => Math.round(size));

      searchParams.set('size-pane', sizePane.join('-'));
      setSearchParams(searchParams, { replace: true });

      setSizesPane(sizePane);

      if (onChange) {
        onChange(sizes);
      }
    },
    [onChange, searchParams, setSearchParams]
  );

  const onSwitchPaneProxy = useCallback(
    (status?: 'open' | 'close') => {
      if (!status) {
        if (sizesPane[1] === 0) {
          status = 'open';
        } else {
          status = 'close';
        }
      }

      if (onSwitchPane) {
        onSwitchPane(status);
      }

      if (status === 'open') {
        setSizesPane(initialSizesPane);
        searchParams.set('size-pane', initialSizesPane.join('-'));
        setSearchParams(searchParams, { replace: true });
        return;
      }

      if (status === 'close') {
        setSizesPane(initialSizesPaneClose);
        searchParams.delete('size-pane');
        setSearchParams(searchParams, { replace: true });
        return;
      }
    },
    [initialSizesPane, initialSizesPaneClose, onSwitchPane, searchParams, setSearchParams, sizesPane]
  );

  useImperativeHandle(ref, () => {
    return {
      sizesPane,
      switchPane(status?: 'open' | 'close') {
        onSwitchPaneProxy(status);
      }
    };
  }, [onSwitchPaneProxy, sizesPane]);

  return (
    <DefaultSplitPane
      split={split}
      sizes={sizesPane}
      sashRender={(index: number, active: boolean) => {
        if (sashRender) {
          sashRender(index, active);
        }
        return loading ? (
          <SashContent open={sizesPane[1] > 0} split={split} onSwitch={() => onSwitchPaneProxy()} />
        ) : null;
      }}
      onChange={onChangeProxy}
      {...restProps}
    />
  );
});

SplitPane.displayName = 'SplitPane';

export default SplitPane;
