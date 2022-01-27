import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogProps,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { DatePicker, TimePicker, DatePickerProps } from '@material-ui/pickers';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  APIBusiness,
  APIBusinessForm,
  createBusiness,
  APIDaysOfTheWeek,
  APICategory,
  APIManagementType,
} from '../../../api';

export interface CreateBusinessDialogProps extends DialogProps {
  onCreate: (success: boolean) => void;
}

export interface FormFields {
  name: string;
  category: APICategory;
  description: string;
  street: string;
  openedDate: string;
  managerName: string;
  managerManagementType: APIManagementType;
  contactEmail: string;
  contactPhone: string;
  contactWebsites: string;
  features: string;
  tags: string;
  logo: any;
  images: any;
  hoursMondayOpen: string;
  hoursMondayClose: string;
  hoursTuesdayOpen: string;
  hoursTuesdayClose: string;
  hoursWednesdayOpen: string;
  hoursWednesdayClose: string;
  hoursThursdayOpen: string;
  hoursThursdayClose: string;
  hoursFridayOpen: string;
  hoursFridayClose: string;
  hoursSaturdayOpen: string;
  hoursSaturdayClose: string;
  hoursSundayOpen: string;
  hoursSundayClose: string;
}

const CreateBusinessDialog: React.FC<CreateBusinessDialogProps> = ({ onClose, onCreate, ...props }) => {
  // State Hooks
  const [openedDate, setOpenedDate] = useState(new Date());
  const [hours, setHours] = useState({
    mondayOpen: new Date('2020-01-01 7:00'),
    mondayClose: new Date('2020-01-01 20:00'),
    tuesdayOpen: new Date('2020-01-01 7:00'),
    tuesdayClose: new Date('2020-01-01 20:00'),
    wednesdayOpen: new Date('2020-01-01 7:00'),
    wednesdayClose: new Date('2020-01-01 20:00'),
    thursdayOpen: new Date('2020-01-01 7:00'),
    thursdayClose: new Date('2020-01-01 20:00'),
    fridayOpen: new Date('2020-01-01 7:00'),
    fridayClose: new Date('2020-01-01 20:00'),
    saturdayOpen: new Date('2020-01-01 7:00'),
    saturdayClose: new Date('2020-01-01 20:00'),
    sundayOpen: new Date('2020-01-01 7:00'),
    sundayClose: new Date('2020-01-01 20:00'),
  });

  const [daysOpen, setDaysOpen] = useState<Record<APIDaysOfTheWeek, boolean>>({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });

  // Utility Hooks
  const { register, reset, handleSubmit } = useForm<FormFields>();

  const submitForm: SubmitHandler<FormFields> = async ({
    hoursFridayClose,
    hoursFridayOpen,
    hoursMondayClose,
    hoursMondayOpen,
    hoursSaturdayClose,
    hoursSaturdayOpen,
    hoursSundayClose,
    hoursSundayOpen,
    hoursThursdayClose,
    hoursThursdayOpen,
    hoursTuesdayClose,
    hoursTuesdayOpen,
    hoursWednesdayClose,
    hoursWednesdayOpen,
    ...formData
  }) => {
    let createdBusiness: APIBusiness | undefined;

    const modifiedFormData: APIBusinessForm = {
      ...formData,
      hoursMonday: daysOpen.monday ? `${hoursMondayOpen} - ${hoursMondayClose}` : undefined,
      hoursTuesday: daysOpen.monday ? `${hoursTuesdayOpen} - ${hoursTuesdayClose}` : undefined,
      hoursWednesday: daysOpen.monday ? `${hoursWednesdayOpen} - ${hoursWednesdayClose}` : undefined,
      hoursThursday: daysOpen.monday ? `${hoursThursdayOpen} - ${hoursThursdayClose}` : undefined,
      hoursFriday: daysOpen.monday ? `${hoursFridayOpen} - ${hoursFridayClose}` : undefined,
      hoursSaturday: daysOpen.monday ? `${hoursSaturdayOpen} - ${hoursSaturdayClose}` : undefined,
      hoursSunday: daysOpen.monday ? `${hoursSundayOpen} - ${hoursSundayClose}` : undefined,
    };

    try {
      createdBusiness = await createBusiness(modifiedFormData);
    } catch (error) {
      console.log(error);
    } finally {
      if (typeof onCreate === 'function') onCreate(!!createdBusiness);
    }
  };

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    reset();

    if (typeof onClose === 'function') onClose(e, 'escapeKeyDown');
  };

  const handleDateChange: DatePickerProps['onChange'] = (date) => {
    if (date) setOpenedDate(date.toDate());
  };

  return (
    <Dialog onClose={onClose} {...props} maxWidth="lg" fullWidth>
      <DialogTitle>Add a New Business</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid container item xs={12} md={6} spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Business Name"
                name="name"
                inputRef={register({ required: 'A business must have a name.' })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Category" name="category" inputRef={register({ required: true })} select>
                <option value="financial">Financial</option>
                <option value="health">Health</option>
                <option value="legal">Legal</option>
                <option value="restaurant">Restaurant</option>
                <option value="retail">Retail</option>
                <option value="service">Service</option>
                <option value="supply">Supply</option>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField label="Description" name="description" inputRef={register} multiline />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Street" name="street" inputRef={register} />
            </Grid>

            <Grid item xs={12}>
              <DatePicker
                value={openedDate}
                onChange={handleDateChange}
                label="Opened Date"
                name="openedDate"
                inputRef={register}
                openTo="year"
                format="MMM DD YYYY"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>Management Information</Typography>
              <TextField label="Manager Name" name="managerName" inputRef={register} />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Management Type" name="managerManagementType" inputRef={register} select>
                <option value="franchise">Franchise</option>
                <option value="corporation">Corporation</option>
                <option value="owner">Locally Owned</option>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Typography>Contact Information</Typography>
              <TextField label="Email" name="contactEmail" inputRef={register} />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Phone" name="contactPhone" inputRef={register} />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Websites" name="contactWebsites" inputRef={register} />
            </Grid>
          </Grid>

          <Grid container item xs={12} md={6} spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Features"
                InputProps={{ name: 'features' }}
                inputRef={register}
                variant="filled"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Tags" name="tags" inputRef={register} />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Logo" name="logo" inputRef={register} type="file" />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Images" name="images" inputRef={register} type="file" />
            </Grid>

            {Object.keys(daysOpen).map((day) => (
              <Grid key={day} container item xs={12} spacing={2} alignItems="center">
                <Grid item xs>
                  <TimePicker
                    value={hours[`${day}Open` as keyof typeof hours]}
                    onChange={(time) =>
                      setHours((prev) => ({ ...prev, [`${day}Open` as keyof typeof hours]: time?.toDate() as Date }))
                    }
                    label={`${day.slice(0, 1).toUpperCase() + day.slice(1)} Open`}
                    name={`hours${day.slice(0, 1).toUpperCase() + day.slice(1)}Open`}
                    inputRef={register}
                    disabled={!daysOpen[day as APIDaysOfTheWeek]}
                  />
                </Grid>

                <Grid item xs="auto">
                  <Typography> - to - </Typography>
                </Grid>

                <Grid item xs>
                  <TimePicker
                    value={hours[`${day}Close` as keyof typeof hours]}
                    onChange={(time) =>
                      setHours((prev) => ({ ...prev, [`${day}Close` as keyof typeof hours]: time?.toDate() as Date }))
                    }
                    label={`${day.slice(0, 1).toUpperCase() + day.slice(1)} Close`}
                    name={`hours${day.slice(0, 1).toUpperCase() + day.slice(1)}Close`}
                    inputRef={register}
                    disabled={!daysOpen[day as APIDaysOfTheWeek]}
                  />
                </Grid>

                <Grid item xs="auto">
                  <FormControlLabel
                    checked={!daysOpen[day as APIDaysOfTheWeek]}
                    control={
                      <Checkbox
                        onChange={(e) =>
                          setDaysOpen((prev) => ({ ...prev, [day as APIDaysOfTheWeek]: !e.target.checked }))
                        }
                      />
                    }
                    label="Closed"
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button onClick={handleSubmit(submitForm)}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBusinessDialog;
