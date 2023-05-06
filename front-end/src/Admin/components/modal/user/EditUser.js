import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateInfoUser } from "../../../../Services/userService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const EditUser = ({ open, handleClose, userDetail }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(userDetail?.name);
    setEmail(userDetail?.email);
    setPhone(userDetail?.phone);
    setAvatar(userDetail?.avatar);
  }, [open]);

  const handleAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    console.log(avatar);
    await updateInfoUser(dispatch, userDetail?._id, username, avatar);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid>
              <Card
                style={{ maxWidth: 500, padding: "20px 5px", margin: "0 auto" }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Update User
                  </Typography>

                  <form style={{ marginTop: "30px" }} onSubmit={handleEditUser}>
                    <Grid container spacing={1}>
                      <Grid xs={12} sm={12} item>
                        <TextField
                          placeholder="Enter full name"
                          value={username ? username : userDetail?.name}
                          onChange={(e) => setUsername(e.target.value)}
                          variant="outlined"
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} mt={2}>
                        <TextField
                          type="email"
                          placeholder="Enter email"
                          disabled={true}
                          value={email ? email : userDetail?.email}
                          onChange={(e) => setEmail(e.target.value)}
                          variant="outlined"
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} mt={2}>
                        <TextField
                          type="number"
                          placeholder="Enter phone number"
                          disabled={true}
                          value={phone ? phone : userDetail?.phone}
                          onChange={(e) => setPhone(e.target.value)}
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} mt={2} className="flex-align-center">
                        <Avatar
                          alt={""}
                          src={userDetail?.avatar}
                          className="update-avatar"
                        />
                        <TextField
                          type="file"
                          variant="outlined"
                          fullWidth
                          onChange={handleAvatar}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        mt={5}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Grid item xs={3}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                          >
                            Save
                          </Button>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            onClick={handleClose}
                            variant="contained"
                            color="error"
                            fullWidth
                          >
                            Cancel
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditUser;
