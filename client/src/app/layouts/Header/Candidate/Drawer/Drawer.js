import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Avatar from '@material-ui/core/Avatar';
// import Badge from '@material-ui/core/Badge';
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
    avatar: {
        margin: 4,
    },
    companyTypography: {
        fontSize: "14px",
        fontWeight: "normal",
        color: theme.palette.secondary.dark
    },
    usernameTypography: {
        fontSize: "15px",
        fontWeight: 600
    }
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

const ItemWithBadge = ({ textStyle, badge, title, href, ...props }) => (
    <ListItem 
        button 
        component={Link} 
        to={href} 
        {...props}
    >
        {/* <Badge 
            badgeContent={badge} 
            color="secondary"
        >
            <ListItemText 
                primaryTypographyProps={{color:"primary", className: textStyle}} 
                primary={title} />
        </Badge> */}
        <ListItemText 
            primaryTypographyProps={{color:"primary", className: textStyle}} 
            primary={title} />
    </ListItem>
)

const Drawer = ({ isOpen, toggleDrawer, redux: { locationPathname, userData }, handleLogoutFromDrawer, classes }) => (
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
                    <ListItem>
                        {_.has(userData, "avatar") ?
                            <Avatar 
                                alt="Avatar" 
                                src={userData.avatar} 
                                className={classes.avatar} 
                            />
                            :
                            <Avatar className={classes.avatar}>
                                {userData.firstname.charAt(0)}
                            </Avatar>
                        }
                        <ListItemText 
                            primaryTypographyProps={{color: "primary", className: classes.usernameTypography}} 
                            primary={userData.firstname + " " + userData.lastname} 
                            secondaryTypographyProps={{className: classes.companyTypography}} 
                            secondary={userData.companyname} 
                        />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ItemWithBadge 
                        title="Inbox" 
                        href="/inbox" 
                        replace={"/inbox" === locationPathname}
                        badge={4} 
                        textStyle={classes.listItemTypography} 
                        selected={locationPathname === '/inbox'} 
                    />
                    <ItemWithBadge 
                        title="Notifications" 
                        href="/notifications" 
                        replace={"/notifications" === locationPathname}
                        badge={17} 
                        textStyle={classes.listItemTypography} 
                        selected={locationPathname === '/notifications'} 
                    />
                    <Item 
                        title="Settings" 
                        href="/settings" 
                        replace={"/settings" === locationPathname}
                        textStyle={classes.listItemTypography} 
                        selected={locationPathname === '/settings'} 
                    />
                    <ListItem 
                        button
                        onClick={handleLogoutFromDrawer}
                    >
                        <ListItemText 
                            primaryTypographyProps={{color:"primary", className: classes.listItemTypography}} 
                            primary="Log Out" 
                        />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <Item 
                        title="Home" 
                        href="/home" 
                        replace={"/home" === locationPathname}
                        textStyle={classes.listItemTypography} 
                        selected={locationPathname === '/home'} 
                    />
                    <Item 
                        title="Jobs" 
                        href="/jobs" 
                        replace={"/jobs" === locationPathname}
                        textStyle={classes.listItemTypography} 
                        selected={locationPathname === '/jobs' || locationPathname === '/jobs/create' } 
                    />
                    <Item 
                        title="Companies" 
                        href="/companies" 
                        replace={"/companies" === locationPathname}
                        textStyle={classes.listItemTypography} 
                        selected={locationPathname === '/companies'} 
                    />
                    <Item 
                        title="Shortlist" 
                        href="/shortlist" 
                        replace={"/shortlist" === locationPathname}
                        textStyle={classes.listItemTypography} 
                        selected={locationPathname === '/shortlist'} 
                    />
                    <Item 
                        title="Claims" 
                        href="/claims" 
                        replace={"/claims" === locationPathname}
                        textStyle={classes.listItemTypography} 
                        selected={locationPathname === '/claims'} 
                    />
                    <Item 
                        title="My Profile" 
                        href="/profile" 
                        replace={"/profile" === locationPathname}
                        textStyle={classes.listItemTypography} 
                        selected={locationPathname === '/profile'} 
                    />
                </List>
            </div>
        </div>
    </SwipeableDrawer>
)

export default withStyles(styles)(Drawer);