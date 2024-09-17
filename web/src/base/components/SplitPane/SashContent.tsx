import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SashContent as SashContentDefault } from 'split-pane-react';
import Tooltip from '~/base/components/Material/Tooltip';

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
    <Box
      display='flex'
      justifyContent={split === 'vertical' ? 'start' : 'center'}
      alignItems='center'
      flexDirection={split === 'vertical' ? 'row' : 'column'}
      width='100%'
      height='100%'
      bgcolor='#E0E0E0'
    >
      <SashContentDefault />
      <Box
        display='flex'
        justifyContent={split === 'vertical' ? 'start' : 'center'}
        alignItems='center'
        flexDirection={split === 'vertical' ? 'row' : 'column'}
        position='absolute'
        {...(split === 'vertical' ? {} : { bottom: open ? '0' : '4px' })}
        width={split === 'vertical' ? '5px' : '100%'}
        height={split === 'vertical' ? '100%' : '5px'}
        bgcolor='#E0E0E0'
      >
        <Tooltip title={title || t('app.system.split-pane.sash.tooltip')}>
          <Box
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
      </Box>
    </Box>
  );
}
