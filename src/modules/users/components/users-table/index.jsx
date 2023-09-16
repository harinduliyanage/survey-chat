import { DataGrid } from '@mui/x-data-grid';
import { withTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectUsers } from 'modules/users/selectors';
import {
  TABLE_HEADER_COLOR,
  TABLE_HEADER_FONT_COLOR,
  TABLE_SELECT_CELL_COLOR,
} from 'modules/common/constants/style';

const columnVisibilityModel = {
  id: false,
};
//
const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: 'super-app-theme--header',
    flex: 1,
  },
  {
    field: 'userName',
    headerName: 'User Name',
    headerClassName: 'super-app-theme--header',
    flex: 1,
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    headerClassName: 'super-app-theme--header',
    flex: 1,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    headerClassName: 'super-app-theme--header',
    flex: 1,
  },
  {
    field: 'emailAddress',
    headerName: 'Email Address',
    headerClassName: 'super-app-theme--header',
    flex: 1,
  },
  {
    field: 'role',
    headerName: 'Role',
    headerClassName: 'super-app-theme--header',
    flex: 1,
  },
];
//
const UsersTableView = ({ isShow, setSelectedUserId }) => {
  //
  const users = useSelector(selectUsers);
  //
  const [filteredUsers, setFilteredUsers] = useState([]);
  //
  useEffect(() => {
    const formattedUsers = users?.results?.map((user) => ({
      id: user?.id,
      emailAddress: user?.email,
      userName: user?.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      role: user?.roles[0].name,
    }));
    setFilteredUsers(formattedUsers);
  }, [users]);
  //
  return (
    <div style={{ height: 500, flex: 1 }}>
      <DataGrid
        sx={{
          '& .super-app-theme--header': {
            backgroundColor: TABLE_HEADER_COLOR,
            color: TABLE_HEADER_FONT_COLOR,
          },
          'dg:DataGridCell.IsSelected': {
            backgroundColor: TABLE_SELECT_CELL_COLOR,
          },
        }}
        columnVisibilityModel={columnVisibilityModel}
        rowHeight={37}
        rows={filteredUsers || []}
        columns={columns}
        onSelectionModelChange={(ids) => {
          if (ids?.length) {
            setSelectedUserId(ids[0]);
            isShow(true);
          }
        }}
      />
    </div>
  );
};
//
export default withTheme(UsersTableView);
