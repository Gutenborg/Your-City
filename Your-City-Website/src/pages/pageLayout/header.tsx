import React from 'react';
import { AppBar, Button, ButtonBase, Grid, makeStyles, Toolbar } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { DropdownButton, DropdownItem, ProtectedComponent } from '../../components';
import { logout } from '../../api';

const useStyles = makeStyles(({ palette, spacing }) => ({
  appBar: {
    backgroundColor: palette.background.default,
    marginBottom: spacing(3),
  },
  logo: {
    height: '80px',
    padding: spacing(1),
    width: 'auto',
  },
}));

const Header: React.FC = () => {
  const { appBar, logo } = useStyles();
  const { pathname } = useLocation();
  const { push } = useHistory();

  if (pathname === '/login') return null;

  const handleLogout = async () => {
    const logoutSuccess = logout();

    if (logoutSuccess) {
      window.location.reload();
    }
  };

  const goTo = (path: string) => {
    push(path);
  };

  return (
    <AppBar className={appBar} position="static">
      <Toolbar>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs>
            <ButtonBase component={Link} to="/">
              <img className={logo} src="./images/logo+text-500.png" alt="YourCity.Directory Logo" />
            </ButtonBase>
          </Grid>

          <Grid item xs="auto">
            <Button component={Link} to="/business" variant="text">
              Businesses
            </Button>
          </Grid>

          <Grid item xs="auto">
            <Button component={Link} to="/government" variant="text">
              Government
            </Button>
          </Grid>

          <ProtectedComponent>
            <Grid item xs="auto">
              <DropdownButton label="Admin" variant="text">
                <DropdownItem onClick={() => goTo('/admin')}>Dashboard</DropdownItem>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownButton>
            </Grid>
          </ProtectedComponent>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
