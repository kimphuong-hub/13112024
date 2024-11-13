import { useTheme, Grid } from '@mui/material';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { initialValues, validationSchema } from '../../common/types';
import { Field, Formik, Form } from 'formik';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import Button from '~/base/components/Material/Button';
import TextField from '~/base/components/Material/Form/TextField';
import Tooltip from '~/base/components/Material/Tooltip';
import Typography from '~/base/components/Material/Typography';
import View from '~/base/components/Material/View';
import DataGrid from '~/base/components/Material/DataGrid';
import { toast } from 'react-hot-toast';
import { useColumns } from './columns';

const sampleUsers = [
  { id: '1', name: 'hugo', description: 'abcdyz' },
  { id: '2', name: 'joni', description: 'xyzabc' },
  { id: '3', name: 'choni', description: 'xcbazy' },
  { id: '4', name: 'beta', description: 'abcdyz' },
  { id: '5', name: 'chery', description: 'xyzabc' },
  { id: '6', name: 'kiwwi', description: 'xcbazy' },
  { id: '7', name: 'nichu', description: 'abcdyz' },
  { id: '8', name: 'hawai', description: 'xyzabc' },
  { id: '9', name: 'aipi', description: 'xcbazy' }
];

const UserList = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [searchValue] = useState('');
  const [users] = useState(sampleUsers);
  const [loading] = useState(false);

  const filterUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.description.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, users]);

  return (
    <View flexGrow={1} gap={2}>
      <View flexDirection='row' alignItems='center' gap={1}>
        <Tooltip title={t('app.system.create.tooltip')}>
          <Button variant='contained' onClick={() => {}}>
            <FontAwesomeIcon icon='fa-regular fa-plus' size={12} color={theme.palette.common.white} />
          </Button>
        </Tooltip>
        <Tooltip title={t('app.system.delete.tooltip')}>
          <Button color='error' variant='contained'>
            <FontAwesomeIcon icon='fa-regular fa-minus' size={12} color={theme.palette.common.white} />
          </Button>
        </Tooltip>
      </View>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={() => {
          toast.success('User created successfully!');
        }}
      >
        {({ handleChange, handleBlur, touched, errors }) => (
          <Form>
            <View>
              <Typography variant='subtitle1'>Name:</Typography>
              <Field
                as={TextField}
                variant='outlined'
                name='name'
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                onKeyDown={(e: { key: string; preventDefault: () => void }) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
              />
              <Typography variant='subtitle1'>Description:</Typography>
              <Field
                as={TextField}
                variant='outlined'
                name='description'
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                onKeyDown={(e: { key: string; preventDefault: () => void }) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
              />
            </View>
          </Form>
        )}
      </Formik>

      <Grid item xs={12}>
        <View sx={{ height: '600px' }}>
          <DataGrid
            rows={filterUsers}
            columns={useColumns(t)}
            getRowId={(row) => row.id}
            hideFooter
            loading={loading}
            
          />
        </View>
      </Grid>
    </View>
  );
};

export default memo(UserList);
