import { useTranslation } from 'react-i18next';
import { SashContent as SashContentDefault } from 'split-pane-react';
import Tooltip from '~/base/components/Material/Tooltip';
import View from '../Material/View';

type Props = {
  open: boolean;
  split?: 'vertical' | 'horizontal';
  title?: string;
  onSwitch: () => void;
};

export default function SashContent(props: Props) {
  const { open, split = 'vertical', title, onSwitch } = props;

  const { t } = useTranslation();

  return (
    <View
      width='100%'
      height='100%'
      bgcolor='#E0E0E0'
      flexDirection={split === 'vertical' ? 'row' : 'column'}
      justifyContent={split === 'vertical' ? 'start' : 'center'}
      alignItems='center'
    >
      <SashContentDefault />
      <View
        width={split === 'vertical' ? '5px' : '100%'}
        height={split === 'vertical' ? '100%' : '5px'}
        bgcolor='#E0E0E0'
        position='absolute'
        alignItems='center'
        flexDirection={split === 'vertical' ? 'row' : 'column'}
        justifyContent={split === 'vertical' ? 'start' : 'center'}
        {...(split === 'vertical' ? {} : { bottom: open ? '0' : '4px' })}
      >
        <Tooltip title={title || t('app.system.split-pane.sash.tooltip')}>
          <View
            style={{
              ...(split === 'vertical'
                ? {
                    backgroundImage: open
                      ? 'url(/images/splitter/mini-right.gif)'
                      : 'url(/images/splitter/mini-left.gif)'
                  }
                : {
                    backgroundImage: open
                      ? 'url(/images/splitter/mini-bottom.gif)'
                      : 'url(/images/splitter/mini-top.gif)'
                  }),
              backgroundRepeat: 'no-repeat',
              cursor: 'pointer'
            }}
            position='absolute'
            width={split === 'vertical' ? '100%' : '35px'}
            height={split === 'vertical' ? '35px' : '100%'}
            onClick={onSwitch}
          />
        </Tooltip>
      </View>
    </View>
  );
}
