import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TextField from './fields/Text';
import SelectField from './fields/Select';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        padding: "36px",
        borderRadius: "3px",
        marginBottom: "24px",
        boxShadow: "0 2px 6px 0 rgba(4, 19, 36, 0.1)"
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "24px"
    },
    subtitle: {
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "16px",
        marginTop: "16px"
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
    middleContainer: {
        paddingLeft: "0px",
        paddingRight: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingRight: "12px",
            paddingLeft: "12px",
        },
    },
});

const JobDetailsSection = ({ classes }) => (
    <Paper 
        id="job-details" 
        className={classes.paper}
    >
        <Typography 
            className={classes.title}
            color="primary"
        >
            Job Details
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
                <SelectField 
                    name="jobtype" 
                    label="Job type"
                    options={[{value:"Full-time", label:"Full-time"}]}
                />
            </Grid>
            <Grid 
                item
                xs={12}
                sm={6}
                className={classes.rightContainer}
            >  
                <SelectField 
                    name="senioritylevel" 
                    label="Seniority level"
                    options={[{value:"Mid-Senior level", label:"Mid-Senior level"}]}
                />
            </Grid>
        </Grid>
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
            Salary
        </Typography>
        <Grid 
            container
            direction="row"
        >  
            <Grid 
                item
                xs={12}
                sm={4}
                className={classes.leftContainer}
            >  
                <TextField 
                    name="salary.from" 
                    label="From"
                    less
                />
            </Grid>
            <Grid 
                item
                xs={12}
                sm={4}
                className={classes.middleContainer}
            >  
                <TextField 
                    name="salary.to" 
                    label="To"
                />
            </Grid>
            <Grid 
                item
                xs={12}
                sm={4}
                className={classes.rightContainer}
            >  
                <SelectField 
                    name="salary.period" 
                    label="Period"
                    options={[{value:"per year", label:"Per year"}]}
                />
            </Grid>
        </Grid>
    </Paper>
);

export default withStyles(styles)(JobDetailsSection);