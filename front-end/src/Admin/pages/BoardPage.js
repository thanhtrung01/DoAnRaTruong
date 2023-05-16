import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
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
  AvatarGroup,
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import USERLIST from "../_mock/user";
import AlertDialog from "../components/modal/user/AlertDialog";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import { deleteBoard, getAllBoard } from "../../Services/boardsService";
import CreateBoard from "../../Components/Modals/CreateBoardModal/CreateBoard";
import EditBoard from "../components/modal/board/EditBoard";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "title", label: "Tiêu đề", alignRight: false },
  { id: "members", label: "Thành viên", alignRight: false },
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

var filteredBoards;
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
      (_board) => _board.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage({}) {
  const [boardData, setBoardData] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [isChecked, setisChecked] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [boardDetail, setBoardDetail] = useState(null);
  const [userDelete, setUserDelete] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [verifyDelete, setVerifyDelete] = useState(false);

  useEffect(() => {
    getAllBoard().then((data) => setBoardData([...data.data.board]));
  }, [openEditModal, openAddModal, openDialog, verifyDelete]);

  const handleCloseEditModal = () => setOpenEditModal(false);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleCloseDialog = () => {
    setVerifyDelete(false);
    setOpenDialog(false);
  };
  const handleVerifyDelete = () => setVerifyDelete(true);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = boardData.map((n) => n.name);
      const newChecked = boardData.map((n) => n._id);
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

    const filteredData = boardData.filter((item) => {
      return !filterUser.some((data) => data._id === item._id);
    });

    if (filteredData) return setBoardData(filteredData);
  };

  const handleUpdateUser = (item) => {
    if (item) {
      setBoardDetail(item);
      setOpenEditModal(true);
    }

    return item;
  };

  const handleRemoveUser = (item) => {
    setUserDelete(item);
    setOpenDialog(true);
  };

  if (verifyDelete) {
    deleteBoard(userDelete._id);
    getAllBoard().then((data) => setBoardData([...data.data.board]));
    handleCloseDialog();

    toast.success("Xóa thành công!", {
      autoClose: 2000,
    });
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - boardData?.length) : 0;

  if (boardData) {
    filteredBoards = applySortFilter(
      boardData,
      getComparator(order, orderBy),
      filterName
    );
  }

  const isNotFound = !filteredBoards?.length && !!filterName;

  return (
    <div className="container-fix">
      <ToastContainer />
      <Helmet>
        <title> Bảng | Quản trị viên </title>
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
            Bảng
          </Typography>
          <Button
            onClick={() => setOpenAddModal(true)}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Tạo mới
          </Button>
        </Stack>
        {openAddModal && <CreateBoard callback={handleCloseAddModal} />}
        <EditBoard
          open={openEditModal}
          handleClose={handleCloseEditModal}
          boardDetail={boardDetail}
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
                  rowCount={boardData?.length}
                  numSelected={selected?.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredBoards
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((item) => {
                      const { _id, title, description, members } = item;
                      const selectedUser = selected.indexOf(title) !== -1;

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
                              onChange={(event) => handleClick(event, title)}
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar
                                alt={title}
                                src={item.backgroundImageLink}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {title}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">
                            <AvatarGroup className="members-avatar-group">
                              {members.map((item, index) => {
                                return (
                                  <Avatar
                                    direction="row"
                                    alignItems="center"
                                    key={index}
                                    alt="Remy Sharp"
                                    src={item.avatar}
                                  />
                                );
                              })}
                            </AvatarGroup>
                          </TableCell>

                          <TableCell align="right">
                            <MenuItem onClick={() => handleUpdateUser(item)}>
                              <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
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
            count={boardData?.length}
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
