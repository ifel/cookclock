import React from 'react';
import NoSleep from 'nosleep.js';
import './App.css';

class KeepAwake extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAwake: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.noSleep = new NoSleep();
    }

    handleClick(event) {
        const target = event.target;
        const name = target.name;
        const value = target.checked;
        if (value === true) {
            this.noSleep.enable()
        } else {
            this.noSleep.disable()
        }
        this.setState({
            [name]: value
        });
    }

    render() {
        return(
            <div>
                <label>
                    Keep awake:
                    <input
                        name="isAwake"
                        type="checkbox"
                        checked={this.state.isAwake}
                        onChange={this.handleClick} />
                </label>
            </div>
        );
    }
}

export default KeepAwake;