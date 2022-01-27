import React from 'react';
import {
  Button,
  Dialog,
  DialogProps,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { APIBranch, APILevel, APISeat, APISeatForm, editSeat } from '../../../api';
// import { DatePicker, DatePickerProps, TimePicker } from '@material-ui/pickers';
// import ChipInput from '../../../components/chipInput';

export interface EditSeatDialogProps extends DialogProps {
  seat: APISeat;
  onEdit?: (success: boolean) => void;
}

export interface FormFields {
  name: string;
  description: string;
  term: string;
  level: APILevel;
  branch: APIBranch;
  lastFilled: string;
  nextFill: string;
  incumbentName: string;
  incumbentServingSince: string;
  incumbentAge: string;
  incumbentPartyAffiliation: string;
  incumbentContactEmail: string;
  incumbentContactPhone: string;
  incumbentContactWebsites: string;
}

const EditSeatDialog: React.FC<EditSeatDialogProps> = ({ seat, onClose, onEdit, ...props }) => {
  // State Hooks
  // const [openedDate, setOpenedDate] = useState(new Date(seat?.lastFilled || 0));

  // Utility Hooks
  const { register, reset, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      incumbentContactEmail: seat.incumbent.contact?.email,
      incumbentContactPhone: seat.incumbent.contact?.phone,
      incumbentContactWebsites: seat.incumbent.contact?.websites?.join(','),
      branch: seat.branch,
      description: seat.description,
      incumbentAge: String(seat.incumbent.age),
      incumbentName: seat.incumbent.name,
      incumbentPartyAffiliation: seat.incumbent.partyAffiliation,
      incumbentServingSince: seat.incumbent.servingSince,
      lastFilled: seat.lastFilled,
      level: seat.level,
      nextFill: seat.nextFill,
      term: seat.term,
      name: seat.name,
    },
  });

  const submitForm: SubmitHandler<FormFields> = async ({ ...formData }) => {
    const newSeatInformation: APISeatForm = {
      ...formData,
    };

    const editedSeat = await editSeat(seat._id, newSeatInformation);

    if (typeof onEdit === 'function') onEdit(editedSeat?._id === seat._id);
  };

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    reset();

    if (typeof onClose === 'function') onClose(e, 'escapeKeyDown');
  };

  return (
    <Dialog onClose={onClose} {...props} maxWidth="lg" fullWidth>
      <DialogTitle>Add a New Seat</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid container item xs={12} md={6} spacing={2}>
            <Grid item xs={12}>
              <Typography>Seat Information</Typography>
              <TextField label="Seat Name" name="name" inputRef={register({ required: 'A seat must have a name.' })} />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Description" name="description" inputRef={register} multiline />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Term" name="term" inputRef={register} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Level"
                name="level"
                inputRef={register({ required: 'The level of government must be selected.' })}
                select
              >
                <option value="county">County</option>
                <option value="federal">Federal</option>
                <option value="local">Local</option>
                <option value="state">State</option>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Branch"
                name="branch"
                inputRef={register({ required: 'The branch of government must be selected.' })}
                select
              >
                <option value="executive">Executive</option>
                <option value="judicial">Judicial</option>
                <option value="legislative">Legislative</option>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField type="date" label="Last Filled Date" name="lastFilled" inputRef={register} />
            </Grid>

            <Grid item xs={12}>
              <TextField type="date" label="Next Fill Date" name="nextFill" inputRef={register} />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Fill Method" name="fillMethod" inputRef={register({ required: true })} select>
                <option value="appointed">Appointed</option>
                <option value="elected">Elected</option>
              </TextField>
            </Grid>
          </Grid>

          <Grid container item xs={12} md={6} spacing={2}>
            <Grid item xs={12}>
              <Typography>Incumbent Information</Typography>
              <TextField label="Name" name="incumbentName" inputRef={register} />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Age" name="incumbentAge" type="number" inputRef={register} />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Party Affiliation" name="incumbentPartyAffiliation" inputRef={register} />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Serving Since" name="incumbentServingSince" type="date" inputRef={register} />
            </Grid>

            <Grid item xs={12}>
              <Typography>Incumbent Contact Information</Typography>
              <TextField label="Email" name="incumbentContactEmail" inputRef={register} />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Phone" name="incumbentContactPhone" inputRef={register} />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Websites" name="incumbentContactWebsites" inputRef={register} />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button onClick={handleSubmit(submitForm)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSeatDialog;
