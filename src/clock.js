import React from 'react';
import './App.css';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: 0, state: 0};
        this.btnTapped = this.btnTapped.bind(this);
    }
    tick() {
        this.setState({
            date: this.state.date + 1
        });
    }
    btnTapped() {
        if (this.state.state === 0) {
            this.setState({
                state: 1
            });
            this.timerID = setInterval(
                () => this.tick(),
                100
            );
            console.log("Start timer");
        } else if (this.state.state === 1) {
            this.setState({
                state: 2
            });
            console.log("Stop timer");
            clearInterval(this.timerID);
        } else if (this.state.state === 2) {
            this.setState({
                state: 0,
                date: 0
            });
            console.log("reset timer");
        }
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        let now = new Date(this.state.date * 100);
        let h = now.getHours().toLocaleString(undefined, {minimumIntegerDigits: 2});
        let m = now.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2});
        let s = now.getSeconds().toLocaleString(undefined, {minimumIntegerDigits: 2});
        let ms = now.getMilliseconds().toLocaleString(undefined, {minimumIntegerDigits: 3});
        let headerText = "";
        if (this.props.name) {
            headerText = <div className="Clock-header">{this.props.name}:</div>
        }
        return (
            <div onClick={this.btnTapped} className="Clock">
                {headerText}<div className="Clock-text">{h}:{m}:{s}.{ms}</div>
            </div>
        );
    }
}

export default Clock;