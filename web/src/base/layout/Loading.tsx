import { CircularProgress } from '@mui/material';
import LayoutWrapper from './Wrapper';
import View from '../components/Material/View';
import Section from '../components/Material/View/Section';

const LayoutLoading = () => {
  return (
    <LayoutWrapper>
      <View p='20px' flexGrow={1}>
        <Section flexGrow={1} alignItems='center' justifyContent='center'>
          <CircularProgress />
        </Section>
      </View>
    </LayoutWrapper>
  );
};

export default LayoutLoading;
