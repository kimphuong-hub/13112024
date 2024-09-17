import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import { DEBOUNCE_SEARCH_TIMER } from '~/core/config/debounce';
import ItemsHistory from '~/main/components/Items/History';

const SearchItemsHistoryScreen = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('q') || '';

  const onSearchModelChange = useDebouncedCallback((event) => {
    const searchValue = event.target.value.trim();

    if (searchValue) {
      searchParams.set('q', searchValue);
      setSearchParams(searchParams, { replace: true });
      return;
    }

    searchParams.delete('q');
    setSearchParams(searchParams, { replace: true });
  }, DEBOUNCE_SEARCH_TIMER);

  return (
    <LayoutWrapper title={t('app.title.search.items')} breadcrumbs={{ title: t('app.breadcrumb.search.items') }}>
      <View p='20px' flexGrow={1}>
        <Section flexGrow={1} gap={1}>
          <ItemsHistory name='search.items.history' searchValue={searchValue} onSearchValue={onSearchModelChange} />
        </Section>
      </View>
    </LayoutWrapper>
  );
};

export default SearchItemsHistoryScreen;
