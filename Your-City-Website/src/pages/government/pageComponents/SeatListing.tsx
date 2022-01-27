import React from 'react';
import { Avatar, Button, fade, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { EmailOutlined, Person, PhoneOutlined } from '@material-ui/icons';
import { APISeat } from '../../../api';

export interface SeatListingProps extends APISeat {}

const useStyles = makeStyles(({ palette, spacing }) => ({
  paper: {
    padding: spacing(2),
  },
  seatImageAvatar: {
    backgroundColor: fade(palette.primary.light, 0.4),
    fontSize: spacing(10),
    height: spacing(20),
    width: spacing(20),
  },
}));

export const SeatListing: React.FC<SeatListingProps> = ({
  name,
  incumbent,
  branch,
  description,
  fillMethod,
  lastFilled,
  nextFill,
  term,
}) => {
  const { paper, seatImageAvatar } = useStyles();

  return (
    <Paper className={paper}>
      <Grid container spacing={2}>
        <Grid item xs="auto">
          <Avatar className={seatImageAvatar} variant="rounded">
            <Person fontSize="inherit" />
          </Avatar>
        </Grid>

        <Grid container item xs spacing={1} alignContent="flex-start">
          <Grid item xs={12}>
            <Typography variant="h3">
              {incumbent.name}{' '}
              <Typography component="span" variant="h4">
                {name}
              </Typography>
            </Typography>
          </Grid>

          <Grid container item xs={6} spacing={1}>
            <Grid item xs={12}>
              <Typography variant="body1">{description}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1">{fillMethod}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1">Term: {term}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption">Current Term:</Typography>

              <Typography variant="body1">
                {lastFilled} - {nextFill}
              </Typography>
            </Grid>
          </Grid>

          <Grid container item xs={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Incumbent Details</Typography>
              <Typography>{incumbent.age} Years Old</Typography>
              <Typography>{incumbent.partyAffiliation} Party Member</Typography>
              <Typography>Serving Since {incumbent.servingSince}</Typography>
            </Grid>

            <Grid container item xs={12} md={6} spacing={2}>
              <Grid item xs={12}>
                <Button startIcon={<PhoneOutlined />} fullWidth>
                  Email
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button startIcon={<EmailOutlined />} fullWidth>
                  Call
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SeatListing;
