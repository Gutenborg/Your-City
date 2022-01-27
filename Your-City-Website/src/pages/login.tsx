import React, { useEffect } from 'react';
import { Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from '../api';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    height: '100vh',
  },
  paper: {
    padding: spacing(2),
  },
}));

const HomePage: React.FC = () => {
  const { container, paper } = useStyles();
  const { handleSubmit, register } = useForm();
  const { state } = useLocation<{ from?: string }>();
  const { push } = useHistory();

  useEffect(() => {
    const email = sessionStorage.getItem('accessToken');

    if (email) push('/');
  }, [push]);

  const handleLogin: SubmitHandler<{ email: string; password: string }> = async (data) => {
    const loginSuccessful = await login(data);

    if (loginSuccessful) {
      console.log(state);
      push(state?.from ? state.from : '/');
    } else {
      console.log('Login failed.');
    }
  };

  return (
    <Grid className={container} container justify="center" alignItems="center">
      <Grid item xs={6}>
        <Paper className={paper}>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Typography variant="h1">Login</Typography>

            <Grid container spacing={2} justify="center">
              <Grid item xs={8}>
                <TextField label="Email" name="email" inputRef={register} />
              </Grid>

              <Grid item xs={8}>
                <TextField label="Password" name="password" type="password" inputRef={register} />
              </Grid>

              <Grid container item xs={8} justify="flex-end">
                <Grid item xs="auto">
                  <Button type="submit">Login</Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default HomePage;
