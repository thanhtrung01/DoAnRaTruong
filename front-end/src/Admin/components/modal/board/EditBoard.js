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
import { boardTitleUpdate } from "../../../../Services/boardsService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const EditBoard = ({ open, handleClose, boardDetail }) => {
  const [title, setTitle] = useState("");
  //   const [desc, setDesc] = useState("");
  const dispatch = useDispatch();

  console.log(boardDetail);

  useEffect(() => {
    setTitle(boardDetail?.title);
    // setDesc(boardDetail?.description);
  }, [open]);

  const handleEditBoard = async (e) => {
    e.preventDefault();
    console.log(title);
    await boardTitleUpdate(title, boardDetail?._id, dispatch);
    handleClose();

    toast.success("Sửa thành công!", {
      autoClose: 2000,
    });
  };

  return (
    <div>
      <ToastContainer />
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

                  <form
                    style={{ marginTop: "30px" }}
                    onSubmit={handleEditBoard}
                  >
                    <Grid container spacing={1}>
                      <Grid xs={12} sm={12} item>
                        <TextField
                          placeholder="Enter title"
                          value={title ? title : boardDetail?.title}
                          onChange={(e) => setTitle(e.target.value)}
                          variant="outlined"
                          fullWidth
                          required
                        />
                      </Grid>
                      {/* <Grid item xs={12} mt={2}>
                        <TextField
                          type="text"
                          placeholder="Enter description"
                          value={desc ? desc : boardDetail?.description}
                          onChange={(e) => setDesc(e.target.value)}
                          variant="outlined"
                          fullWidth
                          required
                        />
                      </Grid> */}

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

export default EditBoard;
