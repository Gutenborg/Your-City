import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogProps,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  APIBusiness,
  APIBusinessForm,
  APICategory,
  APIDaysOfTheWeek,
  APIManagementType,
  editBusiness,
} from '../../../api';
import { DatePicker, DatePickerProps, TimePicker } from '@material-ui/pickers';
import ChipInput from '../../../components/chipInput';

export interface EditBusinessDialogProps extends DialogProps {
  business: APIBusiness;
  onEdit?: (success: boolean) => void;
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

const EditBusinessDialog: React.FC<EditBusinessDialogProps> = ({ business, onClose, onEdit, ...props }) => {
  // State Hooks
  const [openedDate, setOpenedDate] = useState(new Date(business?.openedDate || 0));

  const [daysOpen, setDaysOpen] = useState<Record<APIDaysOfTheWeek, boolean>>({
    monday: !!business?.hours?.monday,
    tuesday: !!business?.hours?.tuesday,
    wednesday: !!business?.hours?.wednesday,
    thursday: !!business?.hours?.thursday,
    friday: !!business?.hours?.friday,
    saturday: !!business?.hours?.saturday,
    sunday: !!business?.hours?.sunday,
  });

  const [hours, setHours] = useState({
    mondayOpen: business.hours?.monday
      ? new Date(`2020-01-01 ${business.hours?.monday.split(' - ')[0]}`)
      : new Date('2020-01-01 7:00'),
    mondayClose: business.hours?.monday
      ? new Date(`2020-01-01 ${business.hours?.monday.split(' - ')[1]}`)
      : new Date('2020-01-01 7:00'),
    tuesdayOpen: business.hours?.tuesday
      ? new Date(`2020-01-01 ${business.hours?.tuesday.split(' - ')[0]}`)
      : new Date('2020-01-01 7:00'),
    tuesdayClose: business.hours?.tuesday
      ? new Date(`2020-01-01 ${business.hours?.tuesday.split(' - ')[1]}`)
      : new Date('2020-01-01 7:00'),
    wednesdayOpen: business.hours?.wednesday
      ? new Date(`2020-01-01 ${business.hours?.wednesday.split(' - ')[0]}`)
      : new Date('2020-01-01 7:00'),
    wednesdayClose: business.hours?.wednesday
      ? new Date(`2020-01-01 ${business.hours?.wednesday.split(' - ')[1]}`)
      : new Date('2020-01-01 7:00'),
    thursdayOpen: business.hours?.thursday
      ? new Date(`2020-01-01 ${business.hours?.thursday.split(' - ')[0]}`)
      : new Date('2020-01-01 7:00'),
    thursdayClose: business.hours?.thursday
      ? new Date(`2020-01-01 ${business.hours?.thursday.split(' - ')[1]}`)
      : new Date('2020-01-01 7:00'),
    fridayOpen: business.hours?.friday
      ? new Date(`2020-01-01 ${business.hours?.friday.split(' - ')[0]}`)
      : new Date('2020-01-01 7:00'),
    fridayClose: business.hours?.friday
      ? new Date(`2020-01-01 ${business.hours?.friday.split(' - ')[1]}`)
      : new Date('2020-01-01 7:00'),
    saturdayOpen: business.hours?.saturday
      ? new Date(`2020-01-01 ${business.hours?.saturday.split(' - ')[0]}`)
      : new Date('2020-01-01 7:00'),
    saturdayClose: business.hours?.saturday
      ? new Date(`2020-01-01 ${business.hours?.saturday.split(' - ')[1]}`)
      : new Date('2020-01-01 8:00'),
    sundayOpen: business.hours?.sunday
      ? new Date(`2020-01-01 ${business.hours?.sunday.split(' - ')[0]}`)
      : new Date('2020-01-01 7:00'),
    sundayClose: business.hours?.sunday
      ? new Date(`2020-01-01 ${business.hours?.sunday.split(' - ')[1]}`)
      : new Date('2020-01-01 8:00'),
  });

  // Utility Hooks
  const { register, reset, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      contactEmail: business.contact?.email,
      contactPhone: business.contact?.phone,
      contactWebsites: business.contact?.websites?.join(','),
      category: business.category,
      description: business.description,
      features: business.features?.join(','),
      managerManagementType: business.manager?.managementType,
      managerName: business.manager?.name,
      street: business.street,
      tags: business?.tags?.join(','),
      name: business.name,
    },
  });

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
    const newBusinessInformation: APIBusinessForm = {
      ...formData,
      hoursMonday: daysOpen.monday ? `${hoursMondayOpen} - ${hoursMondayClose}` : undefined,
      hoursTuesday: daysOpen.tuesday ? `${hoursTuesdayOpen} - ${hoursTuesdayClose}` : undefined,
      hoursWednesday: daysOpen.wednesday ? `${hoursWednesdayOpen} - ${hoursWednesdayClose}` : undefined,
      hoursThursday: daysOpen.thursday ? `${hoursThursdayOpen} - ${hoursThursdayClose}` : undefined,
      hoursFriday: daysOpen.friday ? `${hoursFridayOpen} - ${hoursFridayClose}` : undefined,
      hoursSaturday: daysOpen.saturday ? `${hoursSaturdayOpen} - ${hoursSaturdayClose}` : undefined,
      hoursSunday: daysOpen.sunday ? `${hoursSundayOpen} - ${hoursSundayClose}` : undefined,
    };

    const editedBusiness = await editBusiness(business._id, newBusinessInformation);

    if (typeof onEdit === 'function') onEdit(editedBusiness?._id === business._id);
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
      <DialogTitle>Edit Business</DialogTitle>

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
              <TextField label="Features" name="features" inputRef={register} />
            </Grid>

            <Grid item xs={12}>
              <ChipInput label="Features" name="features" inputRef={register} />
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

        <Button onClick={handleSubmit(submitForm)}>Edit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBusinessDialog;
