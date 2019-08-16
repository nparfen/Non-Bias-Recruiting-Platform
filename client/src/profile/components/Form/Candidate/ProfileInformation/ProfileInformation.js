import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import PositionField from './fields/Position'
import SelectField from './fields/Select';
import TextareaField from './fields/Textarea';
import IndustryField from './fields/Industry';
import SalaryField from './fields/Salary';

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
    subtitle:{
        marginTop: "16px",
        marginBottom: "8px",
        fontSize: "16px",
        fontWeight: "bold"
    },
});

const ProfileInformationSection = ({ classes, changeToPreview, previewDisabled }) => (
    <Paper 
        id="profile-information" 
        className={classes.paper}
    >
        <div className={classes.titleSection}>
            <Typography 
                className={classes.title}
                color="primary"
            >
                Profile Information
            </Typography>
            <Button 
                className={classes.preview}
                color="secondary"
                disableRipple={true}
                onClick={changeToPreview}
                disabled={previewDisabled}
            >
                View my profile
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
                <PositionField 
                    name="position"
                    label="Current position"
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
                <SalaryField
                    name="salary"
                    label="Preferred salary"
                />             
            </Grid>
            <Grid 
                item
                xs={12}
                sm={6}
                className={classes.rightContainer}
            >  
                <SelectField 
                    name="period" 
                    label="Period"
                    options={[{value:"Per day", label:"Per day"}, {value:"Per week", label:"Per week"}, {value:"Per month", label:"Per month"}, {value:"Per year", label:"Per year"}]}
                />
            </Grid>
        </Grid>
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
            Additional Information
        </Typography>
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
                    name="currentindustry" 
                    label="Industry (current)"
                />
            </Grid>
            <Grid 
                item
                xs={12}
                sm={6}
                className={classes.rightContainer}
            >  
                <IndustryField 
                    name="preferredindustry" 
                    label="Industry (preferred)"
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
            >  
                <TextareaField 
                    name="description" 
                    label="Description"
                    placeholder="A little discription about me (optional)"
                />
            </Grid>
        </Grid>
    </Paper>
);

export default withStyles(styles)(ProfileInformationSection);