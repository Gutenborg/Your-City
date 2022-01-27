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
import { APIBusiness, deleteBusiness } from '../../../api';

export interface DeleteBusinessDialogProps extends DialogProps {
  businessId: APIBusiness['_id'];
  businessName: APIBusiness['name'];
  onDelete?: (success: boolean) => void;
}

const DeleteBusinessDialog: React.FC<DeleteBusinessDialogProps> = ({
  businessId,
  businessName,
  onClose,
  onDelete,
  ...props
}) => {
  const handleDelete = async () => {
    const deletedBusiness = await deleteBusiness(businessId);

    if (typeof onDelete === 'function') onDelete(!!deletedBusiness);
  };

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (typeof onClose === 'function') onClose(e, 'escapeKeyDown');
  };

  return (
    <Dialog onClose={onClose} {...props}>
      <DialogTitle>Delete {businessName}?</DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Are you sure you want to delete {businessName}? This action cannot be undone.</Typography>
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

export default DeleteBusinessDialog;
