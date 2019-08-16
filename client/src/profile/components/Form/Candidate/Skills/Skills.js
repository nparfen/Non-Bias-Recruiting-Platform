import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
    },
    subtitle: {
        marginTop: "24px",
        fontSize: "16px",
        fontWeight: "bold",
    },
    description: {
        fontSize: "15px",
        fontWeight: "normal",
        marginBottom: "16px"
    },
});

const SkillsSection = ({ classes, formName, addSkills }) => (
    <Paper 
        id="skills" 
        className={classes.paper}
    >
        <Typography 
            className={classes.title}
            color="primary"
        >
            Skills
        </Typography>
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
            Choose your hard skills
        </Typography>
        <Typography 
            className={classes.description}
            color="secondary"
        >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <TagsField
            name="hardskills" 
            label="Add hard skills" 
            addSkills={addSkills}
            formName={formName}
            data={['Writing','Journalism','Advertising experience','English grammar and usage','Verbal communication']}
        />
        <Typography 
            className={classes.subtitle}
            color="primary"
        >
            Choose your soft skills
        </Typography>
        <Typography 
            className={classes.description}
            color="secondary"
        >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <TagsField
            name="softskills" 
            label="Add soft skills" 
            addSkills={addSkills}
            formName={formName}
            data={['Strong decision-making skills','Ability to manage multiple projects ','Time-management']}
        />
    </Paper>
);

export default withStyles(styles)(SkillsSection);