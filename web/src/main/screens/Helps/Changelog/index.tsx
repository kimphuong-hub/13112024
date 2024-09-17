import { List, ListItem, chipClasses } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import Chip from '~/base/components/Material/Chip';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import Section from '~/base/components/Material/View/Section';
import LayoutWrapper from '~/base/layout/Wrapper';
import { TypographyTimerStyled, TypographyTitleStyled } from './styles';

const HelpsChangelogScreen = () => {
  const { t } = useTranslation();

  return (
    <LayoutWrapper title={t('app.title.helps.changelog')} breadcrumbs={{ title: t('app.breadcrumb.helps.changelog') }}>
      <View p='20px' gap={2}>
        <Section gap={0}>
          <TypographyTitleStyled>5.1.25</TypographyTitleStyled>
          <List>
            <ListItem>
              <View gap={2}>
                <View flexDirection='row' gap={1.5}>
                  <FontAwesomeIcon icon='fa-solid fa-circle' size={5} style={{ marginTop: 10 }} />
                  <View gap={1}>
                    <View flexDirection='row'>
                      <Chip
                        label='For Administrators'
                        size='small'
                        sx={{ [`& .${chipClasses.label}`]: { fontSize: 11 } }}
                      />
                    </View>
                    <View>
                      <Typography variant='body1' gutterBottom>
                        With the update on Wednesday, 06.03.2024, a new feature will be activated in standing orders.
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        The field Bank transfer will be introduced in standing orders. Invoices that are generated from
                        a standing order with Bank transfer text have the corresponding value filled in Bank transfer.
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        Subsequent automated maintenance does not take place, but can be carried out manually by the
                        user.
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        If the bank transfer field in the original invoice is already filled before a standing order is
                        created, it will be pre-filled in the screen for creating the standing order.
                      </Typography>
                    </View>
                  </View>
                </View>
                <View display='flex' flexDirection='row' gap={1.5}>
                  <FontAwesomeIcon icon='fa-solid fa-circle' size={5} style={{ marginTop: 10 }} />
                  <View flexDirection='column' gap={1}>
                    <View flexDirection='row'>
                      <Chip
                        label='For Administrators'
                        size='small'
                        sx={{ [`& .${chipClasses.label}`]: { fontSize: 11 } }}
                      />
                    </View>
                    <View>
                      <Typography variant='body1' gutterBottom>
                        With the update on Wednesday, 06.03.2024, a new function will be activated:
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        The note of the origin invoice is displayed in the &quot;Requests for approval&quot; list.
                      </Typography>
                    </View>
                  </View>
                </View>
              </View>
            </ListItem>
          </List>
          <TypographyTimerStyled>06/03/2024</TypographyTimerStyled>
        </Section>
        <Section gap={0}>
          <TypographyTitleStyled>5.1.14</TypographyTitleStyled>
          <List>
            <ListItem>
              <View gap={2}>
                <View display='flex' flexDirection='row' gap={1.5}>
                  <FontAwesomeIcon icon='fa-solid fa-circle' size={5} style={{ marginTop: 10 }} />
                  <View flexDirection='column' gap={1}>
                    <View flexDirection='row'>
                      <Chip
                        label='For Administrators'
                        size='small'
                        sx={{ [`& .${chipClasses.label}`]: { fontSize: 11 } }}
                      />
                    </View>
                    <View>
                      <Typography variant='body1' gutterBottom>
                        With the update on Wednesday, 20.12.2023, an additional hover will be introduced for you as a
                        partner administrator. In the pending invoices lists, the archive and the invoice single view,
                        the debtor ID and the financial accounting client no. will be displayed as a mouse-over during
                        operation.
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        The customer note is omitted as this function is only visible to administrators.
                      </Typography>
                    </View>
                  </View>
                </View>
              </View>
            </ListItem>
          </List>
          <TypographyTimerStyled>20/12/2023</TypographyTimerStyled>
        </Section>
        <Section gap={0}>
          <TypographyTitleStyled>5.1.4</TypographyTitleStyled>
          <List>
            <ListItem>
              <View gap={2}>
                <View display='flex' flexDirection='row' gap={1.5}>
                  <FontAwesomeIcon icon='fa-solid fa-circle' size={5} style={{ marginTop: 10 }} />
                  <View flexDirection='column' gap={1}>
                    <View>
                      <Typography variant='body1' gutterBottom>
                        Invoice detail view: Creditor details extended by system creditor number and subledger account.
                      </Typography>
                    </View>
                  </View>
                </View>
                <View display='flex' flexDirection='row' gap={1.5}>
                  <FontAwesomeIcon icon='fa-solid fa-circle' size={5} style={{ marginTop: 10 }} />
                  <View flexDirection='column' gap={1}>
                    <View flexDirection='row'>
                      <Chip
                        label='For Administrators'
                        size='small'
                        sx={{ [`& .${chipClasses.label}`]: { fontSize: 11 } }}
                      />
                    </View>
                    <View>
                      <Typography variant='body1' gutterBottom>
                        With the update on Wednesday, 11.10.2023, a new function will be activated:
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        In the advanced creditor information in the single detail view, the system creditor number and
                        the subledger account of the creditor are displayed.
                      </Typography>
                    </View>
                  </View>
                </View>
              </View>
            </ListItem>
          </List>
          <TypographyTimerStyled>11/10/2023</TypographyTimerStyled>
        </Section>
        <Section gap={0}>
          <TypographyTitleStyled>5.1.1</TypographyTitleStyled>
          <List>
            <ListItem>
              <View gap={2}>
                <View display='flex' flexDirection='row' gap={1.5}>
                  <FontAwesomeIcon icon='fa-solid fa-circle' size={5} style={{ marginTop: 10 }} />
                  <View flexDirection='column' gap={1}>
                    <View>
                      <Typography variant='body1' gutterBottom>
                        From now on it is possible to send e-mails for EVERY entry of an invoice note (to a fix defined
                        recipient address).
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        If you have any questions, please do not hesitate to contact our customer service.
                      </Typography>
                    </View>
                  </View>
                </View>
                <View display='flex' flexDirection='row' gap={1.5}>
                  <FontAwesomeIcon icon='fa-solid fa-circle' size={5} style={{ marginTop: 10 }} />
                  <View flexDirection='column' gap={1}>
                    <View flexDirection='row'>
                      <Chip
                        label='For Administrators'
                        size='small'
                        sx={{ [`& .${chipClasses.label}`]: { fontSize: 11 } }}
                      />
                    </View>
                    <View>
                      <Typography variant='body1' gutterBottom>
                        With the update on Wednesday, 20.09.2023, a new function will be activated:
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        Under &quot;System settings {`->`} E-mail&quot; there will be the option: &quot;E-mail address
                        for invoice note&quot;.
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        As soon as one or more e-mail addresses have been entered there, an e-mail will be sent to
                        this/these address(es) whenever an invoice note is entered. The e-mail is formatted in the
                        system language and contains all notes entered as well as the invoice header data.
                      </Typography>
                      <Typography variant='body1' gutterBottom>
                        The default setting is &quot;deactivated&quot; (= the field does not contain any e-mail
                        address(es)).
                      </Typography>
                    </View>
                  </View>
                </View>
              </View>
            </ListItem>
          </List>
          <TypographyTimerStyled>20/09/2023</TypographyTimerStyled>
        </Section>
      </View>
    </LayoutWrapper>
  );
};

export default HelpsChangelogScreen;
