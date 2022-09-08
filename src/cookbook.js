import axios from 'axios';
import React from "react";

import Recipe from "./recipe";

import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

class Cookbook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: true,
            isLoading: true,
            recipes: {},
        };
        this.closeRecipeHandler = this.closeRecipeHandler.bind(this);
    }

    async loadData() {
        axios.get(
            'https://static.ifel.live/cookbook/recipes.json',
        ).then(response => {
            this.setState({
                recipes: response.data.recipes,
            });
    
            this.setState({ isLoading: false });
        }).catch(errors => {
            // react on errors.
            console.log("Errors!!! " + errors);
        })
    }

    componentDidMount() {
        this.loadData();
    }

    menuList(){
        const style = {
            textAlign: "left"
        };
        console.log(this.state.recipes);
        const menuEntries = this.state.recipes.map((_, index) =>
            <ListItem
                onClick={(event) => this.clickMenuHandler(index, event)}
                style={style}
                key={index}
            >
                <ListItemText primary={this.state.recipes[index].name} />
            </ListItem>
        );
        return (
            <List>
                {menuEntries}
            </List>
        )
    }

    clickMenuHandler(index, event) {
        this.setState(
            {
                menu: false,
                recipeId: index
            }
        )
    }

    closeRecipeHandler(event) {
        this.setState(
            {
                menu: true,
                recipeId: NaN
            }
        )
    }

    render(){
        var text;
        if (this.state.isLoading === true) {
            text = <CircularProgress />;
        } else if(this.state.menu === true) {
            text = this.menuList();
        } else {
            text = (
                <Recipe
                    data={this.state.recipes[this.state.recipeId]}
                    closeRecipeHandler={this.closeRecipeHandler}
                />
            );
        }

        return (
            <>{text}</>
        );
    }
}

export default Cookbook;