import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TextField from './fields/Text';
import LocationField from './fields/Location';
import IndustryField from './fields/Industry';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        padding: "36px",
        borderRadius: "3px",
        marginBottom: "24px",
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    },
    titleSection: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems:"center",
        marginBottom: "24px"
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    preview: {
        border: 0,
        padding: 0,
        fontSize: "18px",
        fontWeight: "500",
        textDecoration: "underline",
        textTransform: "initial",
        boxShadow: "none !important",
        textAlign: "right",
        minHeight: "inherit",
        '&:disabled':{
            color: "#c8c7cc"
        },
        '&:hover':{
            backgroundColor: "transparent",
            textDecoration: "underline",
        },
    },
    rightContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingLeft: "12px",
        },
    },
    leftContainer: {
        paddingLeft: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingRight: "12px",
        },
    },
});

const JobInformationSection = ({ classes, changeToPreview, setCoords, previewDisabled }) => (
    <Paper 
        id="job-information" 
        className={classes.paper}
    >
        <div className={classes.titleSection}>
            <Typography 
                className={classes.title}
                color="primary"
            >
                Job Information
            </Typography>
            <Button 
                className={classes.preview}
                color="secondary"
                disableRipple={true}
                onClick={changeToPreview}
                disabled={previewDisabled}
            >
                Job post preview
            </Button>
        </div>
        <Grid 
            container
            direction="row"
        >  
            <Grid 
                item
                xs={12}
                sm={6}
                className={classes.leftContainer}
            >  
                <TextField 
                    name="jobtitle" 
                    label="Job title"
                />
            </Grid>
            <Grid 
                item
                xs={12}
                sm={6}
                className={classes.rightContainer}
            >  
                <LocationField 
                    name="city.address" 
                    label="City"
                    setCoords={setCoords}
                />
            </Grid>
        </Grid>
        <Grid 
            container
            direction="row"
        >  
            <Grid 
                item
                xs={12}
                sm={6}
                className={classes.leftContainer}
            >  
                <IndustryField 
                    name="industry" 
                    label="Industry"
                />
            </Grid>
            <Grid 
                item
                xs={12}
                sm={6}
                className={classes.rightContainer}
            >  
                <TextField 
                    name="company" 
                    label="Company"
                />
            </Grid>
        </Grid>
    </Paper>
);

export default withStyles(styles)(JobInformationSection);