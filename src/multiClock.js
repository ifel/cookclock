import React, { Component } from 'react';
import Clock from './clock';
import Divider from 'material-ui/Divider';

class MultiClock extends Component {
    render() {
        return (
            <div>
                <Clock name='A' nosleep="true" />
                <Clock name='B' nosleep="true" />
                <Clock name='C' nosleep="true" />
                <Clock name='D' nosleep="true" />
                <Clock name='Oven' nosleep="true" />
                <Divider/>
                <div><h3>Countdowns</h3></div>
                <Clock countdown="true" initialTime="60" nosleep="true" />
                <Clock countdown="true" initialTime="120" nosleep="true" />
                <Clock countdown="true" initialTime="180" nosleep="true" />
                <Clock countdown="true" initialTime="300" nosleep="true" />
                <Clock countdown="true" initialTime="600" nosleep="true" />
                <Clock countdown="true" initialTime="900" nosleep="true" />
            </div>
        );
    }
}

export default MultiClock;
