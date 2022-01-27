import React, { useEffect, useState } from 'react';
import { Avatar, Button, ButtonBase, fade, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { APIBusiness, APIDaysOfTheWeek, getBusinessById } from '../../api';
import { API_BASE_URL } from '../../api/constants';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import FlareOutlinedIcon from '@material-ui/icons/FlareOutlined';
import { DirectionsOutlined, EmailOutlined, LinkOutlined, PhoneOutlined } from '@material-ui/icons';

export interface BusinessDetailsPageRouteParams {
  id: string;
}

const useStyles = makeStyles(({ palette, shape, spacing }) => ({
  contentSection: {
    padding: spacing(2),
  },
  logo: {
    minWidth: 200,
    maxWidth: 300,
    height: 'auto',
  },
  businessImage: {
    borderRadius: shape.borderRadius,
    height: spacing(20),
    width: spacing(20),
  },
  businessImageAvatar: {
    backgroundColor: fade(palette.primary.light, 0.4),
    fontSize: spacing(10),
    height: spacing(20),
    width: spacing(20),
  },
  locallyOwned: {
    color: palette.secondary.dark,
  },
  similarBusiness: {
    padding: spacing(1),
    transition: 'background-color 300ms',
    '&:hover': {
      backgroundColor: palette.grey[100],
    },
  },
  similarBusinessAvatar: {
    backgroundColor: fade(palette.primary.light, 0.4),
  },
}));

export const BusinessDetailsPage: React.FC = () => {
  const [business, setBusiness] = useState<APIBusiness>();

  const classes = useStyles();
  const { id } = useParams<BusinessDetailsPageRouteParams>();

  useEffect(() => {
    const findBusiness = async () => {
      const apiResults = await getBusinessById(id);

      setBusiness(apiResults);
    };

    findBusiness();
  }, [id]);

  const getHours = () => {
    const now = new Date();
    const today = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const businessHours = business?.hours ? business.hours[today as APIDaysOfTheWeek] : null;

    return !businessHours || businessHours === 'undefined' ? 'Closed Today' : `Open today from ${businessHours}`;
  };

  const getManagerTitle = () => {
    let title: string = '';

    switch (business?.manager?.managementType) {
      case 'corporation':
        title = 'Store Manager';
        break;
      case 'franchise':
        title = 'Store Owner';
        break;
      case 'owner':
        title = 'Owner';
        break;
      default:
        break;
    }

    return title;
  };

  if (business) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper className={classes.contentSection}>
            <Grid container spacing={2}>
              <Grid item xs="auto">
                {business.logo ? (
                  <img
                    className={classes.businessImage}
                    src={`${API_BASE_URL}${business.logo}` || 'none'}
                    alt={business.name}
                  />
                ) : (
                  <Avatar className={classes.businessImageAvatar} variant="rounded">
                    <BusinessOutlinedIcon fontSize="inherit" />
                  </Avatar>
                )}
              </Grid>

              <Grid container item xs alignContent="flex-start" spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h2">{business.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{getHours()}</Typography>
                </Grid>
                {console.log(business.openedDate)}
                <Grid item xs={12}>
                  <Typography>Serving Since {new Date(business?.openedDate as any).getFullYear()}</Typography>
                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1">{business?.description}</Typography>
                </Grid>

                {business?.hours && (
                  <Grid container item xs={6} spacing={1}>
                    {Object.keys(business.hours).map((day) => (
                      <Grid item xs={12}>
                        <Typography variant="body1">
                          <b>{day.slice(0, 1).toUpperCase() + day.slice(1)} </b>
                          {business.hours ? business.hours[day as APIDaysOfTheWeek] : ''}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.contentSection}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4">Management</Typography>
              </Grid>

              {business.manager?.name && business.manager.managementType && (
                <React.Fragment>
                  <Grid item xs="auto">
                    <Typography>
                      <b>{getManagerTitle()}:</b> {business.manager?.name}
                    </Typography>
                  </Grid>

                  {business.manager?.managementType === 'owner' && (
                    <Grid container item xs md className={classes.locallyOwned}>
                      <Grid item xs="auto">
                        <FlareOutlinedIcon />
                      </Grid>

                      <Grid item xs="auto">
                        <Typography variant="body1">Locally Owned!</Typography>
                      </Grid>
                    </Grid>
                  )}
                </React.Fragment>
              )}

              <Grid item xs={12}>
                <Typography variant="h4">Contact</Typography>
              </Grid>

              {business?.contact && (
                <React.Fragment>
                  {business?.contact.phone && (
                    <Grid container item xs={12} alignItems="center" spacing={2}>
                      <Grid item xs="auto">
                        <Button
                          component="a"
                          href={`tel:${business.contact.phone}`}
                          variant="outlined"
                          endIcon={<PhoneOutlined />}
                        >
                          Call
                        </Button>
                      </Grid>

                      <Grid item xs>
                        <Typography variant="body2">{business?.contact?.phone}</Typography>
                      </Grid>
                    </Grid>
                  )}

                  {business?.contact.email && (
                    <Grid container item xs={12} alignItems="center" spacing={2}>
                      <Grid item xs="auto">
                        <Button
                          component="a"
                          href={`mailTo:${business.contact.email}`}
                          variant="outlined"
                          endIcon={<EmailOutlined />}
                        >
                          Email
                        </Button>
                      </Grid>

                      <Grid item xs>
                        <Typography variant="body2">{business?.contact?.email}</Typography>
                      </Grid>
                    </Grid>
                  )}

                  {business?.contact?.websites && (
                    <Grid item xs={12}>
                      <Button
                        component="a"
                        href={business?.contact.websites[0]}
                        variant="outlined"
                        endIcon={<LinkOutlined />}
                        target="_blank"
                      >
                        Visit Website
                      </Button>
                    </Grid>
                  )}
                </React.Fragment>
              )}

              {business.street && (
                <Grid item xs={12}>
                  <Button component="a" href="" variant="outlined" endIcon={<DirectionsOutlined />}>
                    Get Directions
                  </Button>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.contentSection}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h4">Similar Businesses</Typography>
              </Grid>
            </Grid>

            <Grid container justify="space-evenly">
              {[0, 1, 2, 3].map(() => (
                <Grid
                  component={ButtonBase}
                  className={classes.similarBusiness}
                  container
                  item
                  xs={2}
                  alignItems="center"
                >
                  <Grid item xs="auto">
                    <Avatar className={classes.similarBusinessAvatar} variant="rounded">
                      <BusinessOutlinedIcon />
                    </Avatar>
                  </Grid>

                  <Grid item xs>
                    <Typography variant="h6">Similar Business</Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography>Could not find a business with the id {id}</Typography>
        </Grid>
      </Grid>
    );
  }
};

export default BusinessDetailsPage;
