import React from 'react';
import { Link } from 'react-router-dom';
// import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    popoverPaper: {
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    },
    menuItem: {
        minWidth: "282px",
        height: 40,
        padding: "0 24px",
        fontSize: "16px",
        fontWeight: 500,
        color: theme.palette.primary.main,
    },
    customBage: {
        top: 0,
        right: -32,
        fontWeight: "normal"
    },
    menuIconsSection: {
        [theme.breakpoints.up('1080')]: {
            display: 'none',
        },
    },
});

const Menu = ({ locationPathname, isOpen, anchorEl, handleMenuClose, handleLogoutFromMenu, classes }) => (
    <Popover
        open={isOpen} 
        onClose={handleMenuClose} 
        anchorEl={anchorEl} 
        classes={{ paper: classes.popoverPaper}}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
        <div className={classes.menuIconsSection}>
            <MenuItem 
                className={classes.menuItem} 
                onClick={handleMenuClose} 
                component={Link} 
                to="/inbox"
                replace={"/inbox" === locationPathname}
            >
                {/* <Badge 
                    classes={{ badge: classes.customBage }}
                    badgeContent={4} 
                    color="secondary"
                >
                    Inbox
                </Badge> */}
                Inbox
            </MenuItem>
            <MenuItem 
                className={classes.menuItem} 
                onClick={handleMenuClose} 
                component={Link} 
                to="/notifications"
                replace={"/notifications" === locationPathname}
            >
                {/* <Badge
                    classes={{ badge: classes.customBage }}
                    badgeContent={17} 
                    color="secondary"
                >
                    Notifications
                </Badge> */}
                Notifications
            </MenuItem>
        </div>
        <MenuItem 
            className={classes.menuItem} 
            onClick={handleMenuClose} 
            component={Link} 
            to="/settings"
            replace={"/settings" === locationPathname}
        >
            Settings
        </MenuItem>
        <MenuItem 
            className={classes.menuItem} 
            onClick={handleLogoutFromMenu}
        >
                Log Out
        </MenuItem>
    </Popover>
);

export default withStyles(styles)(Menu);