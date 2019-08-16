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
    }
});

const AccomplishmentsSection = ({ classes }) => (
    <Paper 
        id="accomplishments" 
        className={classes.paper}
    >
        <Typography 
            className={classes.title}
            color="primary"
        >
            Accomplishments
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
                    name="accomplishments" 
                    label="Description"
                />
            </Grid>
        </Grid>
    </Paper>
);

export default withStyles(styles)(AccomplishmentsSection);