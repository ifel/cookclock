import React from 'react';

import AppBar from '@mui/material/AppBar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';

import Clock from './clock';
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
        if (e !== undefined) {
            e.preventDefault();
        }
        this.setState({cookingInProgress: true})
    }

    finishCookingHandler(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        this.setState({cookingInProgress: false})
    }

    render() {
        var content;

        if (this.state.cookingInProgress === true) {
            content = <RecipeCooking
                    data = {this.data}
                    finishCookingHandler = {this.finishCookingHandler}
                />
        } else {
            content = <RecipeDescription
                    data = {this.data}
                    startCookingHandler = {this.startCookingHandler}
                />
        }
        return (
            <>
            <AppBar position='relative' sx={{ mt: 1 }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {this.props.data.name}
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="display more actions"
                        edge="end"
                        color="inherit"
                        onClick={this.props.closeRecipeHandler}
                    >
                        <CancelRoundedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {content}
            </>
        );
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
                    <TimelapseRoundedIcon style={imageTimelapseStyle} /> <span style={timeLeftTextStyle}>{h}:{m}</span>
                </div>
                <LinearProgress variant="determinate" value={this.state.secondsNow/this.secondsTotal*100} valueBuffer={100}/>
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

        return (
            <div>
                <div style={textPaneStyle}>
                    {stepData.desc}
                </div>
                <div style={timerPaneStyle}>
                    {this.renderTimer()}
                </div>
                <Divider/>
                <div style={progressBarPaneStyle}>
                    {progressBar}
                </div>
                <Divider/>
                <BottomNavigation
                    showLabels
                    sx={{ position: 'fixed', bottom: 0, width: 1.0 }}
                    onChange={(event, index) => {
                        if (index === 0){
                            // Handle Exit
                            this.props.finishCookingHandler();
                        } else if (index === 1) {
                            // Handle Prev
                            this.handlePrev();
                        } else {
                            // Handle Next
                            this.handleNext();
                        }
                    }}
                    >
                    <BottomNavigationAction label="Exit" icon={<CancelRoundedIcon/>} />
                    <BottomNavigationAction label="Prev" disabled={this.state.step === 0} icon={<ArrowBackRoundedIcon/>} />
                    <BottomNavigationAction label="Next" disabled={this.state.step === this.stepsNum} icon={<ArrowForwardRoundedIcon/>} />
                </BottomNavigation>
            </div>
        );
    }
}

RecipeCooking.propTypes = {
    data: PropTypes.object,
    finishCookingHandler: PropTypes.func,
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
                <ListItem secondaryAction={<Checkbox />} key={index}>
                    <ListItemText primary={item.item.concat(' - ', item.quantity, ' ', item.measure)}/>
                </ListItem>
            );
        const content = (
            <List>{listItems}</List>
        );
        const actions = [
            <Button
                label="Close"
                primary={true}
                onClick={this.handleCloseIngredients}
            />
        ];
        return (
            <Dialog
                open={this.state.showIngredients}
            >
                <DialogTitle>Ingredients</DialogTitle>
                <DialogContent dividers>{content}</DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseIngredients}>Close</Button>
                </DialogActions>
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
        return (
            <>
                <div style={descStyle}>
                {this.props.data.desc}
                </div>
                <div style={buttonPaneStyle}>
                    <Button variant="contained" onClick={this.props.startCookingHandler} style={btnStyle}>Start Cooking</Button>
                    <Button variant="contained" onClick={this.handleOpenIngredients}>Ingredients</Button>
                </div>
                <div>{this.ingredients_content()}</div>
            </>
        )
    }
}

RecipeDescription.propTypes = {
    data: PropTypes.object,
    startCookingHandler: PropTypes.func,
};

export default Recipe;