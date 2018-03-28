import React from 'react';
import './App.css';
import NoSleep from 'nosleep.js';
import PropTypes from 'prop-types';

class Clock extends React.Component {
    constructor(props) {
        super(props);

        this.countdown = this.props.countdown === true;
        this.state = {
            date: this.initialValue(),
            state: 0,
        };
        this.btnTapped = this.btnTapped.bind(this);
        this.noSleep = new NoSleep();
    }
    initialValue(){
        let date = 0;
        if (this.props.initialTime){
            date = parseInt(this.props.initialTime, 10) * 10
        }
        return date;
    }
    tick() {
        let date;
        if (this.countdown === true) {
            if (this.state.date <= 1) {
                date = 0;
                this.disableNoSleep();
                this.alarm.play();
            } else {
                date = this.state.date - 1;
            }
        } else {
            date = this.state.date + 1
        }
        this.setState({
            date: date
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
            this.enableNoSleep();
            console.log("Start timer");
        } else if (this.state.state === 1) {
            this.setState({
                state: 2
            });
            this.disableNoSleep();
            console.log("Stop timer");
            clearInterval(this.timerID);
        } else if (this.state.state === 2) {
            this.setState({
                state: 0,
                date: this.initialValue()
            });
            console.log("reset timer");
        }
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
        this.disableNoSleep();
    }
    enableNoSleep() {
        if (this.props.nosleep === true) {
            this.noSleep.enable()
        }
    }
    disableNoSleep() {
        if (this.props.nosleep === true) {
            this.noSleep.disable();
        }
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
                <audio ref={(alarm) => { this.alarm = alarm; }}>
                    <source src="http://soundbible.com/grab.php?id=1819&type=mp3" type="audio/mpeg" >
                    </source>
                </audio>
            </div>
        );
    }
}

Clock.propTypes = {
    countdown: PropTypes.bool,
    initialTime: PropTypes.number,
    nosleep: PropTypes.bool,
    name: PropTypes.string
};

export default Clock;