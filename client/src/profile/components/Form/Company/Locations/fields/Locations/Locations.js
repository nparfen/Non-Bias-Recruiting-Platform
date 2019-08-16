import React, { Fragment } from 'react';
import { Field, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';

import LocationField from './Location';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    addIcon: {
        width: "24px",
        height: "24px",
        objectFit: "contain",
        marginRight: "5px"
    },
    addLocationButton: {
        border: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: "8px",
        fontSize: "16px",
        fontWeight: "normal",
        textTransform: "initial",
        boxShadow: "none !important",
        minHeight: "inherit",
        '&:disabled':{
            color: "#c8c7cc"
        },
        '&:hover':{
            backgroundColor: "transparent",
        },
    }
});

const LocationsField = ({ fields, formValues, setCoords, classes, meta: { error } }) => (
    <Fragment>
        {fields.map((location, index) => (
            <Field
                key={index}
                index={index}
                location={location}
                remove={() => fields.remove(index)}
                setCoords={setCoords}
                name={`${location}.address`}
                component={LocationField}
                label={index === 0 ? "Headquarters" : "Office #"+index}
            />
        ))}
        <Button 
            disabled={_.get(formValues, `locations[${fields.length-1}].coords`, "") ? false : true} 
            color="secondary" 
            className={classes.addLocationButton} 
            onClick={() => fields.push({address:"",coords:""})}
        >
            <Add className={classes.addIcon} />
            Add location
        </Button>
        { error && <Typography color="error"><small>{error}</small></Typography>}
    </Fragment>
)

const mapStateToProps = (state, ownProps) => ({
    formValues: getFormValues(ownProps.formName)(state),
})

export default connect(mapStateToProps,{})(withStyles(styles)(LocationsField));