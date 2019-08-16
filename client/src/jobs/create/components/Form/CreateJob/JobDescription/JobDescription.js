import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TextareaField from './fields/Textarea';

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
        marginBottom: "16px"
    }
});

const JobDescriptionSection = ({ classes }) => (
    <Paper 
        id="job-description" 
        className={classes.paper}
    >
        <Typography 
            className={classes.title}
            color="primary"
        >
            Job Description
        </Typography>
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
            Description
        </Typography>
        <Grid 
            container
            direction="row"
        >  
            <Grid 
                item
                xs={12}
            >  
                <TextareaField 
                    name="introductionforyourjob" 
                    label="Introduction for your job"
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
                    name="shortdescriptionoftherole" 
                    label="Short description of the role"
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
                    name="dailyresponsibilitieswillinclude" 
                    label="Daily responsibilities will include"
                />
            </Grid>
        </Grid>
    </Paper>
);

export default withStyles(styles)(JobDescriptionSection);