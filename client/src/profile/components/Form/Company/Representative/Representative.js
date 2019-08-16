import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import MemberField from './Member';

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

const RepresentativeSection = ({ classes, formName, addRepresentative }) => {
    
    return (
        <Paper 
            id="representative" 
            className={classes.paper}
        >
            <Typography 
                className={classes.title}
                color="primary"
            >
                Representative
            </Typography>
            <Grid 
                container
                direction="row"
            >  
                <Grid 
                    item
                    xs={12}
                > 
                    <MemberField 
                        name="representative"
                        formName={formName}
                        addRepresentative={addRepresentative}
                    />
                </Grid>
            </Grid> 
        </Paper>
    )
};

export default withStyles(styles)(RepresentativeSection);