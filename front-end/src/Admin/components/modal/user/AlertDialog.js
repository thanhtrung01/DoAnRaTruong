import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ open, handleClose, handleVerifyDelete }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        className="modal-verify"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bạn có chắc là xóa không?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy bỏ
          </Button>
          <Button color="error" autoFocus onClick={handleVerifyDelete}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
