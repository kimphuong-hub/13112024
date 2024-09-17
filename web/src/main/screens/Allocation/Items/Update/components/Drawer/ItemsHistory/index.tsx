import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Section from '~/base/components/Material/View/Section';
import { DEBOUNCE_SEARCH_TIMER } from '~/core/config/debounce';
import ItemsHistory from '~/main/components/Items/History';

type Props = {
  companyNo?: string;
  searchValue?: string;
};

const DetailItemsHistory = (props: Props) => {
  const { companyNo = 0, searchValue: defaultSearchValue = '' } = props;

  const { innerHeight: height } = window;

  const [searchValue, setSearchValue] = useState(defaultSearchValue);

  const onSearchModelChange = useDebouncedCallback((event) => {
    const searchValue = event.target.value.trim();
    setSearchValue(searchValue);
  }, DEBOUNCE_SEARCH_TIMER);

  return (
    <Section height={height / 1.6}>
      <ItemsHistory companyNo={companyNo} searchValue={searchValue} onSearchValue={onSearchModelChange} />
    </Section>
  );
};

export default DetailItemsHistory;
