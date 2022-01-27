import React, { useEffect, useState } from 'react';
import { getCityInformation } from '../api';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';

const useStyles = makeStyles(({ palette, spacing, typography }) => ({
  button: {
    fontSize: typography.h5.fontSize,
    padding: spacing(4),
  },
  container: {
    marginTop: spacing(2),
    marginBottom: spacing(6),
  },
  icon: {
    '& > *:first-child': {
      fontSize: typography.h3.fontSize,
    },
  },
}));

export const HomePage: React.FC = () => {
  // State Hooks
  const [cityInfo, setCityInfo] = useState<any>();

  // Utility Hooks
  const classes = useStyles();

  const result = async () => {
    const apiResults = await getCityInformation();

    setCityInfo(apiResults);
  };

  useEffect(() => {
    result();
  }, []);

  return (
    <Grid className={classes.container} container spacing={8}>
      <Grid item xs={12}>
        <Typography align="center" component="h1" variant="h3">
          Welcome to
          <br />
          {
            <Typography component="span" variant="h1">
              {cityInfo?.name}
            </Typography>
          }
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography align="center" component="p" variant="h4">
          Home to{' '}
          <Typography color="primary" component="span" variant="h3">
            {cityInfo?.population}
          </Typography>{' '}
          people!
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography align="center" component="p" variant="h4">
          Supported by{' '}
          <Typography color="primary" component="span" variant="h3">
            {cityInfo?.businesses}
          </Typography>{' '}
          businesses!
        </Typography>
      </Grid>

      <Grid container item xs={12} md={6} justify="center">
        <Grid item xs="auto">
          <Button
            component={Link}
            startIcon={<AccountBalanceOutlinedIcon fontSize="inherit" />}
            classes={{
              root: classes.button,
              iconSizeLarge: classes.icon,
            }}
            to="/government"
            size="large"
          >
            Explore Your Government
          </Button>
        </Grid>
      </Grid>

      <Grid container item xs={12} md={6} justify="center">
        <Grid item xs="auto">
          <Button
            component={Link}
            startIcon={<StorefrontOutlinedIcon />}
            classes={{
              root: classes.button,
              iconSizeLarge: classes.icon,
            }}
            to="/business"
            size="large"
          >
            Search for Businesses
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
