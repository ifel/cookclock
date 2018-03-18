import React, { Component } from 'react';
import './App.css';
import MultiClock from './multiClock';
import {Tabs, Tab} from 'material-ui/Tabs';
import Cookbook from './cookbook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


class App extends Component {
  render() {
      return (
          <MuiThemeProvider muiTheme={getMuiTheme()}>
              <Tabs>
                  <Tab label="Multi Clock">
                      <div className="App">
                          <MultiClock/>
                      </div>
                  </Tab>
                  <Tab label="Cookbook">
                      <div>
                          <Cookbook/>
                      </div>
                  </Tab>
              </Tabs>
          </MuiThemeProvider>
      );
  }
}

export default App;
