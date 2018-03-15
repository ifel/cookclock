import React, { Component } from 'react';
import './App.css';
import Clock from './clock';
import KeepAwake from './keepAwake';

class App extends Component {
  render() {
      return (
          <div className="App">
              <Clock name='A' />
              <Clock name='B' />
              <Clock name='C' />
              <Clock name='D' />
              <Clock name='Oven' />
              <div className="KeepAwake">
              <KeepAwake/>
              </div>
          </div>
      );
  }
}

export default App;
