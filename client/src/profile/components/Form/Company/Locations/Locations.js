import React from 'react';
import { FieldArray } from 'redux-form';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import LocationsField from './fields/Locations';
import OfficeField from './Office';
import TeamField from './Team';

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
    }
});

const LocationsSection = ({ classes, formName, setCoords, addPhotos, addMember }) => (
    <Paper 
        id="locations" 
        className={classes.paper}
    >
        <Typography 
            className={classes.title}
            color="primary"
        >
            Locations
        </Typography>
        <Grid 
            container
            direction="row"
        >  
            <Grid 
                item
                xs={12}
            >  
                <FieldArray 
                    name="locations" 
                    component={LocationsField}
                    formName={formName} 
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
            > 
                <OfficeField 
                    name="ouroffice"
                    formName={formName} 
                    addPhotos={addPhotos}
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
                <TeamField 
                    name="ourteam"
                    formName={formName} 
                    addMember={addMember}
                />
            </Grid>
        </Grid> 
    </Paper>
);

export default withStyles(styles)(LocationsSection);