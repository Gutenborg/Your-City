import React from 'react';
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export interface BusinessSearchResultProps {
  category?: string;
  id: string;
  name: string;
}

const useStyles = makeStyles(({ spacing }) => ({
  paper: {
    padding: spacing(2),
  },
}));

export const BusinessSearchResult: React.FC<BusinessSearchResultProps> = ({ category, id, name }) => {
  const { paper } = useStyles();

  return (
    <Paper className={paper}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="h3">{name}</Typography>
        </Grid>

        <Grid item xs="auto">
          <Button component={Link} color="primary" to={`/business/${id}`}>
            View Details
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BusinessSearchResult;
