import React, { Component } from 'react';
import './App.css';
import MultiClock from './multiClock';
import { Tab, Tabs } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Cookbook from './cookbook';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Typography variant="body1">{children}</Typography>
        )}
      </div>
    );
  }
  

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};


function App() {
    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Multi Clock" {...a11yProps(0)} />
                <Tab label="Cookbook" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0} className="App">
                <MultiClock />
            </TabPanel>
            <TabPanel value={value} index={1} className="App">
                <Cookbook />
            </TabPanel>
        </>
    );
}

export default App;
