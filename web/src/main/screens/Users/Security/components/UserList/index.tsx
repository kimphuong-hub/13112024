
import { useTheme, Grid } from '@mui/material';
import { memo, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
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

const UserList = ({ selectedUser }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();  
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/Permission');
      const data = await response.json();
      setUsers(data); 
      setLoading(false); 
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      setLoading(false);
      toast.error(t('app.system.load.failed')); 
    }
  }, [t]);

  useEffect(() => {
    fetchUsers(); 
  }, [fetchUsers]);

  const handleRowClick = () => {
    navigate(`permissionrole`);
  };

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
       enableReinitialize
       initialValues={{
         name: selectedUser?.Name || '',
         description: selectedUser?.Description || ''
       }}
       onSubmit={(values) => {
         console.log('Form values:', values);
       }}
     >
        {({ handleChange, handleBlur}) => (
          <Form>
            <View>
              <Typography variant='subtitle1'>Name:</Typography>
              <Field
                as={TextField}
                name='name'
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth           
              />
              <Typography variant='subtitle1'>Description:</Typography>
              <Field
                as={TextField}
                name='description'
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />
            </View>
          </Form>
        )}
      </Formik>

      <Grid item xs={12}>
        <View sx={{ height: '600px' }}>
          <DataGrid
            rows={users} 
            columns={useColumns(t)} 
            getRowId={(row) => row.Id}
            hideFooter
            loading={loading}
            onRowClick={handleRowClick} 
          />
        </View>
      </Grid>
    </View>
  );
};

export default memo(UserList);
