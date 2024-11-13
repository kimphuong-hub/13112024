// import { TFunction } from 'i18next';
// import { GridColDef } from '@mui/x-data-grid';
// import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
// import { useNavigate } from 'react-router-dom';
// import { deleteUserData } from '~/main/features/users/action';

// export const useColumns = (t: TFunction<'translation', undefined>): GridColDef[] => {
//   const navigate = useNavigate();

//   const handleEditClick = (id: any) => {
//     navigate(`/users/users/editusers/${id}`);
//   };
//   return [
//     {
//       width: 250,
//       field: 'displayname',
//       headerName: t('app.users.users.columns.displayname'),
//       sortingOrder: ['desc', 'asc', null]
//     },
//     {
//       minWidth: 250,
//       field: 'firstname',
//       headerName: t('app.users.users.columns.firstname'),
//       sortingOrder: ['desc', 'asc', null]
//     },
//     {
//       width: 250,
//       field: 'lastname',
//       headerName: t('app.users.users.columns.lastname'),
//       sortingOrder: ['desc', 'asc', null]
//     },
//     {
//       width: 250,
//       field: 'email',
//       headerName: t('app.users.users.columns.email'),
//       sortingOrder: ['desc', 'asc', null]
//     },
//     {
//       width: 250,
//       field: 'userstype',
//       headerName: t('app.users.users.columns.usertype'),
//       sortingOrder: ['desc', 'asc', null]
//     },
//     {
//       width: 250,
//       field: 'createddate',
//       headerName: t('app.users.users.columns.createddate'),
//       sortingOrder: ['desc', 'asc', null]
//     },
//     {
//       field: '',
//       sortable: false,
//       renderCell: (params) => {
//         function onToggleActive(id: any): void {
//         }

//         return (
//           <div>
//             <i
//               className={`fas ${params.row.active ? 'fa-toggle-on' : 'fa-toggle-off'}`}
//               onClick={() => onToggleActive(params.row.id)}
//               style={{ cursor: 'pointer', color: params.row.active ? 'green' : 'red', marginRight: 8 }}
//               title={params.row.active ? 'Deactivate' : 'Activate'}
//             />
//             <FontAwesomeIcon
//               icon="fa-solid fa-pen"
//               size={15}
//               style={{ marginRight: 8, cursor: 'pointer' }} 
//               title="Edit"
//               onClick={() => handleEditClick(params.row.id)} 
//             />
//             <FontAwesomeIcon
//               icon="fa-solid fa-magnifying-glass"
//               style={{ marginRight: 8 }}
//               title="Research" />
//             <FontAwesomeIcon
//               icon="fa-solid fa-trash-can"
//               style={{ marginRight: 8 }}
//               title="Remove"
//               onClick={() => deleteUserData(params.row.id)} 
//               />
//             <FontAwesomeIcon
//               icon="fa-duotone fa-user-gear"
//               style={{ marginRight: 8 }}
//               title="Settings" />
//           </div>
//         );
//       },
//     },
//   ];
// };
import { TFunction } from 'i18next';
import { GridColDef } from '@mui/x-data-grid';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import { useNavigate } from 'react-router-dom';
import { deleteUserData, updateUserData } from '~/main/features/users/action';
import { useState } from 'react';

export const useColumns = (t: TFunction<'translation', undefined>): GridColDef[] => {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<{ [key: string]: boolean }>({});

  const handleEditClick = (id: any) => {
    navigate(`/users/users/editusers/${id}`);
  };

  const toggleUserActiveStatus = async (id: any, currentStatus: boolean) => {
    try {
      const updatedStatus = { active: !currentStatus };
      await updateUserData(id, updatedStatus);
      setActiveStatus((prevStatus) => ({
        ...prevStatus,
        [id]: !currentStatus,
      }));
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái người dùng:', error);
    }
  };

  return [
    {
      width: 250,
      field: 'displayname',
      headerName: t('app.users.users.columns.displayname'),
      sortingOrder: ['desc', 'asc', null],
    },
    {
      minWidth: 250,
      field: 'firstname',
      headerName: t('app.users.users.columns.firstname'),
      sortingOrder: ['desc', 'asc', null],
    },
    {
      width: 250,
      field: 'lastname',
      headerName: t('app.users.users.columns.lastname'),
      sortingOrder: ['desc', 'asc', null],
    },
    {
      width: 250,
      field: 'email',
      headerName: t('app.users.users.columns.email'),
      sortingOrder: ['desc', 'asc', null],
    },
    {
      width: 250,
      field: 'userstype',
      headerName: t('app.users.users.columns.usertype'),
      sortingOrder: ['desc', 'asc', null],
    },
    {
      width: 250,
      field: 'createddate',
      headerName: t('app.users.users.columns.createddate'),
      sortingOrder: ['desc', 'asc', null],
    },
    {
      field: '',
      sortable: false,
      renderCell: (params) => {
        const isActive = activeStatus[params.row.id] ?? params.row.active;

        return (
          <div>
            <i
              className={`fas ${isActive ? 'fa-toggle-on' : 'fa-toggle-off'}`}
              onClick={() => toggleUserActiveStatus(params.row.id, isActive)}
              style={{ cursor: 'pointer', color: isActive ? 'blue' : 'red', marginRight: 8 }}
              title={isActive ? 'Deactivate' : 'Activate'}
            />
            <FontAwesomeIcon
              icon="fa-solid fa-pen"
              size={15}
              style={{ marginRight: 8, cursor: 'pointer' }}
              title="Edit"
              onClick={() => handleEditClick(params.row.id)}
            />
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              style={{ marginRight: 8 }}
              title="Research"
            />
            <FontAwesomeIcon
              icon="fa-solid fa-trash-can"
              style={{ marginRight: 8 }}
              title="Remove"
              onClick={() => deleteUserData(params.row.id)}
            />
            <FontAwesomeIcon
              icon="fa-duotone fa-user-gear"
              style={{ marginRight: 8 }}
              title="Settings"
            />
          </div>
        );
      },
    },
  ];
};
