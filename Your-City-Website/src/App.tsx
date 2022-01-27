import React from 'react';
import * as Pages from './pages';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';
import Header from './pages/pageLayout/header';
import Footer from './pages/pageLayout/footer';
import { ProtectedRoute } from './components';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />

      <Router>
        <Header />

        <Container component="main">
          <Switch>
            <Route path="/login">
              <Pages.LoginPage />
            </Route>

            <ProtectedRoute path="/admin">
              <Pages.AdminPage />
            </ProtectedRoute>

            <Route path="/business/:id" exact>
              <Pages.BusinessDetailsPage />
            </Route>

            <Route path="/business">
              <Pages.BusinessPage />
            </Route>

            <Route path="/government">
              <Pages.GovernmentPage />
            </Route>

            <Route>
              <Pages.HomePage />
            </Route>
          </Switch>
        </Container>

        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
