import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoader } from 'modules/users/selectors';
import { selectOrganizationId } from 'modules/common/auth/selectors';
import { usersActions } from 'modules/users/slice';
import { Loader } from 'modules/common/components';
import { Grid } from '@mui/material';
import UserDataDrawerView from '../user-data-drawer';
import UsersTableView from '../users-table';
import AddUserFormDialog from '../add-user';
import { Button } from './style';

const UsersView = () => {
  const dispatch = useDispatch();
  //
  const loading = useSelector(selectLoader);
  const [show, isShow] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState({});
  const [open, setOpen] = useState(false);
  //
  const organizationId = useSelector(selectOrganizationId);
  //
  useEffect(() => {
    dispatch(
      usersActions.usersList({
        organizationId,
        query: `limit=100`,
      })
    );
  }, []);
  //
  return (
    <Loader loading={loading}>
      <Grid container direction="row-reverse" justifyContent="space-between" pb={4}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add User
        </Button>
      </Grid>
      <Grid container direction="row" spacing={2} justifyContent="space-between">
        <Grid item sx={{ flexGrow: 1, flexBasis: 1 }}>
          <UsersTableView isShow={isShow} setSelectedUserId={setSelectedUserId} />
        </Grid>
        <UserDataDrawerView show={show} isShow={isShow} userId={selectedUserId} />
      </Grid>
      <AddUserFormDialog open={open} onClose={() => setOpen(false)} />
    </Loader>
  );
};
//
export default UsersView;
