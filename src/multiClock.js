import React, { Component } from 'react';
import Clock from './clock';
import KeepAwake from './keepAwake';

class MultiClock extends Component {
    render() {
        return (
            <div>
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

export default MultiClock;
