import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import IconButton from '~/base/components/Material/Button/Icon';
import View from '~/base/components/Material/View';

type Props = {
  onSubmit: () => void;
};

export const FormAction = (props: Props) => {
  const { onSubmit } = props;

  return (
    <View alignItems='flex-end' flexGrow={1}>
      <IconButton onClick={onSubmit}>
        <FontAwesomeIcon icon='fa-solid fa-floppy-disk' size={18} />
      </IconButton>
    </View>
  );
};
