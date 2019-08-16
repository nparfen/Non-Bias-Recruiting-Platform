import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TextField from './fields/Text';
import SelectField from './fields/Select';
import PhoneField from './fields/Phone';
import EmailField from './fields/Email';
import LocationField from './fields/Location';
import RelocationField from './fields/Relocation';
import DateField from './fields/Date';
import LinkedInField from './fields/LinkedIn';

import withWidth from '@material-ui/core/withWidth';
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
    alert: {
        marginTop: "12px",
        marginBottom: "24px",
        color: theme.palette.secondary.dark,
        fontSize: "15px",
        fontWeight: "normal",
        padding: "12px",
        borderRadius: "3px",
        backgroundColor: "#fff9e0",
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
    linkedInContainer: {
        flexDirection: "row",
        display: "flex",
        alignItems: "baseline"
    }
});

const PersonalInformationSection = ({ classes, setCoords, setDate, addLinkedIn, formValues, width }) => (
    <Paper 
        id="personal-information" 
        className={classes.paper}
    >
        <Typography 
            className={classes.title}
            color="primary"
        >
            Personal Information
        </Typography>
        <Typography className={classes.alert}>
            This personal information will not be shared with companies. Your profile will be considered without any bias, only based on your education, skills and experience.
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
                <TextField 
                    name="firstname" 
                    label="First name"
                />
            </Grid>
            <Grid 
                item
                xs={12}
                sm={6}
                className={classes.rightContainer}
            >  
                <TextField 
                    name="lastname" 
                    label="Last name"
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
                <EmailField 
                    name="email" 
                    label="Email"
                />
            </Grid>
            <Grid 
                item
                xs={12}
                sm={6}
                className={classes.rightContainer}
            >  
                <PhoneField 
                    name="mobilephone" 
                    label="Mobile phone"
                    placeholder="+"
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
                <DateField 
                    name="dateofbirth"
                    formValues={formValues} 
                    setDate={setDate}
                    label="Date of birth"
                />
            </Grid>
            <Grid 
                item
                xs={12}
                sm={6}
                className={classes.rightContainer}
            >  
                <SelectField 
                    name="gender" 
                    label="Gender"
                    options={[{value:"Male", label:"Male"}, {value:"Female", label:"Female"}, {value:"Other", label:"Other"}]}
                />
            </Grid>
        </Grid>
        {
            _.get(formValues, "gender", "") === "Other" &&
            <Grid 
                container
                direction="row"
            >  
                <Grid 
                    item
                    xs={12}
                >  
                    <TextField 
                        name="othergender" 
                        label="Please, srecify your choice"
                    />
                </Grid>
            </Grid>
        }
        <Typography 
            color="primary"
            className={classes.subtitle}
        >
            Location
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
                <LocationField 
                    name="location.address" 
                    label="City"
                    setCoords={setCoords}
                />
            </Grid>
            <Grid 
                item
                xs={12}
                sm={6}
                className={classes.rightContainer}
            >  
                <RelocationField 
                    name="relocation"
                    label="I am ready for relocation"
                />
            </Grid>
        </Grid>
        <Typography 
            color="primary"
            className={classes.subtitle}
        >
            Social Media
        </Typography>
        <Grid 
            container
            direction="row"
        > 
            <Grid 
                item
                xs={12}
                className={classes.linkedInContainer}
            >  
                <LinkedInField 
                    name="linkedin"
                    label={width === "xs" ? "Linkedin" : "Linkedin (optional)"}
                    formValues={formValues}
                    addLinkedIn={addLinkedIn}
                />
            </Grid>
        </Grid>
    </Paper>
);

const mapStateToProps = (state, ownProps) => ({
    formValues: getFormValues(ownProps.formName)(state),
})

export default connect(mapStateToProps,{})(withStyles(styles)(withWidth()(PersonalInformationSection)));