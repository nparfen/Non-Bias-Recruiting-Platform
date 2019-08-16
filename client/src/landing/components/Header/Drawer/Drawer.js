import React from 'react';
import { Link } from 'react-router-dom';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    list: {
        width: 250,
    },
    listItemTypography: {
        fontSize: "16px",
        fontWeight: 600,
    },
});

const Item = ({ textStyle, title, href, ...props }) => (
    <ListItem 
        button 
        component={Link} 
        to={href} 
        {...props}
    >
        <ListItemText 
            primaryTypographyProps={{color:"primary", className: textStyle}} 
            primary={title} 
        />
    </ListItem>
)

const Drawer = ({ locationPathname, isOpen, toggleDrawer, classes }) => (
    <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
    >
        <div
            tabIndex={0}
            role="button"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <div className={classes.list}>
                <List>
                    <Item 
                        title="Login" 
                        href="/login" 
                        replace={"/login" === locationPathname}
                        textStyle={classes.listItemTypography}
                    />
                    <Item 
                        title="Sign Up" 
                        href="/signup" 
                        replace={"/signup" === locationPathname}
                        textStyle={classes.listItemTypography}
                    />
                </List>
                <Divider />
                <List>
                    <Item 
                        title="Home" 
                        href="/home" 
                        replace={"/home" === locationPathname}
                        textStyle={classes.listItemTypography}
                    />
                    <Item 
                        title="Jobs" 
                        href="/jobs" 
                        replace={"/jobs" === locationPathname}
                        textStyle={classes.listItemTypography}
                    />
                    <Item 
                        title="Candidates" 
                        href="/candidates" 
                        replace={"/candidates" === locationPathname}
                        textStyle={classes.listItemTypography}
                    />
                    <Item 
                        title="Companies" 
                        href="/companies"
                        replace={"/companies" === locationPathname}
                        textStyle={classes.listItemTypography}
                    />
                    <Item 
                        title="Hubs" 
                        href="/hubs"
                        replace={"/hubs" === locationPathname}
                        textStyle={classes.listItemTypography}
                    />
                </List>
            </div>
        </div>
    </SwipeableDrawer>
)

export default withStyles(styles)(Drawer);