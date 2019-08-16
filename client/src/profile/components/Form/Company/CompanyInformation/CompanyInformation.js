import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import UploadImage from './UploadImage';
import TextField from './fields/Text';
import SelectField from './fields/Select';
import PhoneField from './fields/Phone';
import TextareaField from './fields/Textarea';
import IndustryField from './fields/Industry';

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
});

const CompanyInformationSection = ({ classes, changeToPreview, previewDisabled, addLogo, addCover, formName }) => (
    <Paper 
        id="company-information" 
        className={classes.paper}
    >
        <div className={classes.titleSection}>
            <Typography 
                className={classes.title}
                color="primary"
            >
                Company Information
            </Typography>
            <Button 
                className={classes.preview}
                color="secondary"
                disableRipple={true}
                onClick={changeToPreview}
                disabled={previewDisabled}
            >
                View company page
            </Button>
        </div>
        <Grid 
            container
            direction="row"
        >  
            <Grid 
                item
                xs={12}
                sm={3}
                className={classes.leftContainer}
            >  
                <UploadImage
                    name="uploadlogo" 
                    label="logo"
                    addImage={addLogo}
                    formName={formName}
                />
            </Grid>
            <Grid 
                item
                xs={12}
                sm={9}
                className={classes.rightContainer}
            >  
                <UploadImage
                    name="uploadcover" 
                    label="cover"
                    addImage={addCover}
                    formName={formName}
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
                <TextField 
                    name="companyname" 
                    label="Company name"
                />
            </Grid>
            <Grid 
                item
                xs={12}
                sm={6}
                className={classes.rightContainer}
            >  
                <SelectField 
                    name="companytype" 
                    label="Company type"
                    options={[{value:"Public company", label:"Public company"}, {value:"Private company", label:"Private company"}]}
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
                <IndustryField 
                    name="industry" 
                    label="Industry"
                />
            </Grid>
            <Grid 
                item
                xs={12}
                sm={6}
                className={classes.rightContainer}
            >  
                <SelectField 
                    name="numberofemployees" 
                    label="Number of employees"
                    options={[{value:"1-5", label:"1-5"}, {value:"5-20", label:"5-20"}, {value:"20-100", label:"20-100"}, {value:"100-500", label:"100-500"}, {value:"500-1000", label:"500-1000"}, {value:"1000-10000", label:"1000-10000"}]}
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
                <TextField 
                    name="website" 
                    label="Website"
                />
            </Grid>
            <Grid 
                item
                xs={12}
                sm={6}
                className={classes.rightContainer}
            >  
                <PhoneField 
                    name="phone" 
                    label="Phone"
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
            >  
                <TextareaField 
                    name="whatwedo" 
                    label="What we do"
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
                    name="whywedowhatwedo" 
                    label="Why we do what we do"
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
                    name="weareproudof" 
                    label="We are proud of"
                />
            </Grid>
        </Grid>
    </Paper>
);

export default withStyles(styles)(CompanyInformationSection);