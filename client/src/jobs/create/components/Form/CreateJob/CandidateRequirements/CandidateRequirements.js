import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import SelectField from './fields/Select';
import TagsField from './Tags'

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
});

const CandidateRequirementsSection = ({ classes, formName, addSkills }) => (
    <Paper 
        id="candidate-requirements" 
        className={classes.paper}
    >
        <Typography 
            className={classes.title}
            color="primary"
        >
            Candidate Requirements
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
                    name="yearsofexperience" 
                    label="Years of experience"
                    options={[{value:"3–5 years", label:"3–5 years"}]}
                />
            </Grid>
            <Grid 
                item
                xs={12}
                sm={6}
                className={classes.rightContainer}
            >  
                <SelectField 
                    name="education" 
                    label="Education"
                    options={[{value:"Master's degree", label:"Master's degree"}]}
                />
            </Grid>
        </Grid>
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
            Necessary skills
        </Typography>
        <Grid 
            container
            direction="row"
        >  
            <Grid 
                item
                xs={12}
            >  
                <TagsField
                    name="skills" 
                    label="Add skills" 
                    addSkills={addSkills}
                    formName={formName}
                    data={['Writing','Journalism','Advertising experience','English grammar and usage','Verbal communication']}
                />
            </Grid>
        </Grid>
    </Paper>
);

export default withStyles(styles)(CandidateRequirementsSection);