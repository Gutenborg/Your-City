import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';

export interface TabPanelProps {
  value: number;
  index: number;
}

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(3),
    height: '100%',
  },
}));

const TabPanel: React.FC<TabPanelProps> = ({ children, index, value }) => {
  const classes = useStyles();

  return (
    <Paper
      className={classes.root}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && children}
    </Paper>
  );
};

export default TabPanel;
