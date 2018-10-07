import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import LinearProgress from 'material-ui/LinearProgress';
import Clock from './clock';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import ActionDone from 'material-ui/svg-icons/action/done';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ImageTimelapse from 'material-ui/svg-icons/image/timelapse';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.startCookingHandler = this.startCookingHandler.bind(this);
        this.finishCookingHandler = this.finishCookingHandler.bind(this);
        this.data = this.props.data;
        this.state = {
            cookingInProgress: false
        }
    }

    startCookingHandler(e) {
        e.preventDefault();
        this.setState({cookingInProgress: true})
    }

    finishCookingHandler(e) {
        e.preventDefault();
        this.setState({cookingInProgress: false})
    }

    render() {
        let appBarStyle = {
            textAlign: "left"
        };
        let appBar = <AppBar
            title={this.props.data.name}
            iconElementLeft={<IconButton><NavigationClose onClick={this.props.closeRecipeHandler}/></IconButton>}
            style={appBarStyle}
        />;

        if (this.state.cookingInProgress === true) {
            return (
                <RecipeCooking
                    data = {this.data}
                    finishCookingHandler = {this.finishCookingHandler}
                    appBar = {appBar}
                />
            )
        } else {
            return (
                <RecipeDescription
                    data = {this.data}
                    startCookingHandler = {this.startCookingHandler}
                    appBar = {appBar}
                />
            )
        }
    }
}

Recipe.propTypes = {
    data: PropTypes.object,
    closeRecipeHandler: PropTypes.func
};

class RecipeCooking extends React.Component {
    constructor(props) {
        super(props);
        this.secondsTotal = this.props.data.steps.reduce((a, b) => a + b.time, 0);
        this.stepsNum = this.props.data.steps.length;
        this.state = {
            secondsNow: 0,
            step: 0
        };
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    handleNext () {
        this.setState({
            secondsNow: this.state.secondsNow + this.props.data.steps[this.state.step].time,
            step: this.state.step + 1
        });
    }

    handlePrev () {
        this.setState({ showIngredients: false });
        this.setState({
            secondsNow: this.state.secondsNow - this.props.data.steps[this.state.step-1].time,
            step: this.state.step - 1
        });
    }

    render_progress_bar() {
        let now = new Date((this.secondsTotal - this.state.secondsNow) * 1000);
        let h = now.getUTCHours().toLocaleString(undefined, { minimumIntegerDigits: 2 });
        let m = now.getUTCMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 });
        const timeLeftStyle = {
            marginRight: 10,
            textAlign: "right",
            verticalAlign: "middle"
        };
        const timeLeftTextStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            fontFamily: "arial",
            fontSize: "20px"
        };
        const imageTimelapseStyle = {
            verticalAlign: "middle"
        };
        return (
            <div>
                <div style={timeLeftStyle}>
                    <ImageTimelapse style={imageTimelapseStyle} /> <span style={timeLeftTextStyle}>{h}:{m}</span>
                </div>
                <LinearProgress mode="determinate" value={this.state.secondsNow} max={this.secondsTotal}/>
            </div>
        );
    }

    renderTimer() {
        let stepData = this.props.data.steps[this.state.step];
        let timerText = "";
        let key = "timer_" + this.state.step;
        if (stepData.timer === true) {
            timerText = <Clock initialTime={stepData.time} countdown={stepData.countdown} nosleep={true} key={key}/>;
        }
        return timerText;
    }

    render() {
        let progressBar = this.render_progress_bar();
        let nextBtn;
        let prevBtn;
        const btnStyle = {
            marginRight: 50,
        };
        const btnPaneStyle = {
            marginTop: 50,
            textAlign: "center"
        };
        const progressBarPaneStyle = {
            marginTop: 30
        };
        const timerPaneStyle = {
            marginTop: 10,
            textAlign: "center"
        };
        const textPaneStyle = {
            marginTop: 10,
            marginBottom: 10,
            textAlign: "justify",
            textIndent: "30px",
            marginLeft: 5,
            marginRight: 5
        };
        let stepData = this.props.data.steps[this.state.step];
        let timerText = this.renderTimer();
        let text = (
            <div>
                {stepData.desc}
            </div>
        );
        // Generate prev button behavior
        if (this.state.step === 0) {
            prevBtn = <NavigationCancel onClick={this.props.finishCookingHandler}/>;
        } else {
            prevBtn = <NavigationArrowBack onClick={this.handlePrev}/>;
        }
        // Generate next button behavior
        if (this.state.step === this.stepsNum - 1) {
            nextBtn = <ActionDone onClick={this.props.finishCookingHandler}/>;
        } else {
            nextBtn = <NavigationArrowForward onClick={this.handleNext}/>;
        }
        return (
            <div>
                {this.props.appBar}
                <div style={textPaneStyle}>
                    {text}
                </div>
                <div style={timerPaneStyle}>
                    {timerText}
                </div>
                <Divider/>
                <div style={progressBarPaneStyle}>
                    {progressBar}
                </div>
                <Divider/>
                <div style={btnPaneStyle}>
                    <FloatingActionButton mini={true} style={btnStyle}>{prevBtn}</FloatingActionButton>
                    <FloatingActionButton mini={true}>{nextBtn}</FloatingActionButton>
                </div>
            </div>
        );
    }
}

RecipeCooking.propTypes = {
    data: PropTypes.object,
    finishCookingHandler: PropTypes.func,
    appBar: PropTypes.element
};

class RecipeDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showIngredients: false
        };
        this.handleOpenIngredients = this.handleOpenIngredients.bind(this);
        this.handleCloseIngredients = this.handleCloseIngredients.bind(this);
    }

    handleOpenIngredients () {
        this.setState({ showIngredients: true });
    }

    handleCloseIngredients () {
        this.setState({ showIngredients: false });
    }

    ingredients_content() {
        const listItems = this.props.data.ingredients.map((item, index) =>
            <ListItem leftCheckbox={<Checkbox />} primaryText={item.item.concat(' - ', item.quantity, ' ', item.measure)} key={index}/>);
        const content = (
            <List>{listItems}</List>
        );
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleCloseIngredients}
            />
        ];
        return (
            <Dialog
                title="Ingredients"
                actions={actions}
                modal={true}
                open={this.state.showIngredients}
                autoScrollBodyContent={true}
            >
                {content}
            </Dialog>
        );
    }

    render() {
        const btnStyle = {
            marginRight: 20,
        };
        const descStyle = {
            marginTop: 10,
            textAlign: "justify",
            textIndent: "30px",
            marginLeft: 5,
            marginRight: 5
        };
        const buttonPaneStyle = {
            marginTop: 10,
            textAlign: "center"
        };
        return <div>
            {this.props.appBar}
            <div style={descStyle}>
            {this.props.data.desc}
            </div>
            <div style={buttonPaneStyle}>
                <RaisedButton label="Start Cooking" primary={true} onClick={this.props.startCookingHandler} style={btnStyle}/>
                <RaisedButton label="Ingredients" secondary={true} onClick={this.handleOpenIngredients} />
            </div>
            <div>{this.ingredients_content()}</div>
        </div>
    }
}

RecipeDescription.propTypes = {
    data: PropTypes.object,
    startCookingHandler: PropTypes.func,
    appBar: PropTypes.element
};

export default Recipe;