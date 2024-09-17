import Filter from '~/base/components/Filter';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import Button from '~/base/components/Material/Button';
import Tooltip from '~/base/components/Material/Tooltip';
import View from '~/base/components/Material/View';

type Props = {
  onToggleFilter: () => void;
};

export const FormAction = (props: Props) => {
  const { onToggleFilter } = props;

  return (
    <View flexDirection='row' justifyContent='end' alignItems='end' gap={3}>
      <Filter.ButtonGroup>
        <Tooltip title='Change filter'>
          <Button onClick={onToggleFilter}>
            <FontAwesomeIcon icon='fa-solid fa-filter' />
          </Button>
        </Tooltip>
      </Filter.ButtonGroup>
    </View>
  );
};
