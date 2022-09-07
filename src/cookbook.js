import React from "react";
import Recipe from "./recipe";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import plovdata from './data/plov.json';

class Cookbook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: true
        };
        this.recipies = plovdata.recipes;
        this.closeRecipeHandler = this.closeRecipeHandler.bind(this);
    }

    menuList(){
        const style = {
            textAlign: "left"
        };
        const menuEntries = Object.keys(this.recipies).map((item, index) =>
            <ListItem
                onClick={(event) => this.clickMenuHandler(index, event)}
                style={style}
                key={index}
            >
                <ListItemText primary={this.recipies[item].name} />
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
        if (this.state.menu === true) {
            text = this.menuList();
        } else {
            text = (
                <Recipe
                    data={this.recipies[this.state.recipeId]}
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