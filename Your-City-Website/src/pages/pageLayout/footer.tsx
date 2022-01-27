import React from 'react';
import { Button, Grid, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles(({ palette, spacing }) => ({
  footer: {
    background: palette.primary.main,
    color: palette.primary.contrastText,
    marginTop: spacing(6),
    paddingBottom: spacing(1),
  },
}));

const Footer: React.FC = () => {
  const { footer } = useStyles();
  const { pathname } = useLocation();

  if (pathname === '/login') return null;

  return (
    <Grid component="footer" className={footer} container justify="space-around">
      <Grid container item xs={10} md={3} lg={2} direction="column" spacing={1}>
        <Grid item xs="auto">
          <Typography variant="h2" align="center">
            About
          </Typography>
        </Grid>

        <Grid item xs>
          <Typography variant="body1">
            YourCity is a directory for information about your city. Search for businesses, see what's open, learn about
            the local government, and discover YourCity!
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={10} md={3} lg={2}>
        <Typography variant="h2" align="center">
          Discover
        </Typography>

        <List>
          <ListItem button component={Link} to="services#graphics">
            <ListItemText>Businesses</ListItemText>
          </ListItem>

          <ListItem button component={Link} to="services#web">
            <ListItemText>Government</ListItemText>
          </ListItem>
        </List>
      </Grid>

      <Grid container item xs={10} md={3} lg={2} direction="column" spacing={1}>
        <Grid item xs="auto">
          <Typography variant="h2" align="center">
            Contact
          </Typography>
        </Grid>

        <Grid item xs>
          <Typography variant="body1">
            You can reach out to us via email to let us know how we are doing or to correct information on our website.
          </Typography>
        </Grid>

        <Grid item xs="auto">
          <Button component="a" href="mailto:contact@polymathic.company" color="secondary" fullWidth size="large">
            Email Us!
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
