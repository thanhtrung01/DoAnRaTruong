import { Helmet } from "react-helmet-async";
import { filter, set } from "lodash";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import USERLIST from "../_mock/user";
import EditUser from "../components/modal/user/EditUser";
import AlertDialog from "../components/modal/user/AlertDialog";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import AddUser from "../components/modal/user/AddUser";
import { deleteUser, getAllUser } from "../../Services/userService";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Tên", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "phone", label: "Số điện thoại", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

var filteredUsers;
function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage({}) {
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [isChecked, setisChecked] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userDetail, setUsetDetail] = useState(null);
  const [userDelete, setUserDelete] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [verifyDelete, setVerifyDelete] = useState(false);

  useEffect(() => {
    getAllUser().then((data) => setUserData([...data.data.user]));
  }, [openEditModal, openAddModal, openDialog, verifyDelete]);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleCloseDialog = () => {
    setVerifyDelete(false);
    setOpenDialog(false);
  };
  const handleVerifyDelete = () => {
    setVerifyDelete(true);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userData.map((n) => n.name);
      const newChecked = userData.map((n) => n._id);
      setSelected(newSelecteds);
      setisChecked(newChecked);
      return;
    }
    setSelected([]);
    setisChecked([]);
  };

  const handleClick = (event, name) => {
    const { value, checked } = event.target;
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);

    if (checked) {
      setisChecked([...isChecked, value]);
    } else {
      setisChecked(isChecked.filter((e) => e !== value));
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDelete = () => {
    const filterUser = isChecked.map((item) => {
      return { _id: item };
    });

    const filteredData = userData.filter((item) => {
      return !filterUser.some((data) => data._id === item._id);
    });

    if (filteredData) return setUserData(filteredData);
  };

  const handleUpdateUser = (item) => {
    if (item) {
      setUsetDetail(item);
      setOpenEditModal(true);
    }

    return item;
  };

  const handleRemoveUser = (item) => {
    setUserDelete(item);
    setOpenDialog(true);
  };

  if (verifyDelete) {
    // const newUserData = userData.filter((item) => item._id !== userDelete._id);
    // setUserData(newUserData);

    deleteUser(userDelete._id);
    getAllUser().then((data) => setUserData([...data.data.user]));
    handleCloseDialog();

    toast.success("Xóa thành công!", {
      autoClose: 2000,
    });
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData?.length) : 0;

  if (userData) {
    filteredUsers = applySortFilter(
      userData,
      getComparator(order, orderBy),
      filterName
    );

    // sortDateBoard = sortDate(filteredUsers);
    // console.log(sortDateBoard);
  }

  const isNotFound = !filteredUsers?.length && !!filterName;

  return (
    <div className="container-fix">
      <ToastContainer />
      <Helmet>
        <title> Người dùng | Quản trị viên </title>
      </Helmet>
      <DashboardLayout />
      <div className="container">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Người dùng
          </Typography>
          <Button
            onClick={() => setOpenAddModal(true)}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Tạo mới
          </Button>
        </Stack>
        <AddUser open={openAddModal} handleClose={handleCloseAddModal} />
        <EditUser
          open={openEditModal}
          handleClose={handleCloseEditModal}
          userDetail={userDetail}
        />
        <AlertDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          handleVerifyDelete={handleVerifyDelete}
        />
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            handleDelete={handleDelete}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userData?.length}
                  numSelected={selected?.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers &&
                    filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item) => {
                        const { _id, name, phone, email } = item;
                        const selectedUser = selected.indexOf(name) !== -1;
                        if (item.isAdmin === true) {
                          return null;
                        }

                        return (
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={selectedUser}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedUser}
                                value={_id}
                                onChange={(event) => handleClick(event, name)}
                              />
                            </TableCell>

                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar alt={name} src={item.avatar} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{email}</TableCell>

                            <TableCell align="left">{phone}</TableCell>

                            <TableCell align="right">
                              <MenuItem onClick={() => handleUpdateUser(item)}>
                                <Iconify
                                  icon={"eva:edit-fill"}
                                  sx={{ mr: 2 }}
                                />
                                Sửa
                              </MenuItem>
                              <MenuItem
                                sx={{ color: "error.main" }}
                                onClick={() => handleRemoveUser(item)}
                              >
                                <Iconify
                                  icon={"eva:trash-2-outline"}
                                  sx={{ mr: 2 }}
                                />
                                Xóa
                              </MenuItem>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            className="pagination"
            count={userData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </div>
    </div>
  );
}
