import axios from 'axios';
import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText'

class Links extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: {},
        }
    }

    async loadData() {
        axios.get(
            'https://static.ifel.live/cookbook/links.json',
        ).then(response => {
            response.data.links.sort(function(a, b){return a.name < b.name ? -1 : 1});
            this.setState({
                data: response.data.links,
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

    render() {
        return (
            <>
            {
                this.state.isLoading === true ? (
                    <><CircularProgress /></>
                ) : (
                    this.state.data.map(item => (
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href={item.href}>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        )
                    )
                )
            }
            </>
        )
    }
}

export default Links;