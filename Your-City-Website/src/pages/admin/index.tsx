import React from 'react';
import { Grid, Tabs, Tab, Typography } from '@material-ui/core';
import TabPanel from './pageComponents/tabPanel';
import BusinessTabPanel from './pageComponents/businessTabPanel';

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const AdminPage: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h2">Admin Dashboard</Typography>
      </Grid>

      <Grid item xs="auto">
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
        >
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Businesses" {...a11yProps(0)} />
          <Tab label="Government Bodies" {...a11yProps(1)} />
          <Tab label="Government Seats" {...a11yProps(2)} />
        </Tabs>
      </Grid>

      <Grid item xs>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>

        <TabPanel value={value} index={1}>
          <BusinessTabPanel />
        </TabPanel>

        <TabPanel value={value} index={2}>
          Item Two
        </TabPanel>

        <TabPanel value={value} index={3}>
          Item Three
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default AdminPage;
