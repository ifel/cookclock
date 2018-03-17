import React from "react";
import Recipe from "./recipe";
import {List, ListItem} from 'material-ui/List';
import plovdata from './data/plov.json';

class Cookbook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: true
        };
        this.recipies = [plovdata];
        this.closeRecipeHandler = this.closeRecipeHandler.bind(this);
    }

    menuList(){
        const style = {
            textAlign: "left"
        };
        const menuEntries = this.recipies.map((item, index) =>
            <ListItem
                primaryText={item.name}
                onClick={(event) => this.clickMenuHandler(index, event)}
                style={style}
                key={index}
            />
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
        let text = '';
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
            <div>
                {text}
            </div>
        );
    }
}

export default Cookbook;