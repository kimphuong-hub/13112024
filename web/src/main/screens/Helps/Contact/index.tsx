import { Divider } from '@mui/material';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import BoxInput from '~/base/components/Material/Box/Input';
import Dialog from '~/base/components/Material/Dialog';
import Label from '~/base/components/Material/Form/Label';
import TextField from '~/base/components/Material/Form/TextField';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import { MenuModal } from '~/const/route/types';

export const HelpsContactScreen = (props: MenuModal) => {
  const { open, onClose } = props;

  return (
    <Dialog.Wrapper open={open} PaperProps={{ sx: { maxWidth: 800 } }} onClose={onClose}>
      <Dialog.Header title='Contact' onClose={onClose} />
      <Dialog.Content>
        <View width='800px' p='20px' overflow='auto' gap={1}>
          <Section border='1px solid rgba(0, 0, 0, .125)' style={{ boxShadow: 'none' }} gap={2}>
            <View gap={1}>
              <Typography fontWeight='bold'>Your Invoice Support:</Typography>
              <View flexDirection='row' gap={5}>
                <View>
                  <Typography>Monday - Friday</Typography>
                  <Typography>
                    <FontAwesomeIcon icon='fa-solid fa-envelope' size={12} /> support@cisbox.com
                  </Typography>
                </View>
                <View>
                  <Typography>08:00 Uhr - 17:00 Uhr</Typography>
                  <Typography>
                    <FontAwesomeIcon icon='fa-solid fa-phone' size={12} /> +49 (0) 212 23150
                  </Typography>
                </View>
              </View>
            </View>
            <Divider />
            <View gap={2}>
              <BoxInput gap={4}>
                <Label style={{ marginTop: '7px' }}>Your name</Label>
                <TextField style={{ width: '70%' }} />
              </BoxInput>
              <BoxInput gap={4}>
                <Label style={{ marginTop: '7px' }}>Your email</Label>
                <TextField style={{ width: '70%' }} />
              </BoxInput>
              <BoxInput gap={4}>
                <Label style={{ marginTop: '7px' }}>Phone number</Label>
                <TextField style={{ width: '70%' }} />
              </BoxInput>
              <BoxInput gap={4}>
                <Label style={{ marginTop: '7px' }}>Your message*</Label>
                <TextField style={{ width: '70%' }} rows={10} multiline />
              </BoxInput>
            </View>
          </Section>
        </View>
      </Dialog.Content>
      <Dialog.Footer>
        <View flexDirection='row' justifyContent='flex-end' gap={1}>
          <Dialog.Button>Send message</Dialog.Button>
          <Dialog.Button color='secondary'>Back without sending</Dialog.Button>
        </View>
      </Dialog.Footer>
    </Dialog.Wrapper>
  );
};
