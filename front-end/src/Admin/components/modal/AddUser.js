import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField, Button, Card, CardContent } from "@mui/material";
import { useState } from "react";

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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, email);
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

                  <form style={{ marginTop: "30px" }} onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
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
                      <Grid item xs={12} mt={2}>
                        <TextField
                          type="number"
                          placeholder="Enter phone number"
                          variant="outlined"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          fullWidth
                          required
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

export default AddUser;