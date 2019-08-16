import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from './Drawer';

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
        width: "60px",
        height: "60px",
        objectFit: "contain"
    },
    grow: {
        flexGrow: 1,
    },
    link: {
        borderRadius: 0,
        padding: "0 20px",
        fontSize: "18px",
        fontWeight: 600,
        color: theme.palette.secondary.dark,
        textTransform: "capitalize",
        '&:hover':{
            color: theme.palette.primary.main,
            backgroundColor: "transparent"
        }
    },
    vDivider: {
        width: "2px",
        height: "26px",
        backgroundColor: "#c8c7cc",
        margin: "auto 20px",
    },
    loginLink: {
        borderRadius: 0,
        padding: "0 20px",
        marginRight: "10px",
        fontSize: "18px",
        fontWeight: "bold",
        textTransform: "uppercase",
        '&:hover':{
            backgroundColor: "transparent"
        }
    },
    signupLink: {
        height: 47,
        borderRadius: 3,
        padding: "0 40px",
        fontSize: "18px",
        fontWeight: "bold",
        textTransform: "capitalize",
        boxShadow: "none !important",
        backgroundColor: theme.palette.secondary.dark,
        '&:hover':{
            color: "white",
            backgroundColor: theme.palette.primary.main,
        }
    },
    linksSection: {
        display: 'none',
        [theme.breakpoints.up('940')]: {
            display: 'flex',
        }
    },
    menuIconSection: {
        display: 'flex',
        [theme.breakpoints.up('940')]: {
            display: 'none',
        },
    }
});

class DefaultHeader extends Component {
 
    state = {
        isDrawerOpen: false
    };

    toggleDrawer = () => {
        let { isDrawerOpen } = this.state;
        this.setState({isDrawerOpen: !isDrawerOpen});
    };

    render() {

        let { isDrawerOpen } = this.state;
        let { redux, classes } = this.props;

        let { locationPathname } = redux;

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
                        <div className={classes.grow} />
                        <div className={classes.linksSection}>
                            <Button 
                                component={Link} 
                                to="/home" 
                                replace={"/home" === locationPathname}
                                color="primary"
                                className={classes.link}
                                disableRipple={true}
                            >
                                Home
                            </Button>
                            <Button 
                                component={Link} 
                                to="/jobs" 
                                replace={"/jobs" === locationPathname}
                                color="primary"
                                className={classes.link}
                                disableRipple={true}
                            >
                                Jobs
                            </Button>
                            <Button 
                                component={Link} 
                                to="/candidates" 
                                replace={"/candidates" === locationPathname}
                                color="primary"
                                className={classes.link}
                                disableRipple={true}
                            >
                                Candidates
                            </Button>
                            <Button 
                                component={Link} 
                                to="/companies" 
                                replace={"/companies" === locationPathname}
                                color="primary"
                                className={classes.link}
                                disableRipple={true}
                            >
                                Companies
                            </Button>
                            <Button 
                                component={Link} 
                                to="/hubs" 
                                replace={"/hubs" === locationPathname}
                                color="primary"
                                className={classes.link} 
                                disableRipple={true}
                            >
                                Hubs
                            </Button>
                            <div className={classes.vDivider} />
                            <Button 
                                component={Link} 
                                to="/login" 
                                replace={"/login" === locationPathname}
                                color="primary"
                                className={classes.loginLink} 
                                disableRipple={true}
                            >
                                Login
                            </Button>
                            <Button 
                                component={Link} 
                                to="/signup" 
                                replace={"/signup" === locationPathname}
                                color="primary"
                                variant="contained"
                                className={classes.signupLink}
                            >
                                Sign Up
                            </Button>
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
                <Drawer 
                    isOpen={isDrawerOpen} 
                    toggleDrawer={this.toggleDrawer} 
                    locationPathname={locationPathname}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    redux : {
        locationPathname: state.router.location.pathname,
    }
})

export default connect(mapStateToProps, {})(withStyles(styles)(DefaultHeader));