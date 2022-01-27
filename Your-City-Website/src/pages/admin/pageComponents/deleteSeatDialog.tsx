import React from 'react';
import {
  Button,
  Dialog,
  DialogProps,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import { APISeat, deleteSeat } from '../../../api';

export interface DeleteSeatDialogProps extends DialogProps {
  seatId: APISeat['_id'];
  seatName: APISeat['name'];
  onDelete?: (success: boolean) => void;
}

const DeleteSeatDialog: React.FC<DeleteSeatDialogProps> = ({ seatId, seatName, onClose, onDelete, ...props }) => {
  const handleDelete = async () => {
    const deletedSeat = await deleteSeat(seatId);

    if (typeof onDelete === 'function') onDelete(!!deletedSeat);
  };

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (typeof onClose === 'function') onClose(e, 'escapeKeyDown');
  };

  return (
    <Dialog onClose={onClose} {...props}>
      <DialogTitle>Delete {seatName}?</DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Are you sure you want to delete {seatName}? This action cannot be undone.</Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Nevermind</Button>

        <Button onClick={handleDelete} color="secondary">
          Yes, Delete It
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteSeatDialog;
