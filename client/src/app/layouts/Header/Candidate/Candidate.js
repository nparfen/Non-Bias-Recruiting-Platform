import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import classnames from 'classnames';

import { logout } from '../../../ducks/actions';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
// import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from './Drawer';
import Menu from './Menu';

import { MdNotificationsNone, MdMailOutline } from 'react-icons/md';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import { withStyles } from '@material-ui/core/styles';

import aspireLogo from '../../../assets/aspire-logo.svg';

const styles = theme => ({
    appbar: {
        backgroundColor: "white",
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    },
    toolbar: {
        width: 'auto',
        marginLeft: '24px',
        marginRight: '24px',
        [theme.breakpoints.up(1200)]: {
            width: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    logo: {
        margin: "10px 0",
        marginRight: "52px",
        width: "60px",
        height: "60px",
        objectFit: "contain"
    },
    grow: {
        flexGrow: 1,
    },
    link: {
        borderRadius: 0,
        minWidth: "inherit",
        padding: "8px 0",
        margin: "0 18px",
        fontSize: "16px",
        fontWeight: 600,
        textTransform: "capitalize",
        '&:hover':{
            backgroundColor: "transparent"
        },
        '&.active':{
            paddingBottom: "5px",
            borderBottomWidth: "3px",
            borderBottomStyle: "solid",
            borderBottomColor: theme.palette.primary.main
        }
    },
    typographySection: {
        justifyContent: "center",
        flexDirection: "column",
        padding: "12px",
        display: "flex"
    },
    avatarSection: {
        paddingLeft: "0px",
        '&:hover':{
            backgroundColor: "transparent"
        }
    },
    avatar: {
        margin: 4,
    },
    usernameTypography: {
        fontSize: "15px",
        fontWeight: 600
    },
    linksSection: {
        display: 'none',
        [theme.breakpoints.up('760')]: {
            display: 'flex',
        },
    },
    iconsSection: {
        display: 'none',
        [theme.breakpoints.up('1080')]: {
            display: 'flex',
        },
    },
    userDetailsSection: {
        display: 'none',
        [theme.breakpoints.up('960')]: {
            display: 'flex',
        },
    },
    menuIconSection: {
        display: 'flex',
        [theme.breakpoints.up('960')]: {
            display: 'none',
        },
    },
});

class CandidateHeader extends Component {
 
    state = {
        isMenuOpen: false,
        isDrawerOpen: false
    };

    toggleDrawer = () => {
        let { isDrawerOpen } = this.state;
        this.setState({isDrawerOpen: !isDrawerOpen});
    };

    handleMenuToggle = () => {
        let { isMenuOpen } = this.state;
        this.setState({ isMenuOpen: !isMenuOpen });
    };

    handleMenuClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({ isMenuOpen: false });
    };

    handleLogoutFromMenu = event => {
        let { logout } = this.props;
        this.setState({ isMenuOpen: false });
        logout();
    };

    handleLogoutFromDrawer = event => {
        let { logout } = this.props;
        this.setState({ isDrawerOpen: false });
        logout();
    };

    render() {

        let { isMenuOpen, isDrawerOpen } = this.state;
        let { redux, classes } = this.props;
        
        let { locationPathname, userData } = redux;

        return (
            <Fragment>
                <AppBar 
                    className={classes.appbar} 
                    position="static"
                >
                    <Toolbar 
                        className={classes.toolbar}
                        disableGutters={true}
                    >
                        <Link 
                            to="/"
                            replace={"/" === locationPathname}
                        >
                            <img 
                                src={aspireLogo} 
                                className={classes.logo} 
                                alt="logo"
                            />
                        </Link>
                        <div className={classes.linksSection}>
                            <Button 
                                component={Link} 
                                to="/home" 
                                replace={"/home" === locationPathname}
                                color="primary"
                                className={classnames(classes.link, { active: locationPathname === '/home' })} 
                                disableRipple={true}
                            >
                                    Home
                            </Button>
                            <Button 
                                component={Link} 
                                to="/jobs" 
                                replace={"/jobs" === locationPathname}
                                color="primary"
                                className={classnames(classes.link, { active: (locationPathname === '/jobs' || locationPathname === '/jobs/create') })} 
                                disableRipple={true}
                            >
                                    Jobs
                            </Button>
                            <Button 
                                component={Link} 
                                to="/companies" 
                                replace={"/companies" === locationPathname}
                                color="primary"
                                className={classnames(classes.link, { active: locationPathname === '/companies' })} 
                                disableRipple={true}
                            >
                                Companies
                            </Button>
                            <Button 
                                component={Link} 
                                to="/shortlist" 
                                replace={"/shortlist" === locationPathname}
                                color="primary"
                                className={classnames(classes.link, { active: locationPathname === '/shortlist' })} 
                                disableRipple={true}
                            >
                                Shortlist
                            </Button>
                            <Button 
                                component={Link} 
                                to="/claims" 
                                replace={"/claims" === locationPathname}
                                color="primary"
                                className={classnames(classes.link, { active: locationPathname === '/claims' })} 
                                disableRipple={true}
                            >
                                Claims
                            </Button>
                            <Button 
                                component={Link} 
                                to="/profile" 
                                replace={"/profile" === locationPathname}
                                color="primary"
                                className={classnames(classes.link, { active: locationPathname === '/profile' })} 
                                disableRipple={true}
                            >
                                My Profile
                            </Button>
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.iconsSection}>
                            <IconButton 
                                color="primary"
                                component={Link} 
                                to="/inbox"
                                replace={"/inbox" === locationPathname}
                            >
                                {/* <Badge 
                                    badgeContent={4} 
                                    color="secondary"
                                >
                                    <MdMailOutline />
                                </Badge> */}
                                <MdMailOutline />
                            </IconButton>
                            <IconButton
                                color="primary"
                                component={Link} 
                                to="/notifications"
                                replace={"/notifications" === locationPathname}
                            >
                                {/* <Badge 
                                    badgeContent={17} 
                                    color="secondary"
                                >
                                    <MdNotificationsNone />
                                </Badge> */}
                                <MdNotificationsNone />
                            </IconButton>
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.userDetailsSection}>
                            <div className={classes.typographySection}>
                                <Typography color="primary" className={classes.usernameTypography}>
                                    {userData.firstname + " " + userData.lastname}
                                </Typography>
                            </div>
                            <IconButton
                                buttonRef={node => {
                                    this.anchorEl = node;
                                }}
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenuToggle}
                                className={classes.avatarSection}
                                color="primary"
                            >
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
                                <ArrowDropDown />
                            </IconButton>
                        </div>
                        <div className={classes.menuIconSection}>
                            <IconButton 
                                className={classes.menuIcon} 
                                aria-haspopup="true" 
                                onClick={this.toggleDrawer} 
                                color="primary"
                            >
                                <MenuIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <Menu 
                    isOpen={isMenuOpen} 
                    anchorEl={this.anchorEl} 
                    handleMenuClose={this.handleMenuClose} 
                    handleLogoutFromMenu={this.handleLogoutFromMenu} 
                    locationPathname={locationPathname}
                />
                <Drawer 
                    isOpen={isDrawerOpen}   
                    toggleDrawer={this.toggleDrawer}
                    handleLogoutFromDrawer={this.handleLogoutFromDrawer}
                    redux={redux}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    redux : {
        locationPathname: state.router.location.pathname,
        userData: state.user.data
    }
})

export default connect(mapStateToProps, {
    logout
})(withStyles(styles)(CandidateHeader));