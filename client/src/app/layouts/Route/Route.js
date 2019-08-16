import React from 'react';
import { Route } from 'react-router-dom';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    toast: {
        minHeight: "inherit",
        alignItems: "center",
        padding: "12px 24px",
        fontSize: "16px",
        fontFamily: "SF Display",
        fontWeight: 500,
        boxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)"
    },
    iconButton: {
        marginLeft: "8px",
        height: "auto"
    },
    close: {
        fontSize: "20px"
    }
});

const CloseButton = ({ closeToast, classes }) => (
    <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={classes.iconButton}
        onClick={closeToast}
    >
        <CloseIcon className={classes.close} />
    </IconButton>
);


const RouteLayout = ({ component: Component, layout: Layout, classes, ...rest }) => (
    <>
        <Route
            {...rest}
            render={props => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
        <ToastContainer
            toastClassName={classes.toast} 
            closeOnClick={false}
            newestOnTop={true}
            closeButton={<CloseButton classes={classes} />} 
        />
    </>
);

export default withStyles(styles)(RouteLayout);