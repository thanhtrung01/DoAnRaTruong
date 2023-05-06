import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField, Button, Card, CardContent } from "@mui/material";
import { useState } from "react";
import { createUser } from "../../../../Services/userService";
import { useDispatch } from "react-redux";

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

const AddUser = ({ open, handleClose }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();

  const handleAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(avatar);
    await createUser(
      dispatch,
      name,
      username,
      email,
      password,
      address,
      phone,
      avatar
    );
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
                    Tạo người dùng
                  </Typography>

                  <form style={{ marginTop: "30px" }} onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                      <Grid xs={12} sm={12} item>
                        <TextField
                          placeholder="Enter name"
                          variant="outlined"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid xs={12} sm={12} item>
                        <TextField
                          placeholder="Enter full name"
                          variant="outlined"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} mt={2}>
                        <TextField
                          type="email"
                          placeholder="Enter email"
                          variant="outlined"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid xs={12} sm={12} item>
                        <TextField
                          type="password"
                          placeholder="Enter password"
                          variant="outlined"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} mt={2}>
                        <TextField
                          placeholder="Enter address"
                          variant="outlined"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} mt={2}>
                        <TextField
                          type="number"
                          placeholder="Enter phone number"
                          variant="outlined"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12} mt={2}>
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
                            Lưu
                          </Button>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            onClick={handleClose}
                            variant="contained"
                            color="error"
                            fullWidth
                          >
                            Hủy bỏ
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

export default AddUser;
