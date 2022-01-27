import React, { useEffect, useState } from 'react';
import { Grid, Tab, Typography } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { APISeat, getSeats as getApiSeats } from '../../api';
import SeatListing from './pageComponents/SeatListing';

export const GovernmentPage: React.FC = () => {
  const [seats, setSeats] = useState<APISeat[]>([]);
  const [activeTab, setActiveTab] = useState('local');

  const { search: locationQuery } = useLocation();

  const urlQuery = parse(locationQuery, { arrayFormat: 'none' });
  const searchParam = typeof urlQuery.query === 'string' ? urlQuery.query : '';

  useEffect(() => {
    getSeats();
  }, [searchParam]);

  const getSeats = async () => {
    const apiResults = await getApiSeats();

    if (apiResults) setSeats(apiResults);
  };

  const handleChangeTab = (e: React.ChangeEvent<{}>, value: string) => {
    setActiveTab(value);
  };

  const localSeats = seats.filter((seat) => seat.level === 'local');
  const countySeats = seats.filter((seat) => seat.level === 'county');
  const stateSeats = seats.filter((seat) => seat.level === 'state');
  const federalSeats = seats.filter((seat) => seat.level === 'federal');

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h2">Explore Your Government</Typography>
      </Grid>

      <Grid item xs={12}>
        <TabContext value={activeTab}>
          <TabList onChange={handleChangeTab} aria-label="government-level-tabs" variant="fullWidth">
            <Tab label="Local" value="local" />
            <Tab label="County" value="county" />
            <Tab label="State" value="state" />
            <Tab label="Federal" value="federal" />
          </TabList>

          <TabPanel value="local">
            <Grid container spacing={2}>
              {localSeats.map((seat) => (
                <Grid item xs={12} key={seat._id}>
                  <SeatListing {...seat} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value="county">
            <Grid container spacing={2}>
              {countySeats.map((seat) => (
                <Grid item xs={12} key={seat._id}>
                  <SeatListing {...seat} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value="state">
            <Grid container spacing={2}>
              {stateSeats.map((seat) => (
                <Grid item xs={12} key={seat._id}>
                  <SeatListing {...seat} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value="federal">
            <Grid container spacing={2}>
              {federalSeats.map((seat) => (
                <Grid item xs={12} key={seat._id}>
                  <SeatListing {...seat} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  );
};

export default GovernmentPage;
